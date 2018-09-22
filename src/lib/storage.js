import { AsyncStorage} from 'react-native';
import { Alert } from 'react-native'

const setItem = async (itemKey, itemValue) => {
  try {
    itemValue = JSON.stringify(itemValue);
    await AsyncStorage.setItem(itemKey, itemValue);
  } catch (error) {
    Alert.alert('Failed to set item', JSON.stringify(error))
  }
}

// const getItem = async (itemKey) => {
//   try {
//     AsyncStorage.getItem(itemKey, (error, returnValue) => {
//       if(error) {
//         return error
//       }
//       if(returnValue) {
//         returnValue = JSON.parse(returnValue);
//         console.log('Get item success');
//         console.log(returnValue);
//         return returnValue
//       }
//     })
//   } catch (error) {
//     console.log(error);
//   } 
// }

export const appStorage = {
  setItem: setItem,
  getItem: AsyncStorage.getItem,
  clearItem: AsyncStorage.clear,
  removeItem: AsyncStorage.removeItem
}

export const storageConst = {
  user: 'user'
}