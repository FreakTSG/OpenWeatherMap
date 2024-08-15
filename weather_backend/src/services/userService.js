const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const USERS_DB = path.join(__dirname, '../data/users.json');
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

// Utility to read users from the JSON file
const getUsers = () => {
  if (!fs.existsSync(USERS_DB)) {
    return [];
  }
  const data = fs.readFileSync(USERS_DB);
  return JSON.parse(data);
};

// Utility to save users to the JSON file
const saveUsers = (users) => {
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));
};

// Register a new user
const registerUser = async (username, password) => {
  const users = getUsers();
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };

  users.push(newUser);
  saveUsers(users);
};

// Authenticate a user
const authenticateUser = async (username, password) => {
  const users = getUsers();
  const user = users.find(user => user.username === username);

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

module.exports = {
  registerUser,
  authenticateUser,
};
