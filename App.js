import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

/**
 * Screens Component
 */
// splash pages
import SplashScreen from './src/screens/Splash';
// onboarding
import OnBoardingScreen from './src/screens/Onboarding';
// news pages
import NewsFeedScreen from './src/screens/NewsFeed';
import NewsDetailScreen from './src/screens/NewsDetail';
// auth pages
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
// billing pages
import BillingDetailScreen from './src/screens/BillingDetail';
import BillingHistoryScreen from './src/screens/BillingHistory';

export default class App extends React.Component {  
  render() {
    // const Layout = RootNavigation; // root navigation
    // const Layout = NewsNavigation; // news navigation
    // return <Layout />;

    // return NewsDetailScreen;
    return <NewsDetailScreen />;
  }
}

/**
 * Navigation
 * Using react-navigation
 */

// Root Navigation
// const RootNavigation = createSwitchNavigator(
//   {
//     Splash: SplashScreen,
//     Onboarding: OnBoardingScreen,
//     Login: LoginScreen,
//   },
//   {
//     initialRouteName: 'Splash'
//   }
// )

// Auth Navigation
// const LoginNavigation = createStackNavigator(
//   {
//     Login: LoginScreen,
//     Register: RegisterScreen,
//   }
// )

// News Navigation
// const NewsNavigation = createStackNavigator(
//   {
//     NewsFeed: NewsFeedScreen,
//     NewsDetail: NewsDetailScreen
//   },
//   {
//     initialRouteName: 'NewsFeed'
//   }
// )

// Billing Navigation
// const BillNavigation = createStackNavigator(
//   {
    
//   }
// )

// Feedback Navigation
// const FeedbackNavigation = createStackNavigator(
//   {

//   }
// )
