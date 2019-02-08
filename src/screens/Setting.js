import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Image, TextInput, TouchableOpacity } from 'react-native';

import FormLabel from '../components/Form/Label';

import { colors } from '../lib/styles';
import { appStorage, storageConst } from '../lib/storage';
import { changePassword } from '../requests';

export default class SettingScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: null,
      email: null,
      unit: null,
      phone: null,
      site: null,
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      formSubmitting: false,
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
        unit: currentUser.unit,
        site: currentUser.building_name,
      })
    } catch (error) {
      Alert.alert('Gagal Mengambil Detail User', JSON.stringify(error))
    }

  }
  
  componentDidMount(){
    this.getCurrentUser();
  }
  
  onFormSubmit = async () => {
    const { formSubmitting, newPassword, newPasswordConfirmation, oldPassword } = this.state;
    const { navigate } = this.props.navigation;
    
    if(!formSubmitting){
      this.setState({ formSubmitting: true });
      try {
        const changePasswordResult = await changePassword(oldPassword, newPassword, newPasswordConfirmation);
        if(changePasswordResult.data){
          Alert.alert('Ganti Password Berhasil', changePasswordResult.data, [
            {text: 'Ok', onPress: () => { console.log(navigate); navigate('Logout') }}
          ]);
        } else {
          Alert.alert('Error', changePasswordResult.message);
        }
      }catch(err){
        this.setState({formSubmitting: false});
        Alert.alert('Error', err.message);
      }
    } else {
      return false;
    }    
  }
  
  render(){
    return (
      <ScrollView style={styles.pageWrap}>
        <View style={styles.pageHeader}>
          <Image style={styles.profilePicture} source={require('../assets/images/sample-profile.png')} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFFFFF' }}>{ this.state.name }</Text>
          <Text style={{ fontSize: 12, color: '#FFFFFF' }}>Pemilik Unit</Text>
        </View>
        <View style={styles.pageBody}>
          <View style={styles.formSet}>
            <FormLabel textColor="#999999" text="Unit Bangunan" />
            <Text style={styles.pageBodyText}>{ this.state.unit }</Text>
          </View>
          <View style={styles.formSet}>
            <FormLabel textColor="#999999" text="Site" />
            <Text style={styles.pageBodyText}>{ this.state.site }</Text>
          </View>
          <View style={styles.formSet}>
            <FormLabel textColor="#999999" text="Nomor HP" />
            <Text style={styles.pageBodyText}>{ this.state.phone }</Text>
          </View>
          <View style={styles.formSet}>
            <FormLabel textColor="#999999" text="Email" />
            <Text style={styles.pageBodyText}>{ this.state.email }</Text>
          </View>
          <View style={{borderTopWidth: 1, borderTopColor: '#aaaaaa', marginBottom: 16}}></View>
          <View style={styles.formSet}>
            <Text style={{fontSize: 16}}>Ganti Password</Text>
            <FormLabel textColor="#999999" text="password lama" />
            <TextInput 
              secureTextEntry={true} 
              style={styles.textInput} 
              onChangeText={ (text) => this.setState({oldPassword: text}) }
              value={this.state.oldPassword}
            />
          </View>
          <View style={styles.formSet}>
            <FormLabel textColor="#999999" text="password baru" />
            <TextInput 
              secureTextEntry={true} 
              style={styles.textInput} 
              onChangeText={ (text) => this.setState({newPassword: text}) }
              value={this.state.newPassword}
            />
          </View>
          <View style={styles.formSet}>
            <FormLabel textColor="#999999" text="konfirmasi password baru" />
            <TextInput 
              secureTextEntry={true} 
              style={styles.textInput} 
              onChangeText={ (text) => this.setState({newPasswordConfirmation: text}) }
              value={this.state.newPasswordConfirmation}
            />
          </View>
          <View style={styles.formSet}>
            <TouchableOpacity 
              style={styles.formButton}
              onPress={() => this.onFormSubmit()}
            >
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{ this.state.formSubmitting ? 'MENGIRIM' : 'GANTI PASSWORD' }</Text>
            </TouchableOpacity>
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
    backgroundColor: colors.primary,
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
  },
  formButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 2,
    elevation: 2
  },
  textInput: {
    color: "#999999",
    borderColor: "#FFFFFF",
    fontSize: 16
  },
})