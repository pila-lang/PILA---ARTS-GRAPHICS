import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

function readDb() {
  if (!fs.existsSync(dbPath)) {
    return { users: [], products: [], orders: [], about: { bio: '', imageUrl: '' } };
  }
  const file = fs.readFileSync(dbPath, 'utf8');
  try {
    const data = JSON.parse(file);
    if (!data.about) data.about = { bio: '', imageUrl: '' };
    return data;
  } catch (error) {
    return { users: [], products: [], orders: [], about: { bio: '', imageUrl: '' } };
  }
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function getUsers() {
  const db = readDb();
  return db.users;
}

export function getUser(email) {
  const db = readDb();
  return db.users.find((u) => u.email === email);
}

export function addUser(user) {
  const db = readDb();
  user.id = Date.now().toString(); // Simple ID generation
  db.users.push(user);
  writeDb(db);
  return user;
}

export function getProducts() {
  const db = readDb();
  return db.products;
}

export function getProduct(id) {
  const db = readDb();
  return db.products.find((p) => p.id === id);
}

export function addProduct(product) {
  const db = readDb();
  product.id = Date.now().toString();
  db.products.push(product);
  writeDb(db);
  return product;
}

export function deleteProduct(id) {
  const db = readDb();
  db.products = db.products.filter(p => p.id !== id);
  writeDb(db);
}

export function addOrder(order) {
  const db = readDb();
  order.id = Date.now().toString();
  order.date = new Date().toISOString();
  db.orders.push(order);
  writeDb(db);
  return order;
}

export function getAbout() {
  const db = readDb();
  return db.about;
}

export function updateAbout(aboutData) {
  const db = readDb();
  db.about = { ...db.about, ...aboutData };
  writeDb(db);
  return db.about;
}

export function updateUser(email, userData) {
  const db = readDb();
  const index = db.users.findIndex(u => u.email === email);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...userData };
    writeDb(db);
    return db.users[index];
  }
  return null;
}
