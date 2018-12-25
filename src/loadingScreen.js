import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';
import { signInActions } from './actions';

class LoadingScreen extends Component {
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.logInSuccess(user.toJSON());
                this.checkUserStatus();
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
    logInFailed: user => dispatch(signInActions.logInFailed(user))
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
