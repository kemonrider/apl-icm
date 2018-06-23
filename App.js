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
    const Layout = RootNavigation;
    return <Layout />;
  }
}

/**
 * Navigations
 */

// Root Navigation
const RootNavigation = createSwitchNavigator(
  {
    Splash: SplashPage,
    Onboarding: OnboardingPage,
    LoginPage: LoginPage,
    NewsFeed: NewsFeedPage
  },
  {
    initialRouteName: 'Splash'
  }
)

// News Navigation
const NewsNavigation = createStackNavigator(
  {
    NewsFeed: NewsFeedPage,
    NewsDetail: NewsDetailPage
  }
)

// Bill Navigation
// const BillNavigation = createStackNavigator(
//   {
    
//   }
// )

// Feedback Navigation
// const FeedbackNavigation = createStackNavigator(
//   {

//   }
// )
