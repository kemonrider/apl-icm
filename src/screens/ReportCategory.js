import React from 'react';
import { ActivityIndicator, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class ReportCategoryScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageLoading: false,
      categories: null
    }
  }
  
  componentDidMount(){
    this.getReportCategory();
  }
  
  getReportCategory = async () => {
    if(!this.state.pageLoading){
      try {
        this.setState({ pageLoading: true });
        
        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;
        
        fetch(`${env.ENDPOINT}/api/ticket/get_category`, {
          method: 'GET',
          headers: new Headers({
            'Accept-Encoding': 'application/json',
            'Content-Type': 'application/json',
            'Token': userToken
          })
        })
          .then(response => {
            this.setState({ pageLoading: false });
            response.json().then(responseBody => {
              if(response.status === 401){
                appStorage.clearItem();
                this.props.navigation.navigate('NotAuthorized');
              }
              if(response.status === 200){
                this.setState({ categories: responseBody.data })
              } else {
                Alert.alert('Gagal Mengambil Kategori Layanan', responseBody.message)
              }
            })
          })
      } catch (error) {
        console.log(error)
        Alert.alert('Gagal Mengambil Kategori Layanan', JSON.stringify(error))
      }
    }
  }

  renderReportImage = (reportId) => {
    switch(parseInt(reportId)){
      case 1:
        return <Image style={styles.categoryIcon} source={require('../assets/images/report/report-cleaning.png')} />
        break;
      case 2:
        return <Image style={styles.categoryIcon} source={require('../assets/images/report/report-electricity.png')} />
        break;
      case 3 :
        return <Image style={styles.categoryIcon} source={require('../assets/images/report/report-water.png')} />
        break;
      case 4:
        return <Image style={styles.categoryIcon} source={require('../assets/images/report/report-maintenance.png')} />
        break;
      case 5:
        return <Image style={styles.categoryIcon} source={require('../assets/images/report/report-other.png')} />
        break;
    }
  }
  
  renderCategories = () => {
    if(!this.state.pageLoading && this.state.categories){
      let renderedCategories = [];
      this.state.categories.map(category => {
        renderedCategories.push(
          <TouchableOpacity
            key={category.id}
            onPress={() => {this.props.navigation.navigate('ReportCreate', { reportId: category.id, reportTitle: category.name })}}
          >
            <View
              style={styles.categoryWrapper}
            >
              <View style={styles.categoryIconWrapper}>
                {this.renderReportImage(category.id)}
              </View>
              <View style={styles.categoryTitleWrapper}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })
      return renderedCategories;
    } else {
      return false
    }
  }
  
  renderActivityIndicator(){
    if(this.state.pageLoading){
      return (
        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )
    }
  }
  
  render(){
    return(
      <View style={styles.categoryListWrapper}>
        {this.renderActivityIndicator()}
        {this.renderCategories()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  categoryListWrapper: {
  },
  categoryWrapper: {
    flexDirection: 'row',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  categoryIconWrapper: {
    width: 70,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryIcon: {
    padding: 10
  },
  categoryTitleWrapper: {
    alignItems: 'center',
    paddingVertical: 10
  },
  categoryTitle: {},
})
