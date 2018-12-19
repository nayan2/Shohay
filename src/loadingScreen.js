import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import fireBase from 'firebase'; 
import { connect } from 'react-redux';
import { logInSuccess, logInFailed } from './actions';

class LoadingScreen extends Component {
    componentWillMount() {
        // fireBase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         this.props.logInSuccess(user);
        //     } else {
        //         this.props.logInFailed(user);
        //     }
        // });
    }

    checkUserStatus() {
        // console.log(this.props.user);
        if (this.props.user.isLoggedIn == null) {
            return (
                <ActivityIndicator
                    style={styles.indicator}
                    size="large" color=""
                />
            );
        }
        this.props.navigation.navigate(this.props.user.isLoggedIn ? 'AuthLoaded' : 'SignInScreen'); 
    }

    render() {
        return (
            <View>
                {this.checkUserStatus()}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    logInSuccess: user => dispatch(logInSuccess(user)),
    logInFailed: user => dispatch(logInFailed(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

