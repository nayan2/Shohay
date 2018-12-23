import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import fireBase from 'firebase';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';
import { logInSuccess, logInFailed } from './actions';

class LoadingScreen extends Component {
    componentWillMount() {
        fireBase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.logInSuccess(user);
                this.checkUserStatus();
            } else {
                this.props.logInFailed(user);
                this.checkUserStatus();
            }
        });
    }

    checkUserStatus() {
        console.log(this.props.user);
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
    logInSuccess: user => dispatch(logInSuccess(user)),
    logInFailed: user => dispatch(logInFailed(user))
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
