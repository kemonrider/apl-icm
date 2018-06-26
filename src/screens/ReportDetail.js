import React from 'react';
import { Text, TextInput, View, ScrollView, StyleSheet } from 'react-native';

import { colors } from '../lib/styles';

export default class ReportDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShown: true
    }
  }
  
  renderModal(status) {
    if(status){
      return (
        <View style={styles.modalWrapper}>
          <View style={styles.modalDialog}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Aduan Terkirim</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalContentText}>Terimakasih telah mengirim aduan dengan nomor XXX-XXX. Tim kami akan segera menindaklanjutinya. Silakan cek status aduan Anda di menu Riwayat Aduan.</Text>
            </View>
            <View style={styles.modalFooter}>
              <Text style={styles.modalFooterText}>TUTUP</Text>
            </View>
          </View>
        </View>
      )
    }
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
        {this.renderModal(true)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenWrapper: {
    height: '100%'
  },
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
  modalWrapper: {
    elevation: 2,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  modalDialog: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '90%',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    padding: 20
  },
  modalHeader: {},
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  modalContent: {},
  modalContentText: {
    fontSize: 16,
    lineHeight: 20
  },
  modalFooter: {
    marginTop: 20,
    alignItems: 'flex-end'
  },
  modalFooterText: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: '700'
  },
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
