import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Body,
    Left,
    Right,
    Input,
    Form,
    Item
  } from 'native-base';
import { connect } from 'react-redux';
import { signUpActions } from '../../actions';
import { displayErrorMessage } from '../../helpers';

class signUpConfirmCode extends Component {
    swipeRight = (code) => {
        try {
            if (code.length <= 0 || code.length >= 10) {
                displayErrorMessage('Invalid code! pls check again.');
            } else {
                this.props.confirmResult.confirm(code)
                    .then((user) => {
                        console.log(['use confirmed', user]);
                        // If you need to do anything with the user, do it here
                        // The user will be logged in automatically by the
                        // `onAuthStateChanged` listener we set up in App.js earlier
                    })
                    .catch((error) => {
                        const { code, message } = error;
                        console.log(['error occur on user confirmation', message]);
                        // For details of error codes, see the docs
                        // The message contains the default Firebase string
                        // representation of the error
                    });
            }
        } catch (error) {
            console.log(['something went wrong in catch block', error]);
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>
                    <Card style={styles.mb}>
                        <CardItem header bordered>
                            <Text>Get moving with Shohay</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Content>
                                    <Form>
                                        <Item>
                                            <View>
                                                <Input
                                                    onChangeText={(code) => this.props.setSignupConfirmCode(code)}
                                                    value={this.props.confirmCode}
                                                    placeholder='Enter your confirmation code'
                                                    keyboardType='numeric'
                                                />
                                            </View>
                                        </Item>
                                    </Form>
                                </Content>
                            </Body>
                        </CardItem>
                    </Card>
                    <View style={styles.buttonNext}>
                        <Button
                            style={styles.buttonArrow}
                            onPress={() => this.swipeRight(this.props.confirmCode)}
                        >
                            <Icon name="arrow-forward" />
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    confirmResult: state.SignUp.confirmResult,
    confirmCode: state.SignUp.confirmCode,
});

const mapDispatchToProps = (dispatch) => ({
    setSignupConfirmCode: (code) => dispatch(signUpActions.setSignupConfirmCode(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(signUpConfirmCode);

const styles = StyleSheet.create({
    mb: {
        marginBottom: 15
    },
    container: {
        backgroundColor: '#FFF'
    },
    buttonNext: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    buttonArrow: {
        borderRadius: 20,
        alignContent: 'center',
        borderWidth: 2
    }
});
