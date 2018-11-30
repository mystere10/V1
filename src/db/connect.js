import dotenv from 'dotenv';

import { Pool } from 'pg';

import 'babel-polyfill';

const connectionString = process.env.DATABASE_URL;
const localDb = {
  host: 'localhost',
  user: 'nkunzi',
  database: 'senditdb',
  port: 5432,
  password: 'rugina/303.',
}
const pool = connectionString ? new Pool({connectionString}): new Pool(localDb);

const defaultTables = async () => {
  const registration = `create table if not exists users
    (
        id SERIAL primary key,
        fname varchar NOT NULL,
        lname varchar NOT NULL,
        phone varchar NOT NULL,
        password varchar NOT NULL,
        function varchar NOT null default 'user' 
    );`;
  const orders = `create table if not exists parcels
    (
        id SERIAL primary key,
        userid integer NOT NULL,
        reciepientname varchar NOT NULL
        weight integer NOT NULL,
        destinationtown varchar NOT NULL,
        destinationcountry varchar NOT NULL,
        status varchar NOT NULL,
        postcode varchar NOT NULL,
        phone varchar NOT NULL
        created_at timestamp without time zone DEFAULT now()
    )`;
  const connection = await connect();
  await connection.query(registration);
  await connection.query(orders);
};

defaultTables();

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