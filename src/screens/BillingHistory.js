import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Billing from '../components/Billing';

export default class BillingHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billingHistory: billingHistory
    }
  }
  
  renderBillingHistory() {
    const renderedBillingHistory = [];
    for(let i = 0 ; i < this.state.billingHistory.length; i++){
      renderedBillingHistory.push(
        <TouchableOpacity
          key={this.state.billingHistory[i].id}
          onPress={() => {this.props.navigation.navigate('BillingDetail', { billingId: this.state.billingHistory[i].id })}}
        >
          <Billing
            {...this.state.billingHistory[i]}
          />
        </TouchableOpacity>
      )
    }
    return renderedBillingHistory;
  }
  
  render(){
    return(
      <ScrollView style={styles.pageWrapper}>
        {this.renderBillingHistory()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {},
})

const billingHistory = [
  {
    id: 1,
    title: "Tagihan",
    status: "BELUM DIBAYAR",
    statusColor: '#D51A1A',
    date: '30 June 2018',
    amount: '1400000'
  },
  {
    id: 2,
    title: "Tagihan",
    status: "BELUM DIBAYAR",
    statusColor: '#F19100',
    date: '30 June 2018',
    amount: '1400000'
  },
  {
    id: 3,
    title: "Tagihan",
    status: "BELUM DIBAYAR",
    statusColor: '#D51A1A',
    date: '30 June 2018',
    amount: '1400000'
  },
  {
    id: 4,
    title: "Tagihan",
    status: "BELUM DIBAYAR",
    statusColor: '#F19100',
    date: '30 June 2018',
    amount: '1400000'
  },
]