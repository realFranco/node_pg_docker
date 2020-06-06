CREATE TABLE IF NOT EXISTS Car (
  id_car uuid NOT NULL, 
  brand  varchar(64) NOT NULL, 
  model  varchar(64) NOT NULL UNIQUE, 
  PRIMARY KEY (id_car));
