import React from 'react';
import { ScrollView, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import News from '../components/News';
import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class NewsFeedScreen extends React.Component {
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
    this.setState({ pageLoading: true });
    
    let userToken = await appStorage.getItem(storageConst.user);
    userToken = JSON.parse(userToken).token;
    
    fetch(`${env.ENDPOINT}/api/newsfeed`, {
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
    for(let i = 0; i < this.state.newsList.length; i++){
      renderedNewsList.push(
        <TouchableOpacity 
          key={this.state.newsList[i].id}
          onPress={ () => this.props.navigation.navigate('NewsDetail', { newsId: this.state.newsList[i].id }) }
        >
          <News
            {...this.state.newsList[i]}
          />
        </TouchableOpacity>
      )
    }
    return renderedNewsList;
  }

  render() {    
    return (
      <ScrollView>
        {this.renderNewsFeed()}
      </ScrollView>
    )
  }
}
