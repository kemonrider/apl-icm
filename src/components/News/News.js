import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const News = props => {
  <View style={this.styles.newsWrapper}>
    <View style={this.styles.newsMain}>
      <View style={this.styles.newsTitle}>
      </View>
      <View style={this.styles.newsGradient}>
      </View>
      <View style={this.styles.newsImage}>
      </View>
    </View>
    <View style={this.styles.newsFooter}>
    </View>
  </View>
};

const styles = StyleSheet.create({
  newsWrapper: {
    width: 100
  },
  newsMain: {
    width: 100
  },
  newsTitle: {
    zIndex: 3,
  },
  newsGradient: {
    zIndex: 2
  },
  newsImage: {
    zIndex: 1
  },
  newsFooter: {
    width: 100
  }
});

export default News;