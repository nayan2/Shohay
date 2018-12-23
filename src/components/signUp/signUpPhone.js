import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
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
import fireBase from 'firebase';
import { signUpActions } from '../../actions';
import { displayErrorMessage } from '../../helpers';

const BDFlagImage = require('../../assets/bd-flag.png');

class signUpPhone extends Component {
    goBack = () => {
        this.props.setSignupPhone('');
        this.props.navigation.navigate('SignInScreen');
    }

    swipeRight = (phone) => {
        try {
            if (phone.length < 11 || phone.length >= 12) {
                displayErrorMessage('Invalid Phone nUmber');
            } else {
                fireBase.auth().signInWithPhoneNumber(phone)
                        .then((result) => { console.log(result); });
            }
        } catch (error) {
            console.log(['error in swipe right ...', error]);
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.goBack()}
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
                                            <View style={styles.lineItems}>
                                                <Image source={BDFlagImage} style={styles.flag} />
                                                <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>
                                                    +88
                                                </Text>
                                                <Input
                                                    onChangeText={(phone) => this.props.setSignupPhone(phone)}
                                                    value={this.props.phone}
                                                    placeholder='Enter your mobile number'
                                                    keyboardType='phone-pad'
                                                />
                                            </View>
                                        </Item>
                                    </Form>
                                </Content>
                            </Body>
                        </CardItem>
                    </Card>
                    <View style={styles.buttonNext}>
                        <Button style={{ borderRadius: 20, alignContent: 'center', borderWidth: 2 }} onPress={() => this.swipeRight(this.props.phone)}>
                            <Icon name="arrow-forward" />
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    phone: state.SignUp.phone
});

const mapDispatchToProps = (dispatch) => ({
    setSignupPhone: (phone) => dispatch(signUpActions.setSignupPhone(phone)),
    signupPhoneSubmit: (status) => dispatch(signUpActions.signupPhoneSubmit(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(signUpPhone);

const styles = StyleSheet.create({
    mb: {
        marginBottom: 15
    },
    container: {
        backgroundColor: '#FFF'
    },
    text: {
        alignSelf: 'center',
        marginBottom: 7
    },
    lineItems: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    flag: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    buttonNext: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }
});
