import React from 'react';
import { ActivityIndicator, Alert, Text, TextInput, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import FormLabel from '../components/Form/Label';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class ReportDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reportId: null,
      repotTitle: null,
      formTitle: '',
      formContent: '',
      formImages: []
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      reportId: navigation.getParam('reportId'),
      reportTitle: navigation.getParam('reportTitle')
    });
  }

  submitForm = () => {

  }

  submitImages = () => {

  }

  onSubmitDone = () => {

  }
  
  onFormSubmit = () => {
    console.log(this.state)
    this.setState({
      pageLoading: true
    })
  }
  
  renderActivityIndicator(){
    if(this.state.pageLoading){
      return (
        <View style={{ height: '100%', width: '100%', zIndex: 2, backgroundColor: 'rgba(0,0,0,0.54)', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.purple} />
        </View>
      )
    }
  }
  
  render(){
    return(
      <View style={styles.screenWrapper}>
        {this.renderActivityIndicator()}
        <ScrollView style={styles.screenBody}>
          <ScrollView>
            <View style={styles.formWrapper}>
              <FormLabel text="Judul Aduan" />
              <TextInput 
                placeholder="Judul Aduan"
                onChangeText={(text) => this.setState({formTitle: text})}
              />
            </View>
            <View style={styles.formWrapper}>
              <FormLabel text="Deskripsi" />
              <TextInput 
                placeholder="Deskripsi"
                maxLength={500}
                multiline={true}
                onChangeText={(text) => this.setState({formContent: text})}
              />
            </View>
            <View style={styles.formWrapper}>
              <FormLabel text="Foto" />
            </View>
          </ScrollView>
        </ScrollView>
        <View style={styles.screenFooter}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onFormSubmit()}
          >
            <Text style={styles.buttonText}>KIRIM ADUAN</Text>
          </TouchableOpacity>
        </View>
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
