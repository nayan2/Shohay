import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';
import { signInActions, signUpActions } from './actions';

class LoadingScreen extends Component {
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('from auth change');
                console.log(this.props);

                if (user.phoneNumber && user.email === null && user.isAnonymous === false) {
                    this.completeSignUpProcess(user.toJSON());
                } else {
                    this.props.logInSuccess(user.toJSON());
                    this.checkUserStatus();
                }
            } else {
                this.props.logInFailed(user);
                this.checkUserStatus();
            }
        });
    }

    checkUserStatus() {
        this.props.navigation.navigate(
            this.props.user.isLoggedIn ? 'AuthLoaded' : 'SignInScreen'
        );
    }

    completeSignUpProcess = (user) => {
        if (user) {
            firebase.auth()
                .verifyPhoneNumber(user.phoneNumber)
                .on('state_changed', (phoneAuthSnapshot) => {
                    console.log('State changed called');
                    switch (phoneAuthSnapshot.state) {
                        // ------------------------
                        //  IOS AND ANDROID EVENTS
                        // ------------------------
                        case firebase.auth.PhoneAuthState.CODE_SENT:
                            console.log('code sent');
                            this.props.navigation.navigate('signUpConfirmCode');
                            break;
                        case firebase.auth.PhoneAuthState.ERROR:
                            console.log('verification error');
                            console.log(phoneAuthSnapshot.error);
                            this.props.setError(phoneAuthSnapshot.error);
                            this.props.navigation.navigate('signUpPhone');
                            break;

                        // ---------------------
                        // ANDROID ONLY EVENTS
                        // ---------------------
                        case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
                            console.log('auto verify on android timed out');
                            this.props.navigation.navigate('signUpConfirmCode');
                            break;
                        case firebase.auth.PhoneAuthState.AUTO_VERIFIED:
                            console.log('auto verified on android');
                            console.log(phoneAuthSnapshot);
                            this.props.navigation.navigate('signUp');
                            // auto verified means the code has also been automatically confirmed as correct/received
                            // phoneAuthSnapshot.code will contain the auto verified sms code - no need to ask the user for input.
                            // Example usage if handling here and not in optionalCompleteCb:
                            // const { verificationId, code } = phoneAuthSnapshot;
                            // const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

                            // Do something with your new credential, e.g.:
                            // firebase.auth().signInWithCredential(credential);
                            // firebase.auth().currentUser.linkWithCredential(credential);
                            // etc ...
                            break;
                        default:
                            break;
                    }
                }, (error) => {
                    // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
                    // the ERROR case in the above observer then there's no need to handle it here
                    console.log(error);
                    // verificationId is attached to error if required
                    console.log(error.verificationId);
                }, (phoneAuthSnapshot) => {
                    const { verificationId, code } = phoneAuthSnapshot;
                    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
                    if (credential) {
                        this.props.navigation.navigate('signUp'); 
                    } else {
                        this.props.navigation.navigate('signUpConfirmCode');
                    }
                    // optionalCompleteCb would be same logic as the AUTO_VERIFIED/CODE_SENT switch cases above
                    // depending on the platform. If you've already handled those cases in the observer then
                    // there's absolutely no need to handle it here.

                    // Platform specific logic:
                    // - if this is on IOS then phoneAuthSnapshot.code will always be null
                    // - if ANDROID auto verified the sms code then phoneAuthSnapshot.code will contain the verified sms code
                    //   and there'd be no need to ask for user input of the code - proceed to credential creating logic
                    // - if ANDROID auto verify timed out then phoneAuthSnapshot.code would be null, just like ios, you'd
                    //   continue with user input logic.
                    console.log(phoneAuthSnapshot);
                });
                // optionally also supports .then & .catch instead of optionalErrorCb &
                // optionalCompleteCb (with the same resulting args)
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Spinner size="large" />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.User
});

const mapDispatchToProps = dispatch => ({
    logInSuccess: user => dispatch(signInActions.logInSuccess(user)),
    logInFailed: user => dispatch(signInActions.logInFailed(user)),
    setError: message => dispatch(signUpActions.setError(message))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
