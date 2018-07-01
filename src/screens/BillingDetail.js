import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../lib/styles';

export default class BillingDetailScreen extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.getBillingDetail(navigation.getParam('billingId'));
  }

  getBillingDetail = async (billingId) => {
    console.log(billingId);
  }
  
  render(){
    return(
      <ScrollView style={styles.pageWrapper}>
        <View style={styles.pageHeader}>
          <Text style={{ color: '#FFFFFF', fontSize: 10 }}>Jumlah Tagihan Belum Dibayar</Text>
          <Text style={{ color: colors.orange, fontSize: 28, fontWeight: '600', marginBottom: 5, marginTop: 5 }}>Rp 2.650.000</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 10 }}>30 Juni 2018</Text>
        </View>
        <View style={styles.pageBody}>

          <View style={styles.billingWrapper}>
            <View style={styles.billingHeader}>
              <View style={styles.billingIcon}>
                <Image source={require('../assets/images/billing/electricity.png')} />
              </View>
              <View style={styles.billingInfo}>
                <View style={styles.billingTitleWrapper}>
                  <Text style={styles.billingTitle}>Tagihan Listrik dan Air</Text>
                </View>
                <View style={styles.billingStatusWrapper}>
                  <Text style={styles.billingStatus}>
                    <Text style={{ color: '#D51A1A' }}>BELUM DIBAYAR</Text> - <Text style={styles.billingDetail}>Rp 123.000.000</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.billingArrow}>
                <Icon name="chevron-right" size={24} color="#999999" />
              </View>
            </View>
            <View style={styles.billingBody}>
              <View style={styles.invoiceHeader}>
                <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 10 }}>Invoice</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 10, fontWeight: '600', width: 50 }}>Nomer</Text><Text style={{ fontSize: 10 }}>123456123asd</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 10, fontWeight: '600', width: 50 }}>Tanggal</Text><Text style={{ fontSize: 10 }}>30 Juni 2018</Text>
                </View>
              </View>
              <View style={styles.tableWrapper}>
                <View style={styles.tableHeader}>
                  <View style={styles.tableCellLeft}>
                    <Text style={{ fontWeight: '700', fontSize: 10 }}>Jenis Tagihan</Text>
                  </View>
                  <View style={styles.tableCellCenter}>
                    <Text style={{ fontWeight: '700', fontSize: 10 }}>Keterangan</Text>
                  </View>
                  <View style={styles.tableCellRight}>
                    <Text style={{ fontWeight: '700', fontSize: 10 }}>Jumlah</Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>Daya Listrik</Text></View>
                    <View style={styles.tableCellCenter}><Text style={styles.tableCellText}>122 kwh x Rp 1,400</Text></View>
                    <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp 123.456.000</Text></View>
                  </View>
                  <View style={styles.tableRowEven}>
                    <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>Daya Listrik</Text></View>
                    <View style={styles.tableCellCenter}><Text style={styles.tableCellText}>122 kwh x Rp 1,400</Text></View>
                    <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp 123.456.000</Text></View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>Daya Listrik</Text></View>
                    <View style={styles.tableCellCenter}><Text style={styles.tableCellText}>122 kwh x Rp 1,400</Text></View>
                    <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp 123.456.000</Text></View>
                  </View>
                  <View style={styles.tableRowEven}>
                    <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>Daya Listrik</Text></View>
                    <View style={styles.tableCellCenter}><Text style={styles.tableCellText}>122 kwh x Rp 1,400</Text></View>
                    <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp 123.456.000</Text></View>
                  </View>
                </View>
                <View style={styles.tableFooter}>
                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ width: '40%'}}></View>
                    <View style={{ width: '30%', paddingLeft: 10, paddingVertical: 5, backgroundColor: 'rgba(69,37,131, 0.06)' }}><Text style={styles.tableFooterText}>Total</Text></View>
                    <View style={{ width: '30%', paddingVertical: 5, backgroundColor: 'rgba(69,37,131, 0.06)' }}><Text style={styles.tableFooterText}>Rp. 123.456.000</Text></View>
                  </View>
                </View>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pageWrapper: {},
  pageHeader: {
    backgroundColor: colors.purple,
    padding: 30,
    alignItems: 'center'
  },
  pageBody: {
    paddingTop: 15,
    paddingBottom: 15
  },
  billingWrapper: {
    marginBottom: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  billingHeader: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    padding: 15,
    flexDirection: 'row',
    // elevation: 1
  },
  billingBody: {},
  billingIcon: {
    width: 50,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  billingInfo: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  billingTitleWrapper: {},
  billingTitle: {
    fontSize: 16
  },
  billingStatusWrapper: {},
  billingStatus: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  billingDetailWrapper: {},
  billingDetail: {
    fontSize: 10
  },
  billingArrow: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // invoice
  invoiceHeader: {
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  // invoice table
  tableWrapper: {},
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 5
  },
  tableBody: {},
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  tableRowEven: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: 'rgba(69,37,131, 0.06)'
  },
  tableCellLeft: {
    width: '33.333%',
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  tableCellCenter: {
    width: '33.333%',
    alignItems: 'center'
  },
  tableCellRight: {
    width: '33.333%',
    alignItems: 'flex-end',
    paddingRight: 30,
  },
  tableCellText: {
    fontSize: 10,
    fontWeight: '300'
  },
  tableFooter: {
    marginTop: 20
  },
  tableFooterText: {
    color: colors.orange,
    fontWeight: '600',
    fontSize: 10
  },
})

// Sample data for billing
// const billing = [
//   {
//     id: 1,
//     type: 'electricity',
//     title: 'Tagihan Listrik dan Air',
//     status: 'BELUM DIBAYAR',
//     statusColor: 'D51A1A',
//     amount: '300000',
//     invoiceNumber: 'QWERTYUIOP12345',
//     invoiceDate: '30 June 2018',
//    .. TODO : Continue add sample data
//   }
// ]