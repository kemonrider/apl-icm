import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { colors } from '../lib/styles';
import { appStorage, storageConst } from '../lib/storage';

export default class SplashScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  validateToken(){    
    console.log('Getting user token');
    appStorage.getItem(storageConst.user, (error, user) => {
      user = JSON.parse(user);
      console.log(user);
      if(error){
        this.props.navigation.navigate('Onboarding');
      }
      if(user) {
        this.props.navigation.navigate('NewsFeed');
      } else {
        this.props.navigation.navigate('Onboarding');
      }
    })
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