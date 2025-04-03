const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

let users = {};
let idCounter = 1;

class User {
  constructor(email, password, name, address) {
    this.id = (idCounter++).toString();
    this.email = email;
    this.password = password;
    this.name = name;
    this.address = address;
    this.registrationDate = new Date().toISOString();
    this.lastLogin = null;
  }

  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const user = new User(
      userData.email,
      hashedPassword,
      userData.name,
      userData.address
    );
    users[user.id] = user;
    return user;
  }

  static findById(id) {
    return users[id] || null;
  }

  static findByEmail(email) {
    return Object.values(users).find(user => user.email === email) || null;
  }

  static update(id, updates) {
    if (users[id]) {
      users[id] = { ...users[id], ...updates };
      return users[id];
    }
    return null;
  }

  static verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;