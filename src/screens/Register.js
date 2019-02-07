import React from 'react';
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';

import FormLabel from '../components/Form/Label';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';

import { getBuildingList } from '../requests';

export default class RegisterScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      phone: '',
      unit: '',
      site: '',
      formValid: false,
      formError: false,
      formErrorTitle: 'Gagal Registrasi',
      formErrorMessage: '',
      formSubmitting: false,
      formSuccessTitle: 'Pendaftaran Berhasil',
      formSuccessMessage: '',
      buildingList: []
    }
  }

  componentDidMount(){
    this.setupBuildingList();
  }

  setupBuildingList = async () => {
    try {
      const buildingList = await getBuildingList();
      this.setState({
        buildingList: buildingList.data
      });
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  }
  
  onFormSubmit = () => {
    if(!this.state.formSubmitting){
      this.setState({
        formSubmitting: true
      })
    }

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      unit: this.state.unit,
      building_id: this.state.site,
    }

    console.log('Registering user');
    console.log(newUser);

    fetch(`${env.ENDPOINT}/api/auth/register`, {
      method: 'POST',
      headers: new Headers({
        'Accept-Encoding': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(newUser)
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
    const generateSiteList = () => {
      let optionList = [];
  
      this.state.buildingList.forEach(building => {
        optionList.push(<Picker.Item label={building.name} value={building.id} key={building.code} />);
      });
      
      return (
        <Picker
          selectedValue={this.state.site}
          style={{ color: '#ffffff', width: '100%' }}
          onValueChange={(itemValue, itemIndex) => this.setState({site: itemValue})}
        >
          {optionList}
        </Picker>
      )
    }
    
    return(
      <ScrollView style={styles.pageWrapper}>
        <View style={styles.pageTitleWrapper}>
          <Text style={styles.pageTitle}>Registrasi</Text>
        </View>
        <View style={styles.formWrapper}>
          <FormLabel text="Nama" />
          <View style={styles.textInputWrapper}>
            <TextInput 
              // placeholder="Nama"
              style={styles.textInput}
              onChangeText={(name) => this.setState({name: name})}
              value={this.state.name}
            />
          </View>
          <FormLabel text="Email" />
          <View style={styles.textInputWrapper}>
            <TextInput 
              // placeholder="Email"
              style={styles.textInput}
              onChangeText={(email) => this.setState({email: email})}
              value={this.state.email}
            />
          </View>
          <FormLabel text="Nomor Ponsel" />
          <View style={styles.textInputWrapper}>
            <TextInput 
              // placeholder="Nomor Ponsel"
              style={styles.textInput}
              onChangeText={(phone) => this.setState({phone: phone})}
              value={this.state.phone}
            />
          </View>
          <FormLabel text="Site" />
          <View style={styles.textInputWrapper}>
            {
              this.state.buildingList.length > 0 &&
              generateSiteList()
            }
            {
              !this.state.buildingList.length &&
              <TextInput 
                style={styles.textInput}
                onChangeText={(unit) => this.setState({unit: unit})}
                value="Loading Site list"
              />
            }
          </View>
          <FormLabel text="Unit Bangunan" />
          <View style={styles.textInputWrapper}>
            <TextInput 
              style={styles.textInput}
              onChangeText={(unit) => this.setState({unit: unit})}
            />
          </View>
          <FormLabel text="Password" />
          <View style={styles.textInputWrapper}>
            <TextInput 
              // placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true} 
              onChangeText={(password) => this.setState({password: password})}
              value={this.state.password}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TouchableOpacity
              style={styles.formButton}
              onPress={() => this.onFormSubmit()}
            >
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{ this.state.formSubmitting ? 'MENGIRIM' : 'DAFTAR' }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: colors.primary,
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
  textInput: {
    color: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    fontSize: 16
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