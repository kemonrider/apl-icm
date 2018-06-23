import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import { colors } from '../lib/styles';

export default class LoginPage extends React.Component {
  render() {
    return(
      <ScrollView style={styles.pageWrapper}>
        <View style={styles.formHeader}>
          <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>Mulai Sekarang</Text>
          <Image source={require('../assets/images/innercity-management-logo.png')} />
        </View>
        <View style={styles.formMain}>
          <View style={styles.textInputWrapper}>
            <TextInput placeholder="email" />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput placeholder="password" />
          </View>
          <View style={styles.formButtonWrapper}>
            <TouchableOpacity style={styles.formButton} onPress={() => this.props.navigation.navigate('NewsFeed')}>
              <Text style={{ color: colors.mainColor, fontWeight: 'bold' }}>MASUK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formNavigation}>
            <TouchableOpacity>
              <Text style={styles.formNavigationText}>Lupa Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formNavigation}>
            <TouchableOpacity>
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
    backgroundColor: colors.mainColor,
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
  formButtonWrapper: {},
  formButton: {
    backgroundColor: '#ffffff',
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
    color: '#ffffff'
  }
})