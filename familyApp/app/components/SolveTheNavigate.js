export default App extends React.Component {
  render() {
    /* In the root component we are rendering the app navigator */
    return <AppNavigator />;
  }
}

const AppNavigator = createSwitchNavigator({
  Auth: AuthenticationScreen, // This screen renders a navigator!
  Home: HomeScreen,
});

class AuthenticationScreen extends React.Component {
  render() {
    return (
      <AuthenticationNavigator />
    );
  }
}
const AuthenticationNavigator = createStackNavigator({
  SignIn: SignInScreen,
  ForgotPassword: ForgotPasswordScreen,
});
---------------------------------
export default App extends React.Component {
  render() {
    /* In the root component we are rendering the app navigator */
    return <AppNavigator />;
  }
}

const AppNavigator = createSwitchNavigator({
  Auth: AuthenticationScreen, // This screen renders a navigator!
  Home: HomeScreen,
});


class AuthenticationScreen extends React.Component {
  static router = AuthenticationNavigator.router;

  render() {
    return (
      <AuthenticationNavigator navigation={this.props.navigation} />
    );
  }
}
const AuthenticationNavigator = createStackNavigator({
  SignIn: SignInScreen,
  ForgotPassword: ForgotPasswordScreen,
});

---------------------------------------------------


export default App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
const AppNavigator = createSwitchNavigator({
  /* 
   * Rather than being rendered by a screen component, the
   * AuthenticationNavigator is a screen component
   */
  Auth: AuthenticationNavigator,
  Home: HomeScreen,
});

const AuthenticationNavigator = createStackNavigator({
  SignIn: SignInScreen,
  ForgotPassword: ForgotPasswordScreen,
});



