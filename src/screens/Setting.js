import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';

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
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFFFFF' }}>{ this.state.name }</Text>
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
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple
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
  }
})