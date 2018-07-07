import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Image } from 'react-native';

import FormLabel from '../components/Form/Label';

import { colors } from '../lib/styles';
import { appStorage, storageConst } from '../lib/storage';

export default class SettingScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: null,
      email: null,
      unit: null,
      phone: null
    }
  }
  
  getCurrentUser = async () => {
    this.setState({
      name: null,
      email: null,
      unit: null,
      phone: null
    })

    try {
      let currentUser = await appStorage.getItem(storageConst.user);
      currentUser = JSON.parse(currentUser);
      this.setState({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        unit: currentUser.unit
      })
    } catch (error) {
      Alert.alert('Gagal Mengambil Detail User', JSON.stringify(error))
    }

  }
  
  componentDidMount(){
    this.getCurrentUser();
  }
  
  render(){
    return (
      <ScrollView>
        <View style={styles.pageHeader}>
          <Image style={styles.profilePicture} source={require('../assets/images/sample-profile.png')} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFFFFF' }}>{ this.state.name }</Text>
          <Text style={{ fontSize: 12, color: '#FFFFFF' }}>Pemilik Unit</Text>
        </View>
        <View style={styles.pageBody}>
          <View style={styles.formSet}>
            <FormLabel text="Unit Bangunan" />
            <Text style={styles.pageBodyText}>{ this.state.unit }</Text>
          </View>
          <View style={styles.formSet}>
            <FormLabel text="Nomor HP" />
            <Text style={styles.pageBodyText}>{ this.state.phone }</Text>
          </View>
          <View style={styles.formSet}>
            <FormLabel text="Email" />
            <Text style={styles.pageBodyText}>{ this.state.email }</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {},
  pageHeader: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
    paddingBottom: 10,
  },
  pageBody: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  pageBodyText: {
    fontSize: 16
  },
  formSet: {
    marginBottom: 20
  },
  profilePicture: {
    marginBottom: 15
  }
})