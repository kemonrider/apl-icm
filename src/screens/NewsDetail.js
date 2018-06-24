import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';

export default class NewsDetailScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return(
      <ScrollView style={styles.pageWrapper}>
        <View style={styles.pageHeader}>
          <Image source={require('../assets/images/news/sample-news-image.jpg')} />
        </View>
        <View style={styles.pageBody}>
          <View style={styles.newsDateWrapper}>
            <Text style={styles.newsDate}>Sunday, 30 June 2018</Text>
          </View>
          <View style={styles.newsTitleWrapper}>
            <Text style={styles.newsTitle}>Nam nec metus massa. Vivamus in nibh eu sapien laoreet condimentum.</Text>
          </View>
          <View style={styles.newsBodyWrapper}>
            <Text style={styles.newsBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis urna ut cursus scelerisque. Sed lacinia malesuada turpis ut volutpat. Integer blandit nibh in vestibulum vestibulum. Fusce lacinia fringilla ipsum, sed sagittis lorem interdum quis. Aliquam erat volutpat. Ut tristique pellentesque sagittis. Aliquam eget quam tincidunt mi feugiat varius. Etiam sed lobortis eros. Vestibulum eget ligula suscipit, hendrerit lectus vel, pharetra est. Phasellus molestie augue nec mi aliquet, et gravida velit blandit. Nunc faucibus nibh varius, aliquet nulla vel, sodales tortor. Nunc tincidunt urna sit amet ligula faucibus rhoncus. Curabitur eget iaculis lacus, at pharetra mauris. Aliquam ultricies pulvinar mi, tempor faucibus quam cursus eu.
              Sed augue diam, tristique at consectetur sed, fringilla eget purus. Nam nec metus massa. Vivamus in nibh eu sapien laoreet condimentum. Ut nec diam quis neque tempor euismod ut at metus. Donec consequat pharetra luctus. Nam sit amet rhoncus risus. Sed fermentum dictum ultrices. Quisque et malesuada lectus. Integer malesuada convallis laoreet. Praesent euismod, erat sed fermentum pharetra, turpis odio bibendum magna, eget tempor nulla nunc in elit. Pellentesque sit amet velit mollis neque fermentum porttitor. Nulla volutpat pretium ante vitae condimentum. Vivamus nec euismod diam, id sollicitudin quam.
              Morbi luctus ut augue nec molestie. Curabitur in erat orci. Vestibulum blandit dapibus nibh, id faucibus tellus gravida non. Quisque pretium dolor turpis, non vulputate erat lacinia sed. Nulla convallis nibh non tellus sagittis lacinia. Aenean sed sem arcu. Proin sed aliquet turpis. Maecenas rhoncus sem auctor mi cursus, eu sagittis purus egestas. Suspendisse viverra nec elit quis tincidunt. Phasellus ullamcorper lacus sodales tellus imperdiet iaculis. Fusce id condimentum mauris, sed laoreet mi. Nam sagittis a enim ut lacinia. Duis arcu odio, faucibus eget erat ac, accumsan consectetur enim. In egestas risus ut quam egestas pretium. In sed placerat justo, euismod tempor turpis.
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