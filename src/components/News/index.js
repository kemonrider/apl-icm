import React from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const News = props => {
  return (
    <View style={styles.newsWrapper}>
      <View style={styles.newsMain}>
        <View style={styles.newsTitleWrapper}>
          <Text style={styles.newsTitle}>{props.title}</Text>
        </View>
        <View style={styles.newsGradient}>
          <Image source={require('../../assets/images/news/news-image-overlay.png')} />
        </View>
        <View style={styles.newsImage}>
          <Image source={require('../../assets/images/news/sample-news-image.jpg')} />
        </View>
      </View>
      <View style={styles.newsFooter}>
        <View style={styles.newsTagWrapper}>
          <Icon name="local-offer" size={iconStyle.size} />
          <Text style={styles.newsTag}> {props.tag} </Text>
        </View>
        <View style={{ flex: 0.25 }}></View>
        <View style={styles.newsLikeWrapper}>
          <Icon name="favorite" size={iconStyle.size} />
          <Text style={styles.newsLike}> Suka </Text>
        </View>
        <View style={styles.newsShareWrapper}>
          <Icon name="share" size={iconStyle.size} />
          <Text style={styles.newsShare}> Bagikan </Text>
        </View>
      </View>
    </View>
  )
};

const iconStyle = {
  size: 14
}

const styles = StyleSheet.create({
  newsWrapper: {
    width: '100%',
    marginBottom: 20,
    elevation: 1
  },
  newsMain: {
    width: '100%'
  },
  newsTitleWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
    justifyContent: 'flex-end',
    padding: 20,
    paddingRight: 30
  },
  newsTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14
  },
  newsGradient: {
    zIndex: 2,
    justifyContent: 'flex-end'
  },
  newsImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1
  },
  newsFooter: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 15,
    width: '100%',
    flexDirection: 'row'
  },
  newsTagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.25
  },
  newsTag: {},
  newsLikeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.25,
    justifyContent: 'flex-end'
  },
  newsLike: {},
  newsShareWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.25,
    justifyContent: 'flex-end'
  },
  newsShare: {}
});

export default News;