import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class ReportListScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: categories
    }
  }
  
  renderCategories = () => {
    let renderedCategories = [];
    for(let i = 0; i < this.state.categories.length; i++){
      renderedCategories.push(
        <View 
          key={this.state.categories[i].id}
          style={styles.categoryWrapper}
        >
          <View style={styles.categoryIconWrapper}>
            <Image style={styles.categoryIcon} source={this.state.categories[i].icon} />
          </View>
          <View style={styles.categoryTitleWrapper}>
            <Text style={styles.categoryTitle}>{this.state.categories[i].title}</Text>
          </View>
        </View>
      )
    }
    return renderedCategories;
  }
  
  render(){
    return(
      <View style={styles.categoryListWrapper}>
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

const categories = [
  {
    id: 1,
    title: 'Aduan Kebersihan',
    icon: require('../assets/images/report/report-cleaning.png')
  },
  {
    id: 2,
    title: 'Aduan Layanan Listrik',
    icon: require('../assets/images/report/report-electricity.png')
  },
  {
    id: 3,
    title: 'Aduan Layanan Air',
    icon: require('../assets/images/report/report-water.png')
  },
  {
    id: 4,
    title: 'Aduan Maintenance',
    icon: require('../assets/images/report/report-maintenance.png')
  },
  {
    id: 5,
    title: 'Lain-lain',
    icon: require('../assets/images/report/report-other.png')
  }
]
