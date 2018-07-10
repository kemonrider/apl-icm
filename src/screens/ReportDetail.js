import React from 'react';
import { ActivityIndicator, Alert, Text, TextInput, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import FormLabel from '../components/Form/Label';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

var ImagePicker = require('react-native-image-picker');

export default class ReportDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('reportTitle'),
    };
  };
  
  constructor(props) {
    super(props);

    this.state = {
      reportId: null,
      repotTitle: null,
      formTitle: '',
      formContent: '',
      formImages: [],
      formReportUploadMessage: null,
      formReportId: null,
      pageLoading: false,
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
      mediaType: 'photo',
      takePhotoButtonTitle: 'Ambil gambar...',
      chooseFromLibraryButtonTitle: 'Pilih dari gallery...'
    };
    
    ImagePicker.showImagePicker(options, (response)  => {
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
      }
    });
  }
  
  onFormSubmit = async () => {
    if(!this.state.pageLoading){
      try {
        console.log('Submitting form');
        this.setState({
          pageLoading: true
        });

        const report = {
          cat_id: this.state.reportId,
          judul: this.state.formTitle,
          aduan: this.state.formContent
        }

        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;

        fetch(`${env.ENDPOINT}/api/ticket/create`, {
          method: 'POST',
          headers: new Headers({
            'Accept-Encoding': 'application/json',
            'Content-Type': 'application/json',
            'Token': userToken
          }),
          body: JSON.stringify(report)
        })
          .then(response => {
            response.json().then(responseBody => {
              if(response.status === 401){
                appStorage.clearItem();
                this.props.navigation.navigate('NotAuthorized');
              }
              if(response.status === 200){
                console.log('Success submitting report');
                console.log(responseBody);
                this.setState({
                  formTitle: '',
                  formContent: '',
                  formReportUploadMessage: responseBody.message,
                  formReportId: responseBody.data.id
                });
                this.submitImages(0);
              } else {
                console.log(responseBody.message);
                Alert.alert('Gagal Mengirim Laporan', responseBody.message)
              }
            })
          })
      } catch (error) {
        console.log(error);
        Alert.alert('Gagal Mengirim Laporan', JSON.stringify(error));
      }
    }
  }

  submitImages = async (imageNumber) => {
    try {
      if(this.state.formImages.length && (imageNumber < this.state.formImages.length )){
        console.log('Submitting image');

        const attachImage = {
          id: this.state.formReportId,
          file: `data:image/jpeg;base64,${this.state.formImages[0].data}`
        }
        
        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;
        
        fetch(`${env.ENDPOINT}/api/ticket/attach`, {
          method: 'POST',
          headers: new Headers({
            'Accept-Encoding': 'application/json',
            'Content-Type': 'application/json',
            'Token': userToken
          }),
          body: JSON.stringify(attachImage)
        })
          .then(response => {
            console.log('Success Submitting Image');
            this.submitImages((imageNumber + 1));
          })
        
      } else {
        this.onSubmitDone();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Mengirim Laporan', JSON.stringify(error));
    }
  }

  onSubmitDone = () => {
    console.log('Finished submitting form');
    Alert.alert(
      'Laporan Terkirim',
      this.state.formReportUploadMessage,
      [
        { text: 'OK', onPress: () => this.props.navigation.navigate('ReportList') }
      ]
    );
  }
  
  renderSelectedImage = () => {
    if(this.state.formImages.length){
      let renderedImages = [];
      for(let i = 0; i < this.state.formImages.length; i++){
        renderedImages.push(
          <Image
            key={i}
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
          <ActivityIndicator size="large" color={colors.primary} />
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
              <FormLabel textColor="#999999" text="Judul Aduan" />
              <TextInput 
                placeholder="Judul Aduan"
                onChangeText={(text) => this.setState({formTitle: text})}
              />
            </View>
            <View style={styles.formWrapper}>
              <FormLabel textColor="#999999" text="Deskripsi" />
              <TextInput 
                placeholder="Deskripsi"
                maxLength={500}
                multiline={true}
                onChangeText={(text) => this.setState({formContent: text})}
              />
            </View>
            <View style={styles.formWrapper}>
              <FormLabel textColor="#999999" text="Foto" />
              <View 
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap'
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
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF'
  }
})
