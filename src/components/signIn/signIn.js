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

class signIn extends Component {
    componentWillMount() {

    }

    registerMe() {
        alert('sign me up');
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
                        onPress={() => this.registerMe()}
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
    isSubmitted: state.SignIn.isSubmitted
});

const mapDispatchToProps = (dispatch) => ({
    setPhone: phoneNumber => dispatch({ type: 'SET_PHONE', payload: phoneNumber }),
    setPassword: password => dispatch({ type: 'SET_PASSWORD', payload: password })
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
