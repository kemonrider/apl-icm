export const numberToCurrency = (numberToConvert) => {
  let returnVal = (numberToConvert).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return numberToConvert;
}