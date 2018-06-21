import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StyleSheet, Text, Image } from 'react-native';

export default class OnboardingPage extends React.Component {  
  render() {

    const backgroundColor = '#F19100';
    
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: backgroundColor,
            image: <Image source={require('../assets/images/onboarding/onboarding-1.png')} />,
            title: 'Lihat dan Bayar Tagihan',
            subtitle: 'Lunasi tagihan listrik, air, telepon, hingga internet tanpa ribet langsung di ponsel'
          },
          {
            backgroundColor: backgroundColor,
            image: <Image source={require('../assets/images/onboarding/onboarding-2.png')} />,
            title: 'Selalu Up-to-date',
            subtitle: 'Dapatkan berita dan informasi terbaru seputar hunian Anda dalam newsfeed'
          },
          {
            backgroundColor: backgroundColor,
            image: <Image source={require('../assets/images/onboarding/onboarding-3.png')} />,
            title: 'Belanja Kebutuhan Harian',
            subtitle: 'Praktis belanja makanan, minuman, kebutuhan dapur, dan kebutuhan harian lainnya'
          },
          {
            backgroundColor: backgroundColor,
            image: <Image source={require('../assets/images/onboarding/onboarding-4.png')} />,
            title: 'Booking Fasilitas Umum',
            subtitle: 'Booking lapangan tenis, lapangan basket, dan balai warga makin mudah'
          }
        ]}
        skipLabel="Lewati"
        nextLabel={<Icon name="arrow-forward" size={24} color="#ffffff" />}
        bottomBarHighlight={false}
        imageContainerStyles={{
          paddingBottom: 100
        }}
        controlStatusBar={false}
        bottomBarHeight={50}
      />
    )
  }
}