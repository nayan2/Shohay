import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
    Text,
    View
} from 'native-base';
import { connect } from 'react-redux';
import fireBase from 'firebase'; 
import { setPhone, setPassword, submitForm, logInSuccess, logInFailed } from '../../actions';
import { displayErrorMessage } from '../../helpers';

class signIn extends Component {
    componentWillMount() {
        if (this.props.user.isLoggedIn) {
            this.props.navigation.navigate('AuthLoaded');
        }
    }
 
    signMeIn = async(phone, password) => {
        try {
            const email = `${phone}@shohay.com`;
            fireBase.auth().signInWithEmailAndPassword(email, password)
                            .then((user) => {
                                this.props.logInSuccess(user);
                            })
                            .catch((error) => {
                                this.props.logInFailed({});
                                console.log(error);
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
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Shohay</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input
                                onChangeText={(phone) => this.props.setPhone(phone)} 
                                value={this.props.phone}
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                            />
                        </Item>
                        <Item last>
                            <Input
                                onChangeText={(password) => this.props.setPassword(password)}
                                value={this.props.password}
                                placeholder="Password"
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
    setPhone: phoneNumber => dispatch(setPhone(phoneNumber)),
    setPassword: password => dispatch(setPassword(password)),
    submitForm: (isSubmitted) => dispatch(submitForm(isSubmitted)),
    logInSuccess: (user) => dispatch(logInSuccess(user)),
    logInFailed: (user) => dispatch(logInFailed(user))
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
    }
});
