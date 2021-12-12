const input = `4836484555
4663841772
3512484556
1481547572
7741183422
8683222882
4215244233
1544712171
5725855786
1717382281`

class Octopus {
  constructor(x, y, energy) {
    this.x = x
    this.y = y
    this.e = energy
    this.hasFlashed = false
    this.neighbors = [
      `${x},${y-1}`,
      `${x},${y+1}`,
      `${x-1},${y}`,
      `${x+1},${y}`,
      `${x-1},${y-1}`,
      `${x+1},${y-1}`,
      `${x-1},${y+1}`,
      `${x+1},${y+1}`
    ]
  }
  gain() {
    this.e++
    if (!this.hasFlashed && this.e > 9) return true
    return false
  }
  flash() {
    this.hasFlashed = true
  }
  reset() {
    if (this.hasFlashed) {
      this.hasFlashed = false
      this.e = 0
    }
  }
}

class School {
  constructor(data) {
    this.population = {}
    const parsedData = data.split(`\n`).map(row => row.split('').map(value => parseInt(value)))
    for (let y = 0; y < parsedData.length; y++) {
      for (let x = 0; x < parsedData[0].length; x++) {
        this.population[`${x},${y}`] = (new Octopus(x, y, parsedData[y][x]))
      }
    }
  }
  runOneStep() {
    let flashes = 0
    let moreFlashes = false
    for (const [name, octopus] of Object.entries(this.population)) {
      const flash = octopus.gain()
      if (flash) moreFlashes = true
    }
    while (moreFlashes) {
      moreFlashes = false
      for (const [name, octopus] of Object.entries(this.population)) {
        if (!octopus.hasFlashed && octopus.e > 9) {
          octopus.flash()
          flashes++
          octopus.neighbors.forEach(neighbor => this.population[neighbor]?.gain())
          moreFlashes = true
        }
      }
    }
    for (const [name, octopus] of Object.entries(this.population)) {
      octopus.reset()
    }
    return flashes
  }

  runXSteps(steps) {
    let sum = 0
    for (let i = 0; i < steps; i++) {
      sum += this.runOneStep()
    }
    return sum
  }

  findFirstSynch() {
    let steps = 0
    let synch = false
    while (synch === false) {
      this.runOneStep()
      steps++
       if (Object.entries(this.population).every(([name, octopus]) => octopus.e === 0)) {
         synch = true
       }
    }

    return steps
  }
}

const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

const school = new School(input)

console.log(school.findFirstSynch());
