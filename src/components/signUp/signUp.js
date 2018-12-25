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
    Body,
    Title,
    Right,
    Text,
    Spinner
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { signUpActions } from '../../actions';
import { displayErrorMessage } from '../../helpers';

class signUp extends Component {
    state = { isLoading: false }

    signUp = async (password, confirmPass) => {
        try {
            if (password !== confirmPass) {
                displayErrorMessage('password and confirm password doesn\'t match!!');
            } else {
                this.setState({ isLoading: true });
                const email = `+88${this.props.phone}@shohay.com`;
                firebase.auth().currentUser.delete()
                    .then(() => {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then((user) => {
                                console.log(['user successfully created', user]);
                            })
                            .catch((error) => {
                                const { code, message } = error;
                                console.log(['error occur in create user method', code, message]);
                                displayErrorMessage('Something went wrong! try again after some time.');
                            });
                    })
                    .catch((error) => {
                        console.log(['error on delete user', error]);
                    });
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.log(['something went wrong in catch block', error]);
        }
    }

    renderLoading = () => {
        if (this.state.isLoading) {
            return (
                <Content>
                    <Spinner size="large" />
                </Content>
            );
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left />
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                    <Right />
                </Header>

                {this.renderLoading()}

                <Content>
                    <Form>
                        <Item>
                            <Input
                                onChangeText={(password) => this.props.setSignupPassword(password)}
                                value={this.props.phone}
                                placeholder="Enter Password"
                                keyboardType='default'
                                secureTextEntry
                            />
                        </Item>
                        <Item last>
                            <Input
                                onChangeText={(confirmPass) => this.props.setSignupConfirmPassword(confirmPass)}
                                value={this.props.password}
                                placeholder="Enter confirm password"
                                keyboardType='default'
                                secureTextEntry
                            />
                        </Item>
                    </Form>
                    <Button
                        onPress={() => this.signUp(this.props.password, this.props.confirmPassword)}
                        block
                        style={{ margin: 15, marginTop: 50 }}
                    >
                        <Text>Sign Up</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    phone: state.signUp.phone,
    password: state.signUp.password,
    confirmPassword: state.signUp.confirmPassword
});

const mapDispatchToProps = (dispatch) => ({
    setSignupPassword: (password) => dispatch(signUpActions.setSignupPassword(password)),
    setSignupConfirmPassword: (confirmPass) => dispatch(signUpActions.setSignupConfirmPassword(confirmPass))
});

export default connect(mapStateToProps, mapDispatchToProps)(signUp);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    mb15: {
        marginBottom: 20
    }
});
