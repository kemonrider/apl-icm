import { AsyncStorage} from 'react-native';

const setItem = async (itemKey, itemValue) => {
  try {
    console.log('Saving item');
    console.log(itemValue);
    itemValue = JSON.stringify(itemValue);
    await AsyncStorage.setItem(itemKey, itemValue);
  } catch (error) {
    console.log(error);
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

const getItem = AsyncStorage.getItem;

export const appStorage = {
  setItem: setItem,
  getItem: getItem
}

export const storageConst = {
  user: 'user'
}