import React from 'react';
import { ActivityIndicator, Alert, Text, TextInput, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import FormLabel from '../components/Form/Label';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class ReportCreateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('reportTitle'),
    };
  };
  
  constructor(props) {
    super(props);

    this.state = {
      reportId: null,
      reportDetailContent: null,
      pageLoading: false,
    }
  }

  formImages = [];
  
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      reportId: navigation.getParam('reportId')
    });
    this.getReportDetail(navigation.getParam('reportId'));
  }

  getReportDetail = async (reportId) => {
    if(!this.state.pageLoading){
      try {        
        this.setState({
          pageLoading: true,
          reportDetailContent: null
        });

        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;

        fetch(`${env.ENDPOINT}/api/ticket/detail/${reportId}`, {
          method: 'GET',
          headers: new Headers({
            'Accept-Encoding': 'application/json',
            'Content-Type': 'application/json',
            'Token': userToken
          })
        })
          .then(response => {
            response.json().then(responseBody => {
              if(response.status === 401){
                appStorage.clearItem();
                this.props.navigation.navigate('NotAuthorized');
              }
              if(response.status === 200){
                this.setState({
                  reportDetailContent: responseBody.data,
                  pageLoading: false
                })
              } else {
                console.log(responseBody.message);
                Alert.alert('Gagal Mengambil Detail Laporan', responseBody.message)
              }
            })
          })
      } catch (error) {
        console.log(error)
        Alert.alert('Gagal Mengambil Detail Laporan', JSON.stringify(error))
      }
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

  getReportStatus = (reportStatus) => {
    if(Number(reportStatus) === 1){
      return <Text style={{color: colors.secondary}}>SUDAH SELESAI</Text>
    } else {
      return <Text style={{color: '#D51A1A'}}>BELUM SELESAI</Text>
    }
  }

  getReportImages = (images) => {
    let renderedImages = [];
    console.log(images);
    images.map((image, index) => {
      console.log(index, image);
      renderedImages.push(
        <Image style={styles.formImages} key={index} source={{ uri: image }} />
      )
    })
    return renderedImages
  }
  
  renderReportDetail = () => {
    if(!this.state.pageLoading && this.state.reportDetailContent){
      return(
        <ScrollView style={styles.screenBody}>
          <ScrollView>
            <View style={styles.formWrapper}>
              <FormLabel textColor="#999999" text="Judul Aduan" />
              <Text>{this.state.reportDetailContent[0].title}</Text>
            </View>
            <View style={styles.formWrapper}>
              <FormLabel textColor="#999999" text="Deskripsi" />
              <Text>{this.state.reportDetailContent[0].complaints}</Text>
            </View>
            <View style={styles.formWrapper}>
              <FormLabel textColor="#999999" text="Nomor Tiket" />
              <Text>{this.state.reportDetailContent[0].ticket_number}</Text>
            </View>
            <View style={styles.formWrapper}>
              <FormLabel textColor="#999999" text="Status" />
              {this.getReportStatus(this.state.reportDetailContent[0].is_finish)}
            </View>
            {/* <View style={styles.formWrapper}>
              <FormLabel textColor="#999999" text="Foto" />
              <View 
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}
              >
                {this.getReportImages(this.state.reportDetailContent['image'])}
              </View>
            </View> */}
          </ScrollView>
        </ScrollView>
      )
    }
  }
  
  render(){
    return(
      <View style={styles.screenWrapper}>
        {this.renderActivityIndicator()}
        {this.renderReportDetail()}
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
  formWrapper: {
    marginBottom: 15
  },
  formLabel: {},
  formInput: {},
  formImages: {
    flexGrow: 0,
    width: '25%',
    height: 200
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF'
  },
})
