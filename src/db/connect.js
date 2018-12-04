import dotenv from 'dotenv';

import { Pool } from 'pg';

import 'babel-polyfill';

dotenv.config();

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

const defaultTables = async () => {
  const registration = `create table if not exists registration
    (
        id SERIAL primary key,
        fname varchar NOT NULL,
        lname varchar NOT NULL,
        email varchar UNIQUE NOT NULL,
        phone varchar UNIQUE NOT NULL,
        password varchar NOT NULL,
        function varchar NOT null default 'user' 
        ON DELETE CASCADE ON UPDATE CASCADE
    );`;
  const orders = `create table if not exists orders
    (
        id SERIAL primary key,
        userid foreign key references registration(id),
        reciepientname varchar NOT NULL
        weight integer NOT NULL,
        destinationtown varchar NOT NULL,
        destinationcountry varchar NOT NULL,
        status enum('in transtit', 'delivered', 'canceled'),
        postcode varchar NOT NULL,
        phone varchar NOT NULL
        created_at timestamp without time zone DEFAULT now()
        ON DELETE CASCADE ON UPDATE CASCADE
    )`;
  const connection = await connect();
  await connection.query(registration);
  await connection.query(orders);
};

defaultTables();

const db = {
  connect,
  query: (text, params) => pool.query(text, params),
}

export default db;