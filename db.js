let users = [
  {
    id: 1, // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: 2, // hint: use the shortid npm package to generate it
    name: "John Doe", // String, required
    bio: "Not Tarzan's Wife, another John", // String, required
  },
  {
    id: 3, // hint: use the shortid npm package to generate it
    name: "Scott Doe", // String, required
    bio: "Not Tarzan's Wife, another Scott", // String, required
  },
  {
    id: 4, // hint: use the shortid npm package to generate it
    name: "BOb Doe", // String, required
    bio: "Not Tarzan's Wife, another Bob", // String, required
  },
  {
    id: 5, // hint: use the shortid npm package to generate it
    name: "Joe Doe", // String, required
    bio: "Not Tarzan's Wife, another Joe", // String, required
  },
  {
    id: 6, // hint: use the shortid npm package to generate it
    name: "Mark Doe", // String, required
    bio: "Not Tarzan's Wife, another Mark", // String, required
  },
];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(data) {
  const payload = {
    id: Number(users.length + 1),
    ...data,
  };

  users.push(payload);
  return payload;
}

function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };

  return users[index];
}

function deleteUser(id) {
  users = users.filter((u) => u.id !== id);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
