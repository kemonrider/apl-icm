import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../lib/styles';
import { env } from '../../lib/environment';
import { appStorage, storageConst } from '../../lib/storage';

export default class News extends React.Component {  
  constructor(props){
    super(props);

    this.state = {
      width: '100%',
      height: 200,
      is_fav: this.props.is_fav
    }
  }
  
  getNewsImage = () => {
    if(this.props.image_url){
      return (
        <Image
          style={{
            width: this.state.width, 
            height: this.state.height
          }}
          source={{uri: this.props.image_url}}
        />
      )
    } else {
      return <Image style={{ width: '100%' }} source={require('../../assets/images/news/sample-news-image.jpg')} />
    }
  }

  onFav = async () => {
    try {      
      let userToken = await appStorage.getItem(storageConst.user);
      userToken = JSON.parse(userToken).token;
      
      const favAction = ( this.state.is_fav == '0' ? 'favorite' : 'unfavorite' );
      
      fetch(`${env.ENDPOINT}/api/newsfeed/${favAction}/${this.props.id}`, {
        method: 'POST',
        headers: new Headers({
          'Accept-Encoding': 'application/json',
          'Content-Type': 'application/json',
          'Token': userToken
        })
      })
        .then(response => {
          response.json().then(responseBody => {
            if(this.state.is_fav == '0'){
              this.setState({ is_fav : '1' })
            } else {
              this.setState({ is_fav : '0' })
            }
          })
        })
    } catch ( error ) {
      console.log(error);
      Alert.alert('Gagal Like / Unlike berita', error.message);
    }
  }

  render(){
    return (
      <View style={styles.newsWrapper}>
        <View style={styles.newsMain}>
          <TouchableOpacity
            onPress={this.props.onLink}
          >
            <View style={styles.newsTitleWrapper}>
              <Text style={styles.newsTitle}>{this.props.judul}</Text>
            </View>
            <View style={styles.newsGradient}>
              <Image style={{ width: '100%' }} source={require('../../assets/images/news/news-image-overlay.png')} />
            </View>
            <View style={styles.newsImage}>
              {this.getNewsImage()}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.newsFooter}>
          <View style={styles.newsTagWrapper}>
            <Icon name="local-offer" size={iconStyle.size} />
            <Text style={styles.newsTag}> {this.props.tag} </Text>
          </View>
          <View style={{ flex: 0.25 }}></View>
          <View style={styles.newsLikeWrapper}>
            <TouchableOpacity
              onPress={() => this.onFav()}
            >
              <Text style={styles.newsLike}> <Icon name="favorite" color={ (this.state.is_fav == 1) ? colors.orange : null } size={iconStyle.size} /> Suka </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newsShareWrapper}>
            <TouchableOpacity
              onPress={() => Share.share({ message: this.props.ringkasan, title: this.props.judul, url: this.props.link })}
            >
              <Text style={styles.newsShare}><Icon name="share" size={iconStyle.size} /> Bagikan </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
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