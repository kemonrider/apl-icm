import React from 'react';
import { ScrollView, ActivityIndicator, TouchableOpacity, View, Alert } from 'react-native';

import News from '../components/News';
import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class PromoListScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageLoading: true,
      newsList: []
    }
  }

  componentDidMount(){
    this.getPromoList();
  }

  getPromoList = async () => {
    this.setState({ pageLoading: true });
    
    let userToken = await appStorage.getItem(storageConst.user);
    userToken = JSON.parse(userToken).token;
    
    fetch(`${env.ENDPOINT}/api/newsfeed?type=1&limit=10`, {
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
  }
  
  renderNewsFeed() {
    const renderedNewsList = [];
    this.state.newsList.map(news => {
      news.tag = 'Promosi';
      renderedNewsList.push(
        <TouchableOpacity 
          key={news.id}
          onPress={ () => this.props.navigation.navigate('PromoDetail', { promoId: news.id, promoTitle: news.judul }) }
        >
          <News
            {...news}
          />
        </TouchableOpacity>
      )
    })
    return renderedNewsList;
  }

  renderActivityIndicator(){
    if(this.state.pageLoading){
      return (
        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.purple} />
        </View>
      )
    }
  }
  
  render() {
    return (
      <ScrollView>
        {this.renderActivityIndicator()}
        {this.renderNewsFeed()}
      </ScrollView>
    )
  }
}
