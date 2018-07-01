import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

import Billing from '../components/Billing';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class BillingHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billingHistory: [],
      pageLoading: false,
    }
  }
  
  componentDidMount(){
    this.getBillingList()
  }
  
  getBillingList = async () => {
    if(!this.state.pageLoading){
      try {
        this.setState({ pageLoading: true });
        
        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;
        
        fetch(`${env.ENDPOINT}/api/bill/get_combined`, {
          method: 'GET',
          headers: new Headers({
            'Accept-Encoding': 'application/json',
            'Content-Type': 'application/json',
            'Token': userToken
          })
        })
          .then(response => {
            this.setState({ pageLoading: false });
            response.json().then(responseBody => {
              console.log(responseBody);
              if(response.status === 200){
                this.setState({ billingHistory: responseBody.data })
              } else {
                Alert.alert('Gagal Mengambil Riwayat Tagihan', responseBody.message)
              }
            })
          })
      } catch (error) {
        console.log(error)
        Alert.alert('Gagal Mengambil Riwayat Tagihan', JSON.stringify(error))
      }
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