import React from 'react';
import { Text, TextInput, View, ScrollView, StyleSheet } from 'react-native';

import { colors } from '../lib/styles';

export default class ReportDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
      <View style={styles.screenWrapper}>
        <View style={styles.screenBody}>
          <ScrollView>
            <View style={styles.formWrapper}>
              <TextInput placeholder="Judul Aduan" />
            </View>
            <View style={styles.formWrapper}>
              <TextInput placeholder="Deskripsi" />
            </View>
          </ScrollView>
        </View>
        <View style={styles.screenFooter}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>KIRIM ADUAN</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenWrapper: {},
  screenBody: {
    padding: 15
  },
  screenFooter: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF'
  },
  formWrapper: {},
  formLabel: {},
  formInput: {},
  modalWrapper: {},
  modalBody: {},
  modalHeader: {},
  modalContent: {},
  modalFooter: {},
  button: {
    backgroundColor: colors.purple,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF'
  }
})
