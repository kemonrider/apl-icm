import React from 'react';
import { ActivityIndicator, View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

import Billing from '../components/Billing';

import { colors } from '../lib/styles';
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
    this.getBillingList();
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
            if(response.status === 401){
              appStorage.clearItem();
              this.props.navigation.navigate('NotAuthorized');
            }
            this.setState({ pageLoading: false });
            response.json().then(responseBody => {
              if(response.status === 200){
                if(responseBody.data){
                  this.setState({ billingHistory: responseBody.data })
                } else {
                  this.setState({ billingHistory: [] })
                }
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
    if(!this.state.pageLoading){    
      if(this.state.billingHistory.length > 0){
        const renderedBillingHistory = [];
        this.state.billingHistory.map( bill => {
          renderedBillingHistory.push(
            <TouchableOpacity
            key={bill.id}
            onPress={() => {this.props.navigation.navigate('BillingDetail', { billingId: bill.id, billingType: bill.type })}}
            >
            <Billing
              {...bill}
              />
          </TouchableOpacity>
          )
        })
        return renderedBillingHistory;
      } else {
        return (
          <View>
            <Text style={styles.noBilling}>No billing yet</Text>
          </View>
        )
      }
    }
  }
  
  renderActivityIndicator(){
    if(this.state.pageLoading){
      return (
        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )
    }
  }
  
  render(){
    return(
      <ScrollView style={styles.pageWrapper}>
        {this.renderActivityIndicator()}
        {this.renderBillingHistory()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {},
  noBilling: {
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center'
  }
})