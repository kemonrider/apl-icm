import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class FormLabel extends React.Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <View style={styles.labelWrapper}>
        <Text 
          style={this.props.textColor ? {color: this.props.textCOlor} : styles.labelText}
        >
          {this.props.text}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  labelWrapper: {},
  labelText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.54)'
  }
})
