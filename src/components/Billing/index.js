import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../lib/styles';

export default class Billing extends React.Component {
  constructor(props){
    super(props);
  }

  getBillingIcon = (billingType) => {
    billingType = billingType.toLowerCase();
    switch(billingType) {
      case 'maintenance':
        return <Image source={require('../../assets/images/billing/maintenance.png')} />
      break;
      case 'power/water':
        return <Image source={require('../../assets/images/billing/electricity.png')} />
      break;
      default:
        return <Image source={require('../../assets/images/billing/billing-icon.png')} />
      break;
    }
  }
  
  getBillingStatus = (billingStatus) => {
    if(parseInt(billingStatus) === 1){
      return <Text style={{color: colors.secondary}}>SUDAH DIBAYAR</Text>
    } else {
      return <Text style={{color: '#D51A1A'}}>BELUM DIBAYAR</Text>
    }
  }
  
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  render(){    
    return(
      <View style={styles.billingWrapper}>
        <View style={styles.billingIcon}>
          {this.getBillingIcon(this.props.type)}
        </View>
        <View style={styles.billingInfo}>
          <View style={styles.billingTitleWrapper}>
            <Text style={styles.billingTitle}>{this.props.unit} - {this.props.type}</Text>
          </View>
          <View style={styles.billingStatusWrapper}>
            <Text style={styles.billingStatus}>
              {this.getBillingStatus(this.props.is_paid)}
            </Text>
          </View>
          <View style={styles.billingDetailWrapper}>
            <Text style={styles.billingDetail}>Rp {this.numberWithCommas(this.props.bill_total)} - {this.props.bill_date}</Text>
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