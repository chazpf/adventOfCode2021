const input = `EO-jc
end-tm
jy-FI
ek-EO
mg-ek
jc-jy
FI-start
jy-mg
mg-FI
jc-tm
end-EO
ds-EO
jy-start
tm-EO
mg-jc
ek-jc
tm-ek
FI-jc
jy-EO
ek-jy
ek-LT
start-mg`

const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

class Node {
  constructor(name) {
    this.name = name
    this.connections = new Set([])
    this.isSmall = (name === name.toLowerCase())
  }

  addConnection(room) {
    this.connections.add(room)
  }

  getConnections() {
    return Array.from(this.connections)
  }
}

class Graph {
  constructor(data) {
    this.nodes = {}
    const parsedData = data.split(`\n`)
    parsedData.forEach(line => {
      const [room1, room2] = line.split('-')
      if (!this.nodes[room1]) {
        this.nodes[room1] = new Node(room1)
      }
      if (!this.nodes[room2]) {
        this.nodes[room2] = new Node(room2)
      }
      this.nodes[room1].addConnection(room2)
      this.nodes[room2].addConnection(room1)
    })
  }

  // sumRoutes() {
  //   let routes = 0
  //   const findRoutes = (current, visited = []) => {
  //     if (current === 'end') {
  //       return routes++
  //     } else {
  //       visited.push(current)
  //       for (const connection of this.nodes[current].getConnections()) {
  //         if (this.nodes[connection].isSmall && visited.includes(connection)) {
  //           continue
  //         }
  //         findRoutes(connection, [...visited])
  //       }
  //     }
  //   }
  //   findRoutes('start')
  //   return routes
  // }
  sumNewRoutes() {
    let routes = 0
    const findRoutes = (current, visited = []) => {
      visited.push(current)
      if (current === 'end') {
        return routes++
      } else {
        for (const connection of this.nodes[current].getConnections()) {
          if (connection === 'start') continue
          if (this.nodes[connection].isSmall && visited.includes(connection)) {
            if (visited.includes('small')) {
              continue
            } else {
              findRoutes(connection, [...visited, 'small'])
            }
          } else {
            findRoutes(connection, [...visited])
          }
        }
      }
    }
    findRoutes('start')
    return routes
  }
}

const graph = new Graph(input)
console.log(graph.sumNewRoutes());
