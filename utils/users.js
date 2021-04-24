const users = []

// join users
const userJoin = (id, username, room) => {
  const user = {
    id, username, room
  }
  users.push(user)
  return user
}

const getUser = (id) => {
  return users.find(user => user.id === id)
}

const userLeave = (id) => {
  const index = users.findIndex((user) => { return user.id === id })
  console.log(index)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getRoomusers = (room) => {
  return users.filter((user) => { user.room === room })
}

module.exports = {
  userJoin,
  getUser,
  userLeave,
  getRoomusers
}