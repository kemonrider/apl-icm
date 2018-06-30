import React from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';

import { colors } from '../lib/styles';
import { appStorage, storageConst } from '../lib/storage';

export default class SplashScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    this.validateToken();
  }
  
  validateToken(){
    console.log('[SplashScreen]: Validating Token');
    appStorage.getItem(storageConst.user, (error, user) => {
      user = JSON.parse(user);
      console.log('Current User:');
      console.log(user);
      if(error){
        Alert.alert('Failed to get user data', JSON.stringify(error));
      }
      if(user) {
        this.props.navigation.navigate('NewsFeed');
      } else {
        this.props.navigation.navigate('Onboarding');
      }
    })
  }

  render(){
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