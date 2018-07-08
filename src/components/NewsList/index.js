import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import News from '../../components/News';

import { colors } from '../../lib/styles';
import { env } from '../../lib/environment';
import { appStorage, storageConst } from '../../lib/storage';

export default class NewsList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      newsCategory: null,
      newsList: []
    }
  }
  
  componentDidMount(){
    this.getNewsList(this.props.category);
  }
  
  /**
   * Get news list from API
   */
  getNewsList = async (newsCategory) => {
    if(!this.state.loading){
      try {

        // set state loading to true
        this.setState({
          loading: true
        });

        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;
        
        fetch(`${env.ENDPOINT}/api/newsfeed?type=${newsCategory}&limit=${env.NEWS_DEFAULT_LENGTH}`, {
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
                throw({ code: response.status, message: responseBody.message })
              }
            })
          })
        
      } catch (error) {
        console.log('Error fetching news list');
        console.log(error);
        Alert.alert('Gagal Mengambil Berita', error.message)
      }
    }
  }
  
  /**
   * Render news list
   */
  renderNewsList = (newsList) => {
    let renderedNewsList = [];
    newsList.map(news => {
      renderedNewsList.push(
        <News {...news} />
      )
    })
  }
  
  /**
   * Render activity indicator
   */
  renderActivityIndicator = (state) => {
    if(state){
      return (
        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.purple} />
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        { this.renderActivityIndicator(this.state.loading) }
        { this.renderNewsList(this.props.newsCategory) }
      </View>
    )
  }
}