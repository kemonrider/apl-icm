import React from 'react';
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import FormLabel from '../components/Form/Label';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      formValid: false,
      formError: false,
      formErrorTitle: 'Gagal Reset Password',
      formErrorMessage: '',
      formSubmitting: false,
      formSuccessTitle: 'Reset Password Berhasil',
      formSuccessMessage: ''
    }
  }
  
  onFormSubmit = () => {
    if(this.state.formSubmitting){
      return false
    }
    
    if(!this.state.formSubmitting){
      this.setState({
        formSubmitting: true
      })
    }

    const forgottenUser = {
      email: this.state.email,
    }

    console.log('Resetting user password');
    console.log(forgottenUser);

    fetch(`${env.ENDPOINT}/api/auth/forgot`, {
      method: 'POST',
      headers: new Headers({
        'Accept-Encoding': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(forgottenUser)
    })
      .then(response => {
        this.setState({
          formSubmitting: false
        })
        response.json().then(responseBody => {
          if(response.status === 200){
            this.handleRegisterSuccess(responseBody);
          } else {
            this.handleRegisterFail(responseBody);
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
      .done()
  }

  handleRegisterSuccess = (data) => {
    this.setState({
      formSuccessMessage: data.message
    })
    Alert.alert(
      this.state.formSuccessTitle,
      this.state.formSuccessMessage,
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Login')}
      ],
      { cancelable: false }
    );
  }

  handleRegisterFail = (data) => {
    this.setState({ 
      formError: true,
      formErrorMessage: data.message
    })
    Alert.alert(this.state.formErrorTitle, this.state.formErrorMessage);
  }
  
  render(){
    return(
      <ScrollView style={styles.pageWrapper}>
        <View style={styles.pageTitleWrapper}>
          <Text style={styles.pageTitle}>Lupa Password</Text>
        </View>
        <View style={styles.formWrapper}>
          <FormLabel text="Email" />
          <View style={styles.textInputWrapper}>
            <TextInput 
              placeholder="Email"
              onChangeText={(email) => this.setState({email: email})}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TouchableOpacity
              style={styles.formButton}
              onPress={() => this.onFormSubmit()}
            >
              <Text style={{ color: colors.orange, fontWeight: 'bold' }}>{ this.state.formSubmitting ? 'MENGIRIM' : 'RESET PASSWORD' }</Text>
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
  },
  pageTitleWrapper: {
    height: 100,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    color: '#FFFFFF'
  },
  formWrapper: {
    padding: 15
  },
  textInputWrapper: {
    marginBottom: 25
  },
  formButtonWrapper: {},
  formButton: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 2,
    elevation: 2
  },
})