import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { appStorage } from '../lib/storage';

export default class LogoutScreen extends React.Component {  
  constructor(props){
    super(props);
  }
  
  componentDidMount = async () => {
    try {
      await appStorage.clearItem();
      this.props.navigation.navigate('Login');
    } catch(error) {
      alert(error)
    }
  }
  
  render(){
    return (
      <View style={styles.pageWrapper}>
        <Text>Logging out</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})