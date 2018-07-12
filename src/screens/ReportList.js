import React from 'react';
import { ActivityIndicator, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class ReportListScreen extends React.Component {
  render(){
    return ( <View><Text>This is report list screen</Text></View> )
  }
}