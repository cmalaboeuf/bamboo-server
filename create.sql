CREATE DATABASE bamboo;
CREATE TABLE users
(
  ID serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (60) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);

CREATE TABLE products
(
  ID serial PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  description VARCHAR (255) NOT NULL,
  link VARCHAR (355) NOT NULL,
  created_on TIMESTAMP NOT NULL
);

CREATE TABLE contracts
(
    ID serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    content VARCHAR (500) NOT NULL,
    durationYear INTEGER NOT NULL,
    created_on TIMESTAMP NOT NULL
);

CREATE TABLE products_contracts
(
    product_id serial references products(ID) NOT NULL ,
    contract_id serial references contracts(ID) NOT NULL ,
    start_date TIMESTAMP NOT NULL
);
