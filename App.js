import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

/**
 * Screens Component
 */
// splash screens
import SplashScreen from './src/screens/Splash';
// onboarding screens
import OnboardingScreen from './src/screens/Onboarding';
// news screens
import NewsFeedScreen from './src/screens/NewsFeed';
import NewsDetailScreen from './src/screens/NewsDetail';
// auth screens
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
// billing screens
import BillingDetailScreen from './src/screens/BillingDetail';
import BillingHistoryScreen from './src/screens/BillingHistory';
// report screens
import ReportListScreen from './src/screens/ReportList';
import ReportDetailScreen from './src/screens/ReportDetail';

export default class App extends React.Component {  
  render() {
    // const Layout = RootNavigation; // root navigation
    // const Layout = NewsNavigation; // news navigation
    // return <Layout />;

    return <OnboardingScreen />;
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
