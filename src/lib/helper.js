export const numberToCurrency = (numberToConvert) => {
  let returnVal = (numberToConvert).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return numberToConvert;
}

export const getDueDate = (dateInput) => {
  const currentDate = dateInput.split(/[^a-zA-Z0-9]/g);
  return `15-${currentDate[1]}-${currentDate[2]}`;
}