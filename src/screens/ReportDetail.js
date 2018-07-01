import React from 'react';
import { ActivityIndicator, Alert, Text, TextInput, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import FormLabel from '../components/Form/Label';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

var ImagePicker = require('react-native-image-picker');

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

  formImages = [];
  
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      reportId: navigation.getParam('reportId'),
      reportTitle: navigation.getParam('reportTitle')
    });
  }

  selectImage = () => {
    var options = {
      title: 'Pilih Gambar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo'
    };
    
    ImagePicker.launchImageLibrary(options, (response)  => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.formImages.push(response);
        this.setState({
          formImages: this.formImages
        })
        console.log(this.state);
      }
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
  
  renderSelectedImage = () => {
    if(this.state.formImages.length){
      let renderedImages = [];
      for(let i = 0; i < this.state.formImages.length; i++){
        console.log(`data:image/jpeg;base64,${this.state.formImages[0].data}`);
        renderedImages.push(
          <Image
            key={i}
            // source={{ uri: `data:image/jpeg;base64,${this.state.formImages[i].data}`}}
            source={{ uri: this.state.formImages[i].uri }}
            style={styles.formImages}
          />
        )
      }
      return renderedImages
    }
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
              <View 
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  // alignItems: 'center',
                  // alignContent: 'flex-start',
                  // justifyContent: 'flex-start'
                }}
              >
                {this.renderSelectedImage()}
                <TouchableOpacity
                  onPress={() => this.selectImage()}
                  style={styles.formImages}
                >
                  <Image source={require('../assets/images/add-image.png')} />
                </TouchableOpacity>
              </View>
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
  formImages: {
    flexGrow: 0,
    width: '25%'
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
