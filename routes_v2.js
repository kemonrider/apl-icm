/**
 * TODO:
 * Routing using react redux navigation
 */
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


/**
 * Navigation
 * Using react-navigation
 */

// Root Navigation
export const RootNavigation = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Onboarding: ObBoardingScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Splash'
  }
)

// Auth Navigation
export const LoginNavigation = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
        headerStyle: {
          height: 0
        }
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: 'Register',
        headerStyle: {
          height: 0
        }
      }
    },
  },
  {
    initialRouteName: 'Login'
  }
)

// News Navigation
export const NewsNavigation = createStackNavigator(
  {
    NewsFeed: NewsFeedScreen,
    NewsDetail: NewsDetailScreen
  },
  {
    initialRouteName: 'NewsFeed'
  }
)

// Billing Navigation
export const BillNavigation = createStackNavigator(
  {
    BillingHistory: BillingHistoryScreen,
    BIllingDetail: BillingDetailScreen
  },
  {
    initialRouteName: 'BillingHistory'
  }
)

// Feedback Navigation
export const ReportNavigation = createStackNavigator(
  {
    ReportList: ReportListScreen,
    ReportDetailScreen: ReportDetailScreen
  },
  {
    initialRouteName: 'ReportList'
  }
)
