import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

import FormLabel from '../components/Form/Label';
import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      formValid: false,
      formError: false,
      formErrorTitle: 'Gagal Login',
      formErrorMessage: '',
      formSubmitting: false
    }
  }

  validateUsername = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    this.setState({ username: text });
    if(reg.test(text) === false) {
      this.setState({ formValid: false });
    } else {
      this.setState({ formValid: true });
    }
  }

  onFormSubmit = () => {
    if(!this.state.formSubmitting){
      this.setState({
        formError: false,
        formErrorMessage: '',
        formSubmitting: true
      });

      const userAuth = {
        email: this.state.username,
        password: this.state.password
      }
      
      console.log('Logging in with:');
      console.log(userAuth);
      
      fetch(`${env.ENDPOINT}/api/auth/login`, {
        method: 'POST',
        headers: new Headers({
          'Accept-Encoding': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(userAuth)
      })
        .then(response => {
          this.setState({
            formSubmitting: false
          })
          response.json().then(responseBody => {
            if(response.status === 200){
              this.handleLoginSuccess(responseBody);
            } else {
              this.handleLoginFailed(responseBody);
            }
          })
        })
        .catch(error => {
          console.log(error);
        })
        .done()
    }
  }
  
  handleLoginSuccess = async (data) => {
    await appStorage.setItem(storageConst.user, data.data);
    this.props.navigation.navigate('NewsFeed');
  }

  handleLoginFailed = (data) => {
    this.setState({ 
      formError: true,
      formErrorMessage: data.message
    })
    Alert.alert(this.state.formErrorTitle, this.state.formErrorMessage);
  }

  render() {
    return(
      <ScrollView style={styles.pageWrapper}>
        <View style={styles.formHeader}>
          <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>Mulai Sekarang</Text>
          <Image source={require('../assets/images/innercity-management-logo.png')} />
        </View>
        <View style={styles.formMain}>
          <FormLabel text="Username" />
          <View style={styles.textInputWrapper}>
            <TextInput 
              style={styles.textInput} 
              onChangeText={ (text) => this.validateUsername(text) }
              value={this.state.username}
            />
          </View>
          <FormLabel text="Password" />
          <View style={styles.textInputWrapper}>
            <TextInput 
              secureTextEntry={true} 
              style={styles.textInput} 
              onChangeText={ (text) => this.setState({password: text}) }
              value={this.state.password}
            />
          </View>
          <View style={styles.formButtonWrapper}>
            <TouchableOpacity 
              style={styles.formButton}
              onPress={() => this.onFormSubmit()}
            >
              <Text style={{ color: colors.orange, fontWeight: 'bold' }}>MASUK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formNavigation}>
            <TouchableOpacity>
              <Text style={styles.formNavigationText}>Lupa Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formNavigation}>
            <TouchableOpacity 
              onPress={() => {this.props.navigation.navigate('Register')}}
            >
              <Text style={styles.formNavigationText}>Belum punya Username?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: colors.orange,
    padding: 15,
  },
  formHeader: {
    width: '100%',
    height: 220,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formMain: {
    flex: 0.6
  },
  textInputWrapper: {
    marginBottom: 15
  },
  textInput: {
    color: "#FFFFFF",
    borderColor: "#FFFFFF",
    fontSize: 16
  },
  formButtonWrapper: {},
  formButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 2,
    elevation: 2
  },
  formNavigation: {
    marginTop: 15,
    alignItems: 'center'
  },
  formNavigationText: {
    color: '#FFFFFF'
  },
})