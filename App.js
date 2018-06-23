import React from 'react';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

// pages components
import OnboardingPage from './src/page/Onboarding';
import NewsFeedPage from './src/page/NewsFeed';
import NewsDetailPage from './src/page/NewsDetail';
import LoginPage from './src/page/Login';
import SplashPage from './src/page/Splash';

export default class App extends React.Component {
  render() {
    return (
      <NewsFeedPage />
    );
  }
}

const MainRoutes = createSwitchNavigator(
  {
    Splash: SplashPage,
    Onboarding: OnboardingPage,
    Login: LoginPage
  },
  {
    initialRouteName: 'Splash'
  }
)

const NewsStack = createStackNavigator(
  {
    NewsFeed: NewsFeedPage,
    NewsDetail: NewsDetailPage
  }
)