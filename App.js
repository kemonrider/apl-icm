import React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

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
import LogoutScreen from './src/screens/Logout';
// billing screens
import BillingDetailScreen from './src/screens/BillingDetail';
import BillingHistoryScreen from './src/screens/BillingHistory';
// report screens
import ReportListScreen from './src/screens/ReportList';
import ReportDetailScreen from './src/screens/ReportDetail';
// promo screens
import PromoListScreen from './src/screens/PromoList';
import PromoDetailScreen from './src/screens/PromoDetail';
// setting screen
import SettingScreen from './src/screens/Setting';

/**
 * Navigation Header Style
 */
import { navigationHeaderStyle, navigationHeaderTitleStyle } from './src/lib/styles';

export default class App extends React.Component {    
  constructor(props){
    super(props);
    
    this.injectUserToken();
  }
  
  // development only
  injectUserToken = async () => {
    appStorage.clearItem()
    appStorage.setItem(
      storageConst.user,
      {
        name: "irwandi",
        email: "irwandi@gmail.com",
        phone: "0811232769",
        unit: "W/19/WH",
        token: "ab66b58617001d353ccf5266e7ae62b7d1633a1e5b15c0ccd81f60a92418b642b878aaf14250dfd222db8ba743527d1446f88be9fe2cb78e9447833189ca8fc1"
      }
    )
  }
  
  render() {    
    return <RootNavigation />;
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

const PromoNavigation = createStackNavigator(
  {
    PromoList: {
      screen: PromoListScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Promo',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    },
    PromoDetail: {
      screen: PromoDetailScreen,
      navigationOptions: {
        headerTitle: 'Detail Promo',
        headerBackImage: <Icon name="arrow-back" size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />,
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle
      }
    }
  }
)

const SettingNavigation = createStackNavigator(
  {
    SettingList: {
      screen: SettingScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Pengaturan',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    }
  }
)

// drawer content
const DrawerCustomComponent = (props) => {
  return (
    <ScrollView>
      <View style={{ width: '100%', height: 150, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('./src/assets/images/drawer-header.png')} />
      </View>
      <View>
        <DrawerItems {...props} />
      </View>
    </ScrollView>
  )
}

// Authorized Navigation
const AuthorizedNavigation = createDrawerNavigator(
  {
    News: {
      screen: NewsNavigation,
      navigationOptions: {
        title: 'Newsfeed',
        drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-newsfeed.png')} />
      }
    },
    Billing: {
      screen: BillingNavigation,
      navigationOptions: {
        title: 'Riwayat',
        drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-billing.png')} />
      }
    },
    Report: {
      screen: ReportNavigation,
      navigationOptions: {
        title: 'Layanan',
        drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-service.png')} />
      }
    },
    Setting: {
      screen: SettingNavigation,
      navigationOptions: {
        title: 'Pengaturan',
        drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-setting.png')} />
      }
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: {        
        title: 'Keluar',
        header: null,
        drawerIcon: <Icon name="power-settings-new" size={20} color="#F19100" />
      }
    }
  },
  {
    initialRouteName: 'News',
    contentComponent: DrawerCustomComponent
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