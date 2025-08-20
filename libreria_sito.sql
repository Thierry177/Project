CREATE TABLE utenti (
id_utente SERIAL PRIMARY KEY ,
nome VARCHAR(100) NOT NULL,
cognome VARCHAR(100)NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password_ VARCHAR(255) NOT NULL,
ruolo VARCHAR(20) DEFAULT 'cliente',
data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorie (
id_categoria SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
descrizione TEXT
);

CREATE TABLE libri (
id_libro SERIAL PRIMARY KEY,
titolo VARCHAR(200) NOT NULL,
autore VARCHAR(200) NOT NULL,
isbn VARCHAR(20) UNIQUE,
descrizione TEXT,
prezzo DECIMAL (10,2) NOT NULL,
immagine_url TEXT,
data_pubblicazione DATE,
categoria_id INT,
FOREIGN KEY (categoria_id) REFERENCES categorie (id_categoria)
);

CREATE TABLE ordini (
id_ordine SERIAL PRIMARY KEY,
id_utente INT NOT NULL,
totale DECIMAL(10,2) NOT NULL,
data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_utente) REFERENCES utenti(id_utente)
); 




