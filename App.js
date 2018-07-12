import React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { env } from './src/lib/environment';
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
// favorite screens
import FavoriteListScreen from './src/screens/FavoriteList';
// auth screens
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import LogoutScreen from './src/screens/Logout';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
// billing screens
import BillingDetailScreen from './src/screens/BillingDetail';
import BillingHistoryScreen from './src/screens/BillingHistory';
// report screens
import ReportCategoryScreen from './src/screens/ReportCategory';
import ReportCreateScreen from './src/screens/ReportCreate';
import ReportListScreen from './src/screens/ReportList';
import ReportDetailScreen from './src/screens/ReportDetail';
// promo screens
import PromoListScreen from './src/screens/PromoList';
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
    
    if(env.APP_ENV == 'development'){
      this.injectUserToken();
    }
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
        token: "689385b215b7bd66c0351c9d5d267eb503fda35541f56a0af898127a23a145612b3ad4ab77792f070aaaa396ae75cfe98afe86a62fb41664fa09bedaed646f97"
      }
    )
  }
  
  render() {
    return <MainNavigation />;
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
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Onboarding'
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
    ReportCategory: {
      screen: ReportCategoryScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Layanan',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    },
    ReportCreate: {
      screen: ReportCreateScreen,
      navigationOptions: {
        headerBackImage: <Icon name="arrow-back" size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />,
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle
      }
    }
  },
  {
    initialRouteName: 'ReportCategory'
  }
)

// report list navigation
const ReportHistoryNavigation = createStackNavigator(
  {
    ReportList: {
      screen: ReportListScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Riwayat Laporan',
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

// feed navigation
const FeedNavigation = createTabNavigator(
  {
    FeedNews: {
      screen: NewsFeedScreen,
      navigationOptions: {
        title: 'BERITA',
      }
    },
    FeedPromo: {
      screen: PromoListScreen,
      navigationOptions: {
        title: 'PROMOSI',
      }
    },
    FeedFavorite: {
      screen: FavoriteListScreen,
      navigationOptions: {
        title: 'FAVORIT'
      }
    }
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: colors.secondary
      },
      style: {
        backgroundColor: colors.primary
      }
    }
  }
)

// Home Navigation
const HomeNavigation = createStackNavigator(
  {
    Home: {
      screen: FeedNavigation,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Newsfeed',
        headerTitleStyle: navigationHeaderTitleStyle,
        headerStyle: navigationHeaderStyle,
        headerLeft: <Icon name="menu" onPress={() => { navigation.openDrawer() }} size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
      })
    }
  }
)

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
      screen: HomeNavigation,
      navigationOptions: {
        title: 'Newsfeed',
        drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-newsfeed.png')} />
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
        title: 'Tagihan',
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
    ReportHistory: {
      screen: ReportHistoryNavigation,
      navigationOptions: {
        title: 'Riwayat',
        drawerIcon: <Image source={require('./src/assets/images/drawer/drawer-history.png')} />
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
        drawerIcon: <Icon name="power-settings-new" size={20} color="#023B2D" />
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

// main nav
const MainNavigation = createStackNavigator(
  {
    Root: {
      screen: RootNavigation,
      navigationOptions: {
        header: null
      }
    },
    MODAL_NewsDetail: NewsDetailScreen
  },
  {
    mode: 'modal',
    // headerMode: 'none'
  }
)