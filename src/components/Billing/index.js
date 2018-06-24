import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Billing extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){    
    return(
      <View style={styles.billingWrapper}>
        <View style={styles.billingIcon}>
          <Image source={require('../../assets/images/billing/billing-icon.png')} />
        </View>
        <View style={styles.billingInfo}>
          <View style={styles.billingTitleWrapper}>
            <Text style={styles.billingTitle}>{this.props.title}</Text>
          </View>
          <View style={styles.billingStatusWrapper}>
            <Text style={styles.billingStatus}>
              <Text style={{color: this.props.statusColor}}>{this.props.status}</Text>
            </Text>
          </View>
          <View style={styles.billingDetailWrapper}>
            <Text style={styles.billingDetail}>Rp {this.props.amount} - {this.props.date}</Text>
          </View>
        </View>
        <View style={styles.billingArrow}>
          <Icon name="chevron-right" size={24} color="#999999" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  billingWrapper: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    padding: 15,
    flexDirection: 'row',
  },
  billingIcon: {
    width: 50,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  billingInfo: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  billingTitleWrapper: {},
  billingTitle: {
    fontSize: 16
  },
  billingStatusWrapper: {},
  billingStatus: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  billingDetailWrapper: {},
  billingDetail: {
    fontSize: 10
  },
  billingArrow: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})