const input = [1,1,1,2,1,5,1,1,2,1,4,1,4,1,1,1,1,1,1,4,1,1,1,1,4,1,1,5,1,3,1,2,1,1,1,2,1,1,1,4,1,1,3,1,5,1,1,1,1,3,5,5,2,1,1,1,2,1,1,1,1,1,1,1,1,5,4,1,1,1,1,1,3,1,1,2,4,4,1,1,1,1,1,1,3,1,1,1,1,5,1,3,1,5,1,2,1,1,5,1,1,1,5,3,3,1,4,1,3,1,3,1,1,1,1,3,1,4,1,1,1,1,1,2,1,1,1,4,2,1,1,5,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,5,1,1,1,1,3,1,1,1,1,1,3,4,1,2,1,3,2,1,1,2,1,1,1,1,4,1,1,1,1,4,1,1,1,1,1,2,1,1,4,1,1,1,5,3,2,2,1,1,3,1,5,1,5,1,1,1,1,1,5,1,4,1,2,1,1,1,1,2,1,3,1,1,1,1,1,1,2,1,1,1,3,1,4,3,1,4,1,3,2,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,2,1,5,1,1,1,1,2,1,1,1,3,5,1,1,1,1,5,1,1,2,1,2,4,2,2,1,1,1,5,2,1,1,5,1,1,1,1,5,1,1,1,2,1]

const passOneDay = (array) => {
  const newFish = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] === 0) {
      newFish.push(8)
      array[i] = 6
    } else {
      array [i] -= 1
    }
  }

  return array.concat(newFish)
}

const findPopulationAfter80Days = (array) => {
  for (let i = 0; i < 80; i++) {
    array = passOneDay(array)
  }
  return array.length
}

const findPopulationAfter256Days = (array) => {
  for (let i = 0; i < 200; i++) {
    array = passOneDay(array)
  }
  const length = array.length

  const storage = {};

  for (let i = 0; i < 99; i++) {
    storage[i] = array.splice(0, (length/100))
  }
  storage[99] = array

  let population = 0

  for (let portion in storage) {
    for (let i = 0; i < 56; i++) {
      storage[portion] = passOneDay(storage[portion])
    }
    population += storage[portion].length
    storage[portion] = []
  }

  return population
}

const findPopulationAfterLopOff = (array) => {
  for (let i = 0; i < 56; i++) {
    array = passOneDay(array)
  }
  return array.length
}

const generate256DayConversionKeys = () => {
  const keys = {}
  for (let i = 1; i < 6; i++) {
    keys[i] = findPopulationAfter256Days([5])
    console.log(`Key: ${i} => ${keys[i]}`)
  }
  return keys
}

const findFinalPopulationAfter256Days = (array) => {
  let population = 0
  let keys = generate256DayConversionKeys()
  for (const number of array) {
    population += keys[number]
  }
  return population
}

// console.log(`1 => ${findPopulationAfter256Days([1])}`);
// console.log(`2 => ${findPopulationAfter256Days([2])}`);
// console.log(`3 => ${findPopulationAfter256Days([3])}`);
// console.log(`4 => ${findPopulationAfter256Days([4])}`);
// console.log(`5 => ${findPopulationAfter256Days([5])}`);

const keys = {
1 : 6206821033,
2 : 5617089148,
3 : 5217223242,
4 : 4726100874,
5 : 4368232009
}

let population = 0
// input.map(value => population += keys[value])
// console.log(population);

const createMap = (data) => {
  const map = {

    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  }
  data.forEach(value => map[value]++)
  return map
}

const findPopulationAfterXDaysFromMap = (data, days) => {
  let map = createMap(data)
  for (let i=0; i<days; i++) {
    const newMap = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0
    }
    for (let value in map) {
      if (value - 1 >= 0) {
        newMap[value - 1] += map[value]
      } else {
        newMap[6] += map[value]
        newMap[8] += map[value]
      }
    }
    map = newMap
    // console.log(map);
  }
  let population = 0
  for (let value in map) {
    population += map[value]
  }
  return population
}

console.log(findPopulationAfterXDaysFromMap(input, 256));
