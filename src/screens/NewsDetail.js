import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class NewsDetailScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageLoading: false,
      newsDate: null,
      newsTitle: null,
      newsImage: null,
      newsBody: null
    }
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    this.getNewsDetail(navigation.getParam('newsId'));
  }
  
  getNewsDetail = async (newsId) => {
    this.setState({ 
      pageLoading: true,
      // reset news
      newsDate: null,
      newsTitle: null,
      newsImage: null,
      newsBody: null
    })

    let userToken = await appStorage.getItem(storageConst.user);
    userToken = JSON.parse(userToken).token;

    fetch(`${env.ENDPOINT}/api/newsfeed/read/${newsId}`, {
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
            this.setState({
              newsDate: responseBody.data.tanggal || null,
              newsTitle: responseBody.data.judul || null,
              newsBody: responseBody.data.berita || null,
              newsImage: responseBody.data.gambar || null
            })
          } else {
            Alert.alert('Gagal Mengambil Berita', responseBody.message)
          }
        })
      })
  }
  
  render() {
    return(
      <ScrollView style={styles.pageWrapper}>
        <View style={styles.pageHeader}>
          <Image style={{ width: '100%' }} source={require('../assets/images/news/sample-news-image.jpg')} />
        </View>
        <View style={styles.pageBody}>
          <View style={styles.newsDateWrapper}>
            <Text style={styles.newsDate}>{ this.state.newsDate }</Text>
          </View>
          <View style={styles.newsTitleWrapper}>
            <Text style={styles.newsTitle}>{ this.state.newsTitle }</Text>
          </View>
          <View style={styles.newsBodyWrapper}>
            <Text style={styles.newsBody}>
              { this.state.newsBody }
              </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {},
  pageHeader: {},
  pageBody: {
    padding: 25
  },
  newsDateWrapper: {
    marginBottom: 10
  },
  newsDate: {},
  newsTitleWrapper: {
    marginBottom: 10
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 26
  },
  newsBodyWrapper: {},
  newsBody: {}
})