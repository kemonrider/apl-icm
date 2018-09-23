import React from 'react';
import { ActivityIndicator, View, ScrollView, StyleSheet, Image, Text, Alert } from 'react-native';

import { colors } from '../lib/styles';
import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

export default class BillingDetailScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageLoading: false,
      billingDetail: null,
      billingType: null,
      billingId: null
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      billingType: navigation.getParam('billingType'),
      billingId: navigation.getParam('billingId')
    });
    this.getBillingDetail(navigation.getParam('billingId'), navigation.getParam('billingType'));
  }

  getBillingDetail = async (billingId, billingType) => {
    let endpoint = '';
    if(billingType.toLowerCase() == 'maintenance'){
      endpoint = `${env.ENDPOINT}/api/bill/get_maintenance_by_id/${billingId}`
    } else {
      endpoint = `${env.ENDPOINT}/api/bill/get_power_water_bill_by_id/${billingId}`
    }

    if(!this.state.pageLoading){
      try {
        this.setState({
          pageLoading: true,
          billingDetail: null
        });

        let userToken = await appStorage.getItem(storageConst.user);
        userToken = JSON.parse(userToken).token;

        fetch(endpoint, {
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
                  billingDetail: responseBody.data[0],
                  pageLoading: false
                })
              } else {
                console.log(responseBody.message);
                Alert.alert('Gagal Mengambil Detail Tagihan', responseBody.message)
              }
            })
          })
      } catch (error) {
        console.log(error)
        Alert.alert('Gagal Mengambil Detail Tagihan', JSON.stringify(error))
      }
    }
  }
  
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  renderBillingBody = (billingType) => {
    if( billingType.toLowerCase() == 'maintenance' ){
      return (
        <View style={styles.billingBody}>
          <View style={styles.invoiceHeader}>
            <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 10 }}>Invoice</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, fontWeight: '600', width: 50 }}>Unit</Text><Text style={{ fontSize: 10 }}>{this.state.billingDetail.unit}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, fontWeight: '600', width: 50 }}>Nomer</Text><Text style={{ fontSize: 10 }}>{this.state.billingId}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, fontWeight: '600', width: 50 }}>Tanggal</Text><Text style={{ fontSize: 10 }}>{this.state.billingDetail.bill_date}</Text>
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
                <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>{this.state.billingDetail.bill_maintenance_note}</Text></View>
                <View style={styles.tableCellCenter}><Text style={styles.tableCellText}></Text></View>
                <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp {this.numberWithCommas(this.state.billingDetail.bill_maintenance_total)}</Text></View>
              </View>
            </View>
            <View style={styles.tableFooter}>
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end' }}>
                <View style={{ width: '40%'}}></View>
                <View style={{ width: '30%', paddingLeft: 10, paddingVertical: 5, backgroundColor: 'rgba(69,37,131, 0.06)' }}><Text style={styles.tableFooterText}>Total</Text></View>
                <View style={{ width: '30%', paddingVertical: 5, backgroundColor: 'rgba(69,37,131, 0.06)', alignItems: 'flex-end', paddingRight: 30 }}><Text style={styles.tableFooterText}>Rp. {this.numberWithCommas(this.state.billingDetail.total)}</Text></View>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.billingBody}>
          <View style={styles.invoiceHeader}>
            <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 10 }}>Invoice</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, fontWeight: '600', width: 50 }}>Unit</Text><Text style={{ fontSize: 10 }}>{this.state.billingDetail.unit}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, fontWeight: '600', width: 50 }}>Nomer</Text><Text style={{ fontSize: 10 }}>{this.state.billingId}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, fontWeight: '600', width: 50 }}>Tanggal</Text><Text style={{ fontSize: 10 }}>{this.state.billingDetail.bill_date}</Text>
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
                <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>{this.state.billingDetail.bill_power_note}</Text></View>
                <View style={styles.tableCellCenter}><Text style={styles.tableCellText}>start: {this.state.billingDetail.power_meter_start} - end: {this.state.billingDetail.power_meter_end}</Text></View>
                <View style={styles.tableCellRight}><Text style={styles.tableCellText}></Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>PJU</Text></View>
                <View style={styles.tableCellCenter}><Text style={styles.tableCellText}></Text></View>
                <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp {this.numberWithCommas(this.state.billingDetail.bill_public_light)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>Biaya Tambahan</Text></View>
                <View style={styles.tableCellCenter}><Text style={styles.tableCellText}></Text></View>
                <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp {this.numberWithCommas(this.state.billingDetail.bill_power_extra)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>SUBTOTAL</Text></View>
                <View style={styles.tableCellCenter}><Text style={styles.tableCellText}></Text></View>
                <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp {this.numberWithCommas(this.state.billingDetail.bill_power_total)}</Text></View>
              </View>
              <View style={{ width: '100%', marginBottom: 15 }}></View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>{this.state.billingDetail.bill_power_note}</Text></View>
                <View style={styles.tableCellCenter}><Text style={styles.tableCellText}>start: {this.state.billingDetail.water_meter_start} - end: {this.state.billingDetail.water_meter_end}</Text></View>
                <View style={styles.tableCellRight}><Text style={styles.tableCellText}></Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>Biaya Tambahan</Text></View>
                <View style={styles.tableCellCenter}><Text style={styles.tableCellText}></Text></View>
                <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp {this.numberWithCommas(this.state.billingDetail.bill_power_extra)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellLeft}><Text style={styles.tableCellText}>SUBTOTAL</Text></View>
                <View style={styles.tableCellCenter}><Text style={styles.tableCellText}></Text></View>
                <View style={styles.tableCellRight}><Text style={styles.tableCellText}>Rp {this.numberWithCommas(this.state.billingDetail.bill_water_total)}</Text></View>
              </View>
            </View>
            <View style={styles.tableFooter}>
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end' }}>
                <View style={{ width: '40%'}}></View>
                <View style={{ width: '30%', paddingLeft: 10, paddingVertical: 5, backgroundColor: 'rgba(69,37,131, 0.06)' }}><Text style={styles.tableFooterText}>Total</Text></View>
                <View style={{ width: '30%', paddingVertical: 5, backgroundColor: 'rgba(69,37,131, 0.06)', alignItems: 'flex-end', paddingRight: 30 }}><Text style={styles.tableFooterText}>Rp. {this.numberWithCommas(this.state.billingDetail.total)}</Text></View>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }
  
  renderBillingDetail = () => {
    if(this.state.billingDetail){      
      return (
        <ScrollView style={styles.pageWrapper}>
          <View style={styles.pageHeader}>
            <Text style={{ color: '#FFFFFF', fontSize: 10 }}>Jumlah Tagihan</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: '600', marginBottom: 5, marginTop: 5 }}>Rp {this.numberWithCommas(this.state.billingDetail.total)}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 10 }}>{this.state.billingDetail.bill_date}</Text>
          </View>
          <View style={styles.pageBody}>

            <View style={styles.billingWrapper}>
              <View style={styles.billingHeader}>
                <View style={styles.billingIcon}>
                  {(
                    () => {
                      if(this.state.billingType.toLowerCase() == 'maintenance'){
                        return <Image source={require('../assets/images/billing/maintenance.png')} />
                      } else {
                        return <Image source={require('../assets/images/billing/electricity.png')} />
                      }
                    }
                  )()}
                </View>
                <View style={styles.billingInfo}>
                  <View style={styles.billingTitleWrapper}>
                    <Text style={styles.billingTitle}>
                      {(
                        () => {
                          if(this.state.billingType.toLowerCase() == 'maintenance') {
                            return 'Tagihan Maintenance'
                          } else {
                            return 'Tagihan Listrik dan Air'
                          }
                        }
                      )()}
                    </Text>
                  </View>
                  <View style={styles.billingStatusWrapper}>
                    <Text style={styles.billingStatus}>
                      <Text>{(
                        () => {
                          if(
                            parseInt(this.state.billingDetail.power_water_bill_paid) > 0 ||
                            parseInt(this.state.billingDetail.maintenance_bill_paid) > 0
                          ){
                            return <Text style={{color: colors.secondary}}>SUDAH DIBAYAR</Text>
                          } else {
                            return <Text style={{color: '#D51A1A'}}>BELUM DIBAYAR</Text>
                          }
                        }
                      )()}
                      </Text> - <Text style={styles.billingDetail}>Rp {this.numberWithCommas(this.state.billingDetail.total)}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.billingArrow}>
                  {/* <Icon name="chevron-right" size={24} color="#999999" /> */}
                </View>
              </View>
              {this.renderBillingBody(this.state.billingType)}
            </View>

          </View>
        </ScrollView>
      )
    } else {
      return false;
    }
  }
  
  render(){
    if(this.state.pageLoading && !this.state.billingDetail){
      return (
        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )
    } else {
      return this.renderBillingDetail()
    }
  }
}

const styles = StyleSheet.create({
  pageWrapper: {},
  pageHeader: {
    backgroundColor: colors.primary,
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
    color: colors.primary,
    fontWeight: '600',
    fontSize: 10
  },
})