import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { colors } from '../lib/styles';

export default class SplashScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  validateToken(){
    setTimeout(() => {
      this.props.navigation.navigate('Onboarding');
    }, 500);
    // TODO:
    // - check storage for token
    // - if token is exist, validate token to api
    // - redirect to App if token is valid
    // - redirect to Onboarding if token is not valid
  }
  
  render(){
    this.validateToken();
    
    return(
      <View style={styles.pageWrapper}>
        <Image source={require('../assets/images/splash/innercity-splash.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center'
  }
})