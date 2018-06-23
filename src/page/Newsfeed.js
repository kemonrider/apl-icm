import React from 'react';
import { ScrollView, Image, Text, StyleSheet } from 'react-native';

import News from '../components/News';

export default class NewsFeedPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newsList: newsList
    }
  }

  renderNewsList() {
    const renderedNewsList = [];
    for(let i = 0; i < this.state.newsList.length; i++){
      renderedNewsList.push(
        <News
          key={this.state.newsList[i].id}
          image={this.state.newsList[i].image}
          title={this.state.newsList[i].title}
          tag={this.state.newsList[i].tag}
        />
      )
    }
    return renderedNewsList;
  }
  
  // render component
  render() {
    return (
      <ScrollView>
        {this.renderNewsList()}
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
    title: "Diskon 10% Untuk Keperluan Dapur Anda di Ranch Market Selama Bulan Maret",
    image: "../assets/images/news/sample-news-image.jpg",
    tag: "Berita"
  },
  {
    id: 3,
    title: "Diskon 10% Untuk Keperluan Dapur Anda di Ranch Market Selama Bulan Maret",
    image: "../assets/images/news/sample-news-image.jpg",
    tag: "Berita"
  },
  {
    id: 4,
    title: "Diskon 10% Untuk Keperluan Dapur Anda di Ranch Market Selama Bulan Maret",
    image: "../assets/images/news/sample-news-image.jpg",
    tag: "Berita"
  },
]
