import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../lib/styles';

export default class OnboardingScreen extends React.Component {  
  constructor(props){
    super(props);
  }
  
  navigateToLogin = () => {
    // NOTE (2018-06-23):
    // Currently this function to navigate is a temporary hack
    // to fix the memory leak issue.
    // Same issue has already been posted here:
    // https://github.com/jfilter/react-native-onboarding-swiper/issues/20

    // TODO:
    // Fix the redirect once the PR is done.
    setTimeout(() => {
      this.props.navigation.navigate('Login')
    }, 100)
  }
  
  render() {
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: colors.primary,
            image: <Image source={require('../assets/images/onboarding/onboarding-1.png')} />,
            title: 'Lihat Tagihan',
            subtitle: 'Lihat Tagihan Utilitas Anda'
          },
          {
            backgroundColor: colors.primary,
            image: <Image source={require('../assets/images/onboarding/onboarding-2.png')} />,
            title: 'Selalu Up-to-date',
            subtitle: 'Dapatkan berita dan informasi terbaru seputar hunian Anda dalam newsfeed'
          },
          {
            backgroundColor: colors.primary,
            image: <Image source={require('../assets/images/onboarding/onboarding-3.png')} />,
            title: 'Dapatkan Bantuan',
            subtitle: 'Mengalami kendala atau gangguan? Laporkan dan kami siap membantu!'
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
        onSkip={this.navigateToLogin}
        onDone={this.navigateToLogin}
      />
    )
  }
}