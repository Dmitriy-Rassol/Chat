const { createClient } = require("redis");

const localId =
  "#" +
  (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6) +
  (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6) +
  (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);

const client = createClient();
const pubClient = client.duplicate();
const subClient = client.duplicate();

client.connect();
pubClient.connect();
subClient.connect();

async function get(key, defaultValue) {
  const value = await client.get(key);
  return value || defaultValue || null;
}

async function set(key, value) {
  if (!value) {
    await client.del(key);
  } else {
    await client.set(key, value);
  }
}

async function setObject(key, value) {
  await client.hSet(key, value);
}

async function getObject(key) {
  await client.hGet(key);
}

async function pub(type, payload) {
  payload.publisher = localId;
  console.log(localId);
  return pubClient.publish(type, JSON.stringify(payload));
}

async function sub(type, callback) {
  subClient.subscribe(type, (message) => {
    const payload = JSON.stringify(message);
    if (payload.publisher === localId) return;
    callback(payload);
  });
}

module.exports = {
  get,
  set,
  setObject,
  getObject,
  del: client.del,
  pub,
  sub,
};
