import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Left,
    Button,
    Body,
    Title,
    Right,
    Text,
    View,
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { signInActions } from '../../actions';
import { displayErrorMessage } from '../../helpers';

const BDFlagImage = require('../../assets/bd-flag.png');

class signIn extends Component {
    componentWillMount() {
        if (this.props.user.isLoggedIn) {
            this.props.navigation.navigate('AuthLoaded');
        }
    }

    signMeIn = async (phone, password) => {
        try {
            const email = `+88${phone}@shohay.com`;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    this.props.logInSuccess(user);
                })
                .catch((error) => {
                    console.log(error);
                    //do some operation//
                    this.props.logInFailed({});
                    displayErrorMessage('Invalid PhoneNumber Or Password');
                });
        } catch (error) {
            console.log(['something went wrong in catch block', error]);
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left />
                    <Body>
                        <Title>Shohay</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <View style={styles.signUp}>
                                <Image source={BDFlagImage} style={styles.flag} />
                                <Text style={{ fontSize: 18, paddingHorizontal: 10 }} >+88</Text>
                                <Input
                                    onChangeText={(phone) => this.props.setPhone(phone)}
                                    value={this.props.phone}
                                    placeholder="Enter your mobile number"
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </Item>
                        <Item last>
                            <Input
                                onChangeText={(password) => this.props.setPassword(password)}
                                value={this.props.password}
                                placeholder="Enter your password"
                                secureTextEntry
                            />
                        </Item>
                    </Form>
                    <Button
                        onPress={() => this.signMeIn(this.props.phone, this.props.password)}
                        block
                        style={{ margin: 15, marginTop: 50 }}
                    >
                        <Text>Sign In</Text>
                    </Button>
                    <View style={styles.signUp}>
                        <Text>Dont Have An Account?</Text>
                        <Button
                            onPress={() => this.props.navigation.navigate('signUpPhone')}
                            transparent
                            info
                        >
                            <Text>Sign UP</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    phone: state.SignIn.phone,
    password: state.SignIn.password,
    isSubmitted: state.SignIn.isSubmitted,
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    setPhone: (phoneNumber) => dispatch(signInActions.setPhone(phoneNumber)),
    setPassword: (password) => dispatch(signInActions.setPassword(password)),
    submitForm: (isSubmitted) => dispatch(signInActions.submitForm(isSubmitted)),
    logInSuccess: (user) => dispatch(signInActions.logInSuccess(user)),
    logInFailed: (user) => dispatch(signInActions.logInFailed(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(signIn);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    mb15: {
        marginBottom: 20
    },
    signUp: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    flag: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
    }
});
