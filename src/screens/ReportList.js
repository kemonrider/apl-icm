import React from 'react';
import { ActivityIndicator, View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Report from '../components/Report';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class ReportListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportHistory: [],
      pageLoading: false
    }
  }
  
  componentDidMount(){
    this.getReportList()
  }

  getReportList = async () => {
    if(!this.state.pageLoading){
      try {
        this.setState({ pageLoading: true });
        
        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;
        
        fetch(`${env.ENDPOINT}/api/ticket`, {
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
                this.setState({ reportHistory: responseBody.data })
              } else {
                Alert.alert('Gagal Mengambil Riwayat Layanan', responseBody.message)
              }
            })
          })
      } catch (error) {
        console.log(error)
        Alert.alert('Gagal Mengambil Riwayat Layanan', JSON.stringify(error))
      }
    }
  }

  renderReportHistory = () => {
    const renderedReportHistory = [];
    this.state.reportHistory.map(report => {
      renderedReportHistory.push(
        <TouchableOpacity
          key={report.id}
          onPress={() => {this.props.navigation.navigate('ReportDetail', { reportId: report.id, reportTitle: report.title })}}
        >
          <Report {...report} />
        </TouchableOpacity>
      )
    })
    return renderedReportHistory
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
        {this.renderReportHistory()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {},
})