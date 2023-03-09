export const fetchCurrencies = async () => {
  const curEndPoint = 'https://economia.awesomeapi.com.br/json/all';
  const results = await fetch(curEndPoint);
  const data = await results.json();

  delete data.USDT;
  // console.log(data);
  return data;
};
