import React from 'react';
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../lib/styles';

export default class RegisterScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <ScrollView style={styles.pageWrapper}>
        <View style={styles.pageTitleWrapper}>
          <Text style={styles.pageTitle}>Registrasi</Text>
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.textInputWrapper}>
            <TextInput placeholder="Email" />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput placeholder="Nomor Ponsel" />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput placeholder="Unit Bangunan" />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput placeholder="Password" />
          </View>
          <View style={styles.textInputWrapper}>
            <TouchableOpacity style={styles.formButton}>
              <Text style={{ color: colors.orange, fontWeight: 'bold' }}>DAFTAR</Text>
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