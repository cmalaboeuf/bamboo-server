CREATE DATABASE bamboo;
CREATE TABLE users
(
  ID serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (50) NOT NULL,
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
