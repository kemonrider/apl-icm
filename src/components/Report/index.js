import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../lib/styles';

export default class Billing extends React.Component {
  constructor(props){
    super(props);
  }

  getBillingIcon = (categoryId) => {
    categoryId = parseInt(categoryId);
    switch(categoryId) {
      case 1:
        return <Image style={styles.categoryIcon} source={require('../../assets/images/report/report-cleaning.png')} />
        break;
      case 2:
        return <Image style={styles.categoryIcon} source={require('../../assets/images/report/report-electricity.png')} />
        break;
      case 3 :
        return <Image style={styles.categoryIcon} source={require('../../assets/images/report/report-water.png')} />
        break;
      case 4:
        return <Image style={styles.categoryIcon} source={require('../../assets/images/report/report-maintenance.png')} />
        break;
      case 5:
        return <Image style={styles.categoryIcon} source={require('../../assets/images/report/report-other.png')} />
        break;
    }
  }
  
  getReportStatus = (reportStatus) => {
    if(parseInt(reportStatus) === 1){
      return <Text style={{color: colors.secondary}}>SUDAH SELESAI</Text>
    } else {
      return <Text style={{color: '#D51A1A'}}>BELUM SELESAI</Text>
    }
  }
  
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  render(){    
    return(
      <View style={styles.billingWrapper}>
        <View style={styles.billingIcon}>
          {this.getBillingIcon(this.props.category_id)}
        </View>
        <View style={styles.billingInfo}>
          <View style={styles.billingTitleWrapper}>
            <Text style={styles.billingTitle}>{this.props.title}</Text>
          </View>
          <View style={styles.billingStatusWrapper}>
            <Text style={styles.billingStatus}>
              {this.getReportStatus(this.props.is_finish)}
            </Text>
          </View>
          <View style={styles.billingDetailWrapper}>
            <Text style={styles.billingDetail}>{this.props.ticket_number}</Text>
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