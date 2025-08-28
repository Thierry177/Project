import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const db = await mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "bookstore"
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// =============== UTENTI ===============
// Registrazione
app.post("/api/utenti", async (req, res) => {
  const { nome, cognome, email, password_, indirizzo } = req.body;
  if (!nome || !cognome || !email || !password_) {
    return res.status(400).json({ error: "Dati mancanti" });
  }

  try {
    const hashed = await bcrypt.hash(password_, 10);
    await db.query(
      "INSERT INTO utenti (nome, cognome, email, password_, indirizzo) VALUES (?, ?, ?, ?, ?)",
      [nome, cognome, email, hashed, indirizzo ?? null]
    );
    res.json({ message: "Utente registrato con successo" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore registrazione" });
  }
});


// Login
app.post("/api/login", async (req, res) => {
  const { email, password_ } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM utenti WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ error: "Email non trovata" });

    const utente = rows[0];
    const match = await bcrypt.compare(password_, utente.password_);
    if (!match) return res.status(401).json({ error: "Password errata" });

    res.json({ message: "Login effettuato", user: { id: utente.id_utente, ruolo: utente.ruolo } });
  } catch (err) {
    res.status(500).json({ error: "Errore login" });
  }
});

// Ottieni dati utente
app.get("/api/utenti/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query(
      "SELECT id_utente, nome, cognome, email, indirizzo FROM utenti WHERE id_utente = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Utente non trovato" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server" });
  }
});


// Aggiorna dati utente
app.put("/api/utenti/:id", async (req, res) => {
  const { nome, cognome, email, indirizzo, password_ } = req.body;
  const id = req.params.id;

  try {
    let query = "UPDATE utenti SET nome=?, cognome=?, email=?, indirizzo=?";
    const params = [nome, cognome, email, indirizzo ?? null];

    if (password_) {
      const hashed = await bcrypt.hash(password_, 10);
      query += ", password_=?";
      params.push(hashed);
    }

    query += " WHERE id_utente=?";
    params.push(id);

    await db.query(query, params);
    res.json({ message: "Profilo aggiornato con successo" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore aggiornamento profilo" });
  }
});



// --- CARRELLO ---
app.get("/api/carrello/:id_utente", async (req, res) => {
  const [rows] = await db.query(
    "SELECT c.id_carrello, c.id_libro, c.quantita, l.titolo, l.prezzo, l.immagine_url " +
    "FROM carrello c JOIN libri l ON c.id_libro = l.id_libro WHERE c.id_utente = ?",
    [req.params.id_utente]
  );
  res.json(rows);
});

// Aggiungi libro al carrello
app.post("/api/carrello/:id_utente", async (req, res) => {
  const { id_libro } = req.body;
  const id_utente = req.params.id_utente;

  // Controlla se già presente
  const [rows] = await db.query(
    "SELECT * FROM carrello WHERE id_utente = ? AND id_libro = ?",
    [id_utente, id_libro]
  );

  if (rows.length > 0) {
    // Aggiorna quantità
    await db.query(
      "UPDATE carrello SET quantita = quantita + 1 WHERE id_utente = ? AND id_libro = ?",
      [id_utente, id_libro]
    );
  } else {
    await db.query(
      "INSERT INTO carrello (id_utente, id_libro, quantita) VALUES (?, ?, 1)",
      [id_utente, id_libro]
    );
  }

  res.json({ message: "Libro aggiunto al carrello" });
});

// Aggiorna quantità libro
app.put("/api/carrello/:id_utente", async (req, res) => {
  const { id_libro, quantita } = req.body;
  await db.query(
    "UPDATE carrello SET quantita = ? WHERE id_utente = ? AND id_libro = ?",
    [quantita, req.params.id_utente, id_libro]
  );
  res.json({ message: "Quantità aggiornata" });
});

// Rimuovi libro dal carrelloapp.delete("/api/carrello/:id_carrello", async (req, res) => {
  app.delete("/api/carrello/:id_carrello", async (req, res) => {
  await db.query("DELETE FROM carrello WHERE id_carrello = ?", [req.params.id_carrello]);
  res.json({ message: "Libro rimosso" });
});


// =============== CATEGORIE ===============
app.get("/api/categorie", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM categorie");
  res.json(rows);
});

// =============== LIBRI ===============
app.get("/api/libri", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM libri");
  res.json(rows);
});

app.get("/api/libri/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM libri WHERE id_libro = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Libro non trovato" });
  res.json(rows[0]);
});

app.get("/api/categorie/:id/libri", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM libri WHERE categoria_id = ?", [req.params.id]);
  res.json(rows);
});

app.get("/api/search", async (req, res) => {
  const q = `%${req.query.q || ""}%`;
  const [rows] = await db.query(
    "SELECT * FROM libri WHERE titolo LIKE ? OR autore LIKE ?",
    [q, q]
  );
  res.json(rows);
});

// =============== ORDINI ===============
app.post("/api/ordini", async (req, res) => {
  const { id_utente, totale } = req.body;
  if (!id_utente || !totale) return res.status(400).json({ error: "Dati mancanti" });

  try {
    // 1. Prendo i libri dal carrello
    const [carrelloItems] = await db.query(
      `SELECT c.quantita, l.id_libro, l.titolo, l.prezzo, l.immagine_url
       FROM carrello c
       JOIN libri l ON c.id_libro = l.id_libro
       WHERE c.id_utente = ?`,
      [id_utente]
    );

    if (carrelloItems.length === 0) {
      return res.status(400).json({ error: "Carrello vuoto" });
    }

    // 2. Inserisco l'ordine con i libri in JSON
    await db.query(
      "INSERT INTO ordini (id_utente, totale, libri_json) VALUES (?, ?, ?)",
      [id_utente, totale, JSON.stringify(carrelloItems)]
    );

    // 3. Svuoto il carrello
    await db.query("DELETE FROM carrello WHERE id_utente = ?", [id_utente]);

    res.json({ message: "Ordine creato con successo" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore creazione ordine" });
  }
});

app.get("/api/ordini/:id_utente", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM ordini WHERE id_utente = ?", [req.params.id_utente]);

  // Converto libri_json da stringa JSON a array JS
  const ordini = rows.map(o => ({
    ...o,
    libri_json: o.libri_json ? JSON.parse(o.libri_json) : []
  }));

  res.json(ordini);
});


// Serve la home page project.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "project.html"));
});

// Cancella un ordine
app.delete("/api/ordini/:id_ordine", async (req, res) => {
  const idOrdine = req.params.id_ordine;
  try {
    await db.query("DELETE FROM ordini WHERE id_ordine = ?", [idOrdine]);
    res.json({ message: "Ordine annullato con successo" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore annullamento ordine" });
  }
});


// =============== START SERVER ===============

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
