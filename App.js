import React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from './src/lib/styles';
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
// home screen
import HomeScreen from './src/screens/Home';

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
        token: "d2a5f46aafd31fc37bc38d7278a43f241bd8d7129813b2d699749d467767ec4e4cac1d44a6c0ae99c132b23f47edb1840a0610c069df41bf0fac70f6b3c0d3e1"
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

// Home Navigation
const HomeNavigation = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Beranda',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    }
  }
)

// News Navigation
const NewsNavigation = createStackNavigator(
  {
    NewsFeed: {
      screen: NewsFeedScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Berita',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    },
    NewsDetail: {
      screen: NewsDetailScreen,
      navigationOptions: {
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

// billing navigation
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

// report navigation
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

// promo navigation
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
        headerBackImage: <Icon name="arrow-back" size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />,
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle
      }
    }
  }
)

// feed navigation
// const FeedNavigation = createTabNavigator(
//   {
//     FeedNews: {
//       screen: NewsNavigation,
//       navigationOptions: {
//         title: 'BERITA',
//       }
//     },
//     FeedPromo: {
//       screen: PromoNavigation,
//       navigationOptions: {
//         title: 'PROMOSI',
//       }
//     }
//   },
//   {
//     tabBarOptions: {
//       indicatorStyle: {
//         backgroundColor: colors.orange
//       },
//       style: {
//         backgroundColor: colors.purple
//       }
//     }
//   }
// )

// setting navigation
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
    Home: {
      screen: NewsNavigation,
      navigationOptions: {
        title: 'Beranda',
        drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-home.png')} />
      }
    },
    Promo: {
      screen: PromoNavigation,
      navigationOptions: {
        title: 'Promosi',
        drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-home.png')} />
      }
    },
    // News: {
    //   screen: NewsNavigation,
    //   navigationOptions: {
    //     title: 'Newsfeed',
    //     drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-newsfeed.png')} />
    //   }
    // },
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
    initialRouteName: 'Home',
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