import React from 'react';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { appStorage, storageConst } from './src/lib/storage';

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
 * Navigation Header Style
 */
import { navigationHeaderStyle, navigationHeaderTitleStyle } from './src/lib/styles';

export default class App extends React.Component {    
  render() {
    // development only
    appStorage.setItem(
      storageConst.user,
      {
        name: "irwandi",
        email: "irwandi@gmail.com",
        phone: "0811232769",
        unit: "W/19/WH",
        token: "627b0be12af7ca0fb9cf7e78b31ba83ecbb3f608dfa19b660172be16cb50f4aa3fa0d5c19e67aa29a1843f63e124f15e8277e82a49b84b44e7154b0d883e5013"
      }
    )
    
    return <RootNavigation />;

    // Development purpose only
    // return <RegisterScreen />
  }
}

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

// News Navigation
const NewsNavigation = createStackNavigator(
  {
    NewsFeed: {
      screen: NewsFeedScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Newsfeed',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    },
    NewsDetail: {
      screen: NewsDetailScreen,
      navigationOptions: {
        headerTitle: 'News Detail',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerBackImage: <Icon name="arrow-back" size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />,
      }
    },
  },
  {
    initialRouteName: 'NewsFeed'
  }
)

const BillingNavigation = createStackNavigator(
  {
    BillingHistory: {
      screen: BillingHistoryScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Riwayat',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    },
    BillingDetail: {
      screen: BillingDetailScreen,
      navigationOptions: {
        headerTitle: 'Detail Tagihan',
        headerBackImage: <Icon name="arrow-back" size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />,
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle
      }
    },
  },
  {
    initialRouteName: 'BillingHistory'
  }
)

const ReportNavigation = createStackNavigator(
  {
    ReportList: {
      screen: ReportListScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Layanan',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    },
    ReportDetail: {
      screen: ReportDetailScreen,
      navigationOptions: {
        headerTitle: 'Aduan',
        headerBackImage: <Icon name="arrow-back" size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />,
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle
      }
    }
  },
  {
    initialRouteName: 'ReportList'
  }
)

// Authorized Navigation
const AuthorizedNavigation = createDrawerNavigator(
  {
    News: NewsNavigation,
    Billing: BillingNavigation,
    Report: ReportNavigation
  },
  {
    initialRouteName: 'News'
  }
)

// Root Navigation
const RootNavigation = createSwitchNavigator(
  {
    Splash: SplashScreen,
    NotAuthorized: NotAuthorizedNavigation,
    Authorized: AuthorizedNavigation,
  },
  {
    initialRouteName: 'Splash'
  }
)