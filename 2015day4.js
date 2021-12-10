const md5 = require('md5');

const isFirstFiveZeros = (string) => {
  const hash = md5(string);
  const hashArr = hash.split('');
  const firstFive = hashArr.slice(0,5);
  // return (md5(string)[0-5].every(value => value === '0'))
  return firstFive.every(value => value === '0');
};

// console.log(md5('abcdef609043'))
// console.log(isFirstFiveZeros('abcdef609043'))

const secretKey = 'bgvyzdsv';

const findNumber = (input) => {
  let number = 1;
  while (!isFirstFiveZeros(input + number)) {
    number++;
  }
  return number;
};

console.log(findNumber(secretKey));
