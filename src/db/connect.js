import dotenv from 'dotenv';

import { Pool } from 'pg';

import 'babel-polyfill';

const pool = new Pool({
  host: 'localhost',
  user: 'nkunzi',
  database: 'senditdb',
  port: 5432,
  password: 'rugina/303.',
});

const connect = () => new Promise(async (resolve, reject) => {
  try {
    pool.connect()
      .then(() => console.log('connected'))
      .catch((error) => console.log(error));
  } catch(error) {
    console.log(error);
  }
});

const db = {
  connect,
  query: (text, params) => pool.query(text, params),
}

export default db;