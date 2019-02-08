import { env } from '../lib/environment';
import { appStorage, storageConst } from '../lib/storage';

// get building list
export function getBuildingList(){
  return new Promise((resolve, reject) => {
    fetch(`${env.ENDPOINT}/api/building/list`, {
      method: 'GET',
      headers: new Headers({
        'Accept-Encoding': 'application/json',
        'Content-Type': 'application/json',
      })
    })
      .then(response => {
        response.json().then(responseBody => {
          if(response.status === 200){
            resolve(responseBody);
          } else {
            throw responseBody;
          }
        })
      })
      .catch(error => {
        reject(error);
      })
  });
}

// change password
export function changePassword(old_password, new_password1, new_password2){
  return new Promise(async (resolve, reject) => {
    try {
      let userToken = await appStorage.getItem(storageConst.user);
      userToken = JSON.parse(userToken).token;
      
      fetch(`${env.ENDPOINT}/api/auth/change_password`, {
        method: 'POST',
        headers: new Headers({
          'Accept-Encoding': 'application/json',
          'Content-Type': 'application/json',
          'Token': userToken
        }),
        body: JSON.stringify({
          old_password: old_password,
          new_password1: new_password1,
          new_password2: new_password2
        })
      })
      .then(response => {
        response.json().then(responseBody => {
          if(response.status === 200){
            resolve(responseBody);
          } else {
            reject(responseBody);
          }
        })
      })
      .catch(error => {
        reject(error);
      })
    } catch(err) {
      reject(err);
    }
  });
}
