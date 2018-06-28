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
 * Header navigation style
 */
import { navigationHeaderStyle } from './src/lib/styles';

// Root Navigation
export default RootNavigation = createSwitchNavigator(
  {
    Splash: SplashScreen,
    NotAuthorized: NotAuthorizedNavigation,
    Authorized: AuthorizedNavigation,
  },
  {
    initialRouteName: 'Splash'
  }
)

// Not Authorized Navigation
const NotAuthorizedNavigation = createStackNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'Onboarding'
  }
)

// Authorized Navigation
const AuthorizedNavigation = createStackNavigator(
  {
    Newsfeed: {
      screen: NewsFeedScreen,
      navigationOptions: {
        headerStyle: navigationHeaderStyle
      }
    },
    NewsDetail: {
      screen: NewsDetailScreen,
      navigationOptions: {
        headerStyle: navigationHeaderStyle
      }
    },
    BillingHistory: {
      screen: BillingHistoryScreen,
      navigationOptions: {
        headerStyle: navigationHeaderStyle
      }
    },
    BillingDetail: {
      screen: BillingDetailScreen,
      navigationOptions: {
        headerStyle: navigationHeaderStyle
      }
    },
    reportList: {
      screen: ReportListScreen,
      navigationOptions: {
        headerStyle: navigationHeaderStyle
      }
    },
    ReportDetailScreen: {
      screen: ReportDetailScreen,
      navigationOptions: {
        headerStyle: navigationHeaderStyle
      }
    }
  }
)

