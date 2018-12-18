import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { View, StyleSheet, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import fireBase from 'firebase';
import store from './src/store';
import { fireBase as fireBaseConfig } from './app.json';
import dashboard from './src/components/dashboard';
import signIn from './src/components/signIn/signIn';
import signUp from './src/components/signUp/signUp';
import signUpPhone from './src/components/signUp/signUpPhone';
import signUpConfirmCode from './src/components/signUp/signUpConfirmCode';
import LoadingScreen from './src/loadingScreen';

class App extends Component {
  componentWillMount() {
    YellowBox.ignoreWarnings(['Remote debugger']);
    fireBase.initializeApp(fireBaseConfig);
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </View>
    );
  }
}
export default App;

const AuthLoadingStackNavigator = createStackNavigator({
  dashboard
});

const AuthStackNavigator = createStackNavigator({
  signUpPhone,
  signUpConfirmCode,
  signUp
});

const Navigator = createSwitchNavigator({
  AuthLoading: LoadingScreen,
  SignInScreen: signIn,
  Auth: AuthStackNavigator,
  AuthLoaded: AuthLoadingStackNavigator
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
