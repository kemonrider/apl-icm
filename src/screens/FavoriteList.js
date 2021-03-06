import React from 'react';
import { ScrollView, ActivityIndicator, View, Alert } from 'react-native';

import News from '../components/News';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class FavouriteListScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageLoading: false,
      newsList: []
    }
  }

  componentDidMount(){
    this.getNewsFeed();
  }
  
  getNewsFeed = async () => {
    if(!this.state.pageLoading){
      try {
        this.setState({ pageLoading: true });
        
        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;
        
        fetch(`${env.ENDPOINT}/api/newsfeed?fav=1&limit=${env.NEWS_DEFAULT_LENGTH}`, {
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
  
  renderNewsFeed() {
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

  renderActivityIndicator(){
    if(this.state.pageLoading){
      return (
        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
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
