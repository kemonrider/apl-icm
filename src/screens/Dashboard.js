import React from 'react';
import { ScrollView, ActivityIndicator, View, Alert, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ImageSlider from 'react-native-image-slider';

import News from '../components/News';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class DashboardScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageLoading: false,
      billingList: [],
      unpaidBill: null,
      newsList: [],
      bannerImages: []
    }
  }

  componentDidMount(){
    this.getNewsFeed()
    this.getBillingList()
    this.getBannerImages()
  }

  getBillingList = async () => {
    if(!this.state.billingList.length){
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
                let unpaidBill = 0;

                responseBody.data.map(data => {
                  if(data.is_paid != '1'){
                    unpaidBill = unpaidBill + parseInt(data.bill_total)
                  }
                })

                // console.log(unpaidBill);
                
                this.setState({ 
                  unpaidBill: unpaidBill,
                  billingList: responseBody.data 
                })
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
  
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  getNewsFeed = async () => {
    if(!this.state.newsList.length){
      try {
        this.setState({ pageLoading: true });
        
        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;
        
        fetch(`${env.ENDPOINT}/api/newsfeed?&limit=${env.NEWS_DEFAULT_LENGTH}`, {
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
              if(response.status === 401){
                appStorage.clearItem();
                this.props.navigation.navigate('NotAuthorized');
              }
              if(response.status === 200){
                this.setState({ newsList: responseBody })
              } else {
                Alert.alert('Gagal Mengambil Berita', responseBody.message)
              }
            })
          })
      } catch (error) {
        console.log(error);
        Alert.alert('Gagal Mengambil Berita', JSON.stringify(error))
      }
    }
  }
  
  getBannerImages = async () => {
    if(!this.state.bannerImages.length){
      try {
        this.setState({ pageLoading: true });
        
        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;
        
        fetch(`${env.ENDPOINT}/api/banner`, {
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
              if(response.status === 401){
                appStorage.clearItem();
                this.props.navigation.navigate('NotAuthorized');
              }
              if(response.status === 200){
                this.setState({ bannerImages: responseBody.data })
              } else {
                Alert.alert('Gagal Mengambil Berita', responseBody.message)
              }
            })
          })
      } catch (error) {
        console.log(error);
        Alert.alert('Gagal Mengambil Berita', JSON.stringify(error))
      }
    }
  }
  
  renderNewsFeed() {
    if(this.state.newsList.length){
      const renderedNewsList = [];
      this.state.newsList.map(news => {
        news.tag = news.type_name;
        renderedNewsList.push(
          <News 
          {...news} 
          key={news.id}
          onLink={ () => this.props.navigation.navigate('MODAL_NewsDetail', { newsId: news.id, newsTitle: news.judul }) }
          />
        )
      })
      return renderedNewsList;
    }
  }

  renderBanner = () => {
    if(this.state.bannerImages.length){
      return (
        <ImageSlider images={this.state.bannerImages}/>
      )
    }
  }
  
  renderActivityIndicator(){
    if(!this.state.billingList.length && !this.state.newsList.length){
      return (
        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )
    }
  }
  
  setSliderHeight = (windowWidth) => {
    return windowWidth / ( 16 / 9 )
  }
  
  renderBilling = () => {
    if(this.state.unpaidBill){
      return (
        <View style={styles.billingWrapper}>
          <View style={{ height: this.setSliderHeight(Dimensions.get('window').width) }}>
            {this.renderBanner()}
          </View>
          <View style={styles.billingDetail}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Billing')}
              >
                <Text style={styles.billingTitle}>Jumlah Tagihan</Text>
                <Text style={styles.billingNumber}>Rp {this.numberWithCommas(this.state.unpaidBill)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }
  
  render() {
    return (
      <ScrollView>
        {this.renderActivityIndicator()}
        {this.renderBilling()}
        {this.renderNewsFeed()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  billingWrapper: {
    width: '100%',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD'
  },
  billingDetail: {
    paddingVertical: 15,
    backgroundColor: "#FFFFFF"
  },
  billingTitle: {
    fontSize: 10
  },
  billingNumber: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold'
  }
})
