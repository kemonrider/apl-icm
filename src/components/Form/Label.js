import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class FormLabel extends React.Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <View style={styles.labelWrapper}>
        <Text style={styles.labelText}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  labelWrapper: {},
  labelText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.54)'
  }
})
