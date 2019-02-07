import { env } from '../lib/environment';

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
