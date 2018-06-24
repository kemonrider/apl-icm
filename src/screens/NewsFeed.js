import React from 'react';
import { ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import News from '../components/News';

export default class NewsFeedScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newsList: newsList
    }
  }

  renderNewsFeed() {
    const renderedNewsList = [];
    for(let i = 0; i < this.state.newsList.length; i++){
      renderedNewsList.push(
        <TouchableOpacity 
          key={this.state.newsList[i].id}
          // onPress={this.props.navigation.navigate('NewsDetail', { newsId: this.state.newsList[i].id })}
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

// news list sample
const newsList = [
  {
    id: 1,
    title: "Diskon 10% Untuk Keperluan Dapur Anda di Ranch Market Selama Bulan Maret",
    image: "../assets/images/news/sample-news-image.jpg",
    tag: "Berita"
  }, 
  {
    id: 2,
    title: "Diskon 20% Untuk Keperluan Dapur Anda di Ranch Market Selama Bulan Maret",
    image: "../assets/images/news/sample-news-image.jpg",
    tag: "Berita"
  },
  {
    id: 3,
    title: "Diskon 30% Untuk Keperluan Dapur Anda di Ranch Market Selama Bulan Maret",
    image: "../assets/images/news/sample-news-image.jpg",
    tag: "Berita"
  },
  {
    id: 4,
    title: "Diskon 40% Untuk Keperluan Dapur Anda di Ranch Market Selama Bulan Maret",
    image: "../assets/images/news/sample-news-image.jpg",
    tag: "Berita"
  },
]
