import mysql from "mysql2/promise";

// Connessione al DB
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "", // la tua password
  database: "bookstore"
});

// Elenco categorie
const categorie = [
  { nome: "Narrativa", descrizione: "Libri di narrativa generale" },
  { nome: "Thriller", descrizione: "Libri di suspense e thriller" },
  { nome: "Fantascienza", descrizione: "Libri di fantascienza" },
  { nome: "Fantasy", descrizione: "Libri fantasy" },
  { nome: "Romanzo Rosa", descrizione: "Romanzi romantici" },
  { nome: "Storico", descrizione: "Libri di storia e romanzi storici" },
  { nome: "Horror", descrizione: "Libri horror" },
  { nome: "Biografie", descrizione: "Biografie e autobiografie" },
  { nome: "Young Adult", descrizione: "Libri per giovani adulti" },
  { nome: "Classici", descrizione: "Libri classici della letteratura" },
  { nome: "Avventura", descrizione: "Libri di avventura e viaggi" },
  { nome: "Umoristico", descrizione: "Libri divertenti e satirici" },
  { nome: "Psicologico", descrizione: "Libri di narrativa psicologica" },
  { nome: "Distopico", descrizione: "Romanzi distopici e futuristici" },
  { nome: "Poesia", descrizione: "Raccolte di poesie classiche e moderne" }

];

// Elenco libri
const libri = [
  // 1. Narrativa
  { titolo: "Il cacciatore di aquiloni", autore: "Khaled Hosseini", prezzo: 12.99, categoria_id: 1, descrizione: "Un romanzo che esplora amicizia, tradimento e redenzione in Afghanistan." , img: "https://m.media-amazon.com/images/I/81MZL2dqUuL.jpg" },
  { titolo: "La solitudine dei numeri primi", autore: "Paolo Giordano", prezzo: 9.99, categoria_id: 1, descrizione: "Due vite segnate da traumi infantili e dal difficile rapporto con il mondo." },
  { titolo: "Storia di una ladra di libri", autore: "Markus Zusak", prezzo: 14.50, categoria_id: 1, descrizione: "Durante la Seconda Guerra Mondiale, una giovane ragazza ruba libri e condivide storie." },
  { titolo: "Le otto montagne", autore: "Paolo Cognetti", prezzo: 11.90, categoria_id: 1, descrizione: "La storia di un'amicizia e della ricerca di sé tra le montagne italiane." },
  { titolo: "L'amica geniale", autore: "Elena Ferrante", prezzo: 10.99, categoria_id: 1, descrizione: "La complessa amicizia tra due ragazze nella Napoli del dopoguerra." },
  { titolo: "Il nome della rosa", autore: "Umberto Eco", prezzo: 13.90, categoria_id: 1, descrizione: "Un giallo medievale che unisce mistero, filosofia e teologia." },

  // 2. Thriller
  { titolo: "La ragazza del treno", autore: "Paula Hawkins", prezzo: 10.00, categoria_id: 2, descrizione: "Un thriller psicologico pieno di suspense e colpi di scena." },
  { titolo: "Uomini che odiano le donne", autore: "Stieg Larsson", prezzo: 11.99, categoria_id: 2, descrizione: "Indagini e misteri che ruotano attorno a un caso di scomparsa irrisolto." },
  { titolo: "Shutter Island", autore: "Dennis Lehane", prezzo: 9.75, categoria_id: 2, descrizione: "Un detective indaga su una misteriosa sparizione in un ospedale psichiatrico." },

  // 3. Fantascienza
  { titolo: "Dune", autore: "Frank Herbert", prezzo: 14.90, categoria_id: 3, descrizione: "Un'epica saga interplanetaria su potere, politica e destino." },
  { titolo: "Fondazione", autore: "Isaac Asimov", prezzo: 12.50, categoria_id: 3, descrizione: "La lotta per preservare la conoscenza in un impero galattico in declino." },
  { titolo: "Neuromante", autore: "William Gibson", prezzo: 11.00, categoria_id: 3, descrizione: "Un romanzo cyberpunk che ha definito il genere informatico e hacker." },

  // 4. Fantasy
  { titolo: "Il signore degli anelli", autore: "J.R.R. Tolkien", prezzo: 16.99, categoria_id: 4, descrizione: "Un viaggio epico per distruggere un potente anello malvagio.", img: "https://covers.openlibrary.org/b/id/10716508-L.jpg" },
  { titolo: "Harry Potter e la Pietra Filosofale", autore: "J.K. Rowling", prezzo: 8.90, categoria_id: 4, descrizione: "Il giovane Harry scopre di essere un mago e inizia la sua avventura a Hogwarts." },
  { titolo: "Eragon", autore: "Christopher Paolini", prezzo: 10.50, categoria_id: 4, descrizione: "Un ragazzo scopre di essere l'ultimo Cavaliere dei Draghi e parte per un'avventura." },

  // 5. Romanzo Rosa
  { titolo: "Orgoglio e Prejudizio", autore: "Jane Austen", prezzo: 9.90, categoria_id: 5, descrizione: "L'amore e le convenzioni sociali nell'Inghilterra del XIX secolo." },
  { titolo: "Come l'acqua per il cioccolato", autore: "Laura Esquivel", prezzo: 10.50, categoria_id: 5, descrizione: "Storia d'amore e cucina, tra emozioni e tradizioni familiari." },
  { titolo: "Sogni e delitti", autore: "Lisa Kleypas", prezzo: 11.20, categoria_id: 5, descrizione: "Intrighi romantici e colpi di scena in un contesto storico elegante." },
  { titolo: "Le pagine della nostra vita", autore: "Nicholas Sparks", prezzo: 12.00, categoria_id: 5, descrizione: "Una storia d'amore intensa che supera prove e avversità." },
  { titolo: "Anna Karenina", autore: "Lev Tolstoj", prezzo: 13.50, categoria_id: 5, descrizione: "La tragedia dell'amore e della passione in una società rigida." },
  { titolo: "Il giardino segreto", autore: "Frances Hodgson Burnett", prezzo: 10.90, categoria_id: 5, descrizione: "Una ragazza scopre un giardino segreto che cambierà la sua vita." },
  { titolo: "La prima volta che ho visto Parigi", autore: "Paula McLain", prezzo: 11.00, categoria_id: 5, descrizione: "Romance storico ambientato nella Parigi degli anni '20." },
  { titolo: "Uno splendido disastro", autore: "Jamie McGuire", prezzo: 9.80, categoria_id: 5, descrizione: "Una storia di amore turbolento tra due giovani dal carattere opposto." },
  { titolo: "Il profumo delle foglie di limone", autore: "Clara Sanchez", prezzo: 12.40, categoria_id: 5, descrizione: "Una vicenda di ricordi e misteri legati a un amore perduto." },
  { titolo: "Le coincidenze dell'amore", autore: "Jane Green", prezzo: 10.30, categoria_id: 5, descrizione: "L'incontro casuale che cambierà il destino dei protagonisti." },
  { titolo: "Ti amerò sempre, cara", autore: "Cecelia Ahern", prezzo: 14.00, categoria_id: 5, descrizione: "Una commovente storia d'amore e legami indissolubili." },
  { titolo: "La voce invisibile delle cose", autore: "Agnès Ledig", prezzo: 11.50, categoria_id: 5, descrizione: "Una giovane donna affronta il dolore e la rinascita personale." },

  // 6. Storico
  { titolo: "I pilastri della terra", autore: "Ken Follett", prezzo: 14.50, categoria_id: 6, descrizione: "Costruzione di una cattedrale medievale e intrighi politici." },
  { titolo: "Il nome della rosa", autore: "Umberto Eco", prezzo: 13.90, categoria_id: 6, descrizione: "Un monaco detective indaga su misteriosi omicidi in un monastero." },
  { titolo: "Guerra e Pace", autore: "Lev Tolstoj", prezzo: 15.00, categoria_id: 6, descrizione: "Epica storia di amore e conflitto durante le guerre napoleoniche." },
  { titolo: "La caduta dei giganti", autore: "Ken Follett", prezzo: 12.80, categoria_id: 6, descrizione: "Storie intrecciate di famiglie durante la Prima Guerra Mondiale." },
  { titolo: "Il falco e la colomba", autore: "Ken Follett", prezzo: 11.50, categoria_id: 6, descrizione: "Avventure e intrighi tra nobili e popolo in epoca medievale." },
  { titolo: "La colonna infame", autore: "Alessandro Manzoni", prezzo: 10.70, categoria_id: 6, descrizione: "Racconto di ingiustizie e pettegolezzi nel Seicento lombardo." },
  { titolo: "Il guerriero dell'alba", autore: "Ken Follett", prezzo: 12.50, categoria_id: 6, descrizione: "Avventure e lotte di potere durante l'epoca medievale." },
  { titolo: "La regina senz'ombra", autore: "Ken Follett", prezzo: 11.90, categoria_id: 6, descrizione: "Intrighi di corte e lotte per il trono in un regno immaginario." },
  { titolo: "Il medico di corte", autore: "Ken Follett", prezzo: 13.20, categoria_id: 6, descrizione: "La storia di un medico al servizio dei potenti e dei segreti di corte." },
  { titolo: "Via col vento", autore: "Margaret Mitchell", prezzo: 12.40, categoria_id: 6, descrizione: "Romance e drammi durante la Guerra Civile Americana." },
  { titolo: "La sposa scomparsa", autore: "Ken Follett", prezzo: 10.80, categoria_id: 6, descrizione: "Intrighi, misteri e drammi nella società inglese." },
  { titolo: "La storia", autore: "Elsa Morante", prezzo: 14.00, categoria_id: 6, descrizione: "Vita di una famiglia italiana durante la Seconda Guerra Mondiale." },

  // 7. Horror
  { titolo: "Dracula", autore: "Bram Stoker", prezzo: 9.90, categoria_id: 7, descrizione: "Il celebre vampiro e la sua minaccia sull'Inghilterra vittoriana." },
  { titolo: "Frankenstein", autore: "Mary Shelley", prezzo: 8.90, categoria_id: 7, descrizione: "Uno scienziato crea una creatura che sfugge al suo controllo." },
  { titolo: "It", autore: "Stephen King", prezzo: 12.50, categoria_id: 7, descrizione: "Un clown demoniaco terrorizza una cittadina americana." },
  { titolo: "Shining", autore: "Stephen King", prezzo: 11.90, categoria_id: 7, descrizione: "Un uomo impazzisce in un hotel isolato con poteri soprannaturali." },
  { titolo: "Rosemary's Baby", autore: "Ira Levin", prezzo: 10.50, categoria_id: 7, descrizione: "Una giovane donna sospetta che il marito sia coinvolto in un culto satanico." },
  { titolo: "La casa delle belle addormentate", autore: "Yasunari Kawabata", prezzo: 9.70, categoria_id: 7, descrizione: "Riflessione sull'invecchiamento e desiderio in una casa misteriosa." },
  { titolo: "L'Esorcista", autore: "William Peter Blatty", prezzo: 11.20, categoria_id: 7, descrizione: "Una ragazza viene posseduta e un esorcismo lotta contro il male." },
  { titolo: "Pet Sematary", autore: "Stephen King", prezzo: 10.80, categoria_id: 7, descrizione: "La morte e il ritorno di persone amate con conseguenze inquietanti." },
  { titolo: "La bambina che amava Tom Gordon", autore: "Stephen King", prezzo: 10.30, categoria_id: 7, descrizione: "Una bambina persa nei boschi lotta per sopravvivere." },
  { titolo: "Cattedrale", autore: "Raymond Carver", prezzo: 9.90, categoria_id: 7, descrizione: "Racconti di vita quotidiana con un tocco inquietante e riflessivo." },
  { titolo: "L'ombra dell'angelo", autore: "Gillian Flynn", prezzo: 11.50, categoria_id: 7, descrizione: "Un thriller psicologico con tensione crescente e segreti oscuri." },
  { titolo: "La casa delle foglie", autore: "Mark Z. Danielewski", prezzo: 12.00, categoria_id: 7, descrizione: "Una casa che sfida le leggi della fisica e la sanità mentale dei suoi abitanti." },


  // 8. Biografie
  { titolo: "Steve Jobs (Isaacson)", autore: "Walter Isaacson", prezzo: 13.90, categoria_id: 8, descrizione: "Biografia del cofondatore di Apple e della sua visione rivoluzionaria." },
  { titolo: "Io sono Malala", autore: "Malala Yousafzai", prezzo: 11.50, categoria_id: 8, descrizione: "La storia della giovane attivista per il diritto all'istruzione." },
  { titolo: "La mia vita", autore: "Bill Clinton", prezzo: 10.70, categoria_id: 8, descrizione: "Autobiografia dell'ex presidente degli Stati Uniti." },
  { titolo: "Il diario di Anne Frank", autore: "Anne Frank", prezzo: 9.80, categoria_id: 8, descrizione: "Il racconto commovente di una ragazza ebrea durante la Seconda Guerra Mondiale." },
  { titolo: "Long Walk to Freedom", autore: "Nelson Mandela", prezzo: 12.40, categoria_id: 8, descrizione: "Autobiografia di Nelson Mandela e della lotta contro l'apartheid." },
  { titolo: "Becoming", autore: "Michelle Obama", prezzo: 11.90, categoria_id: 8, descrizione: "La storia dell'ex first lady degli Stati Uniti e del suo percorso personale." },
  { titolo: "Io, Ibrahim", autore: "Ibrahim A.", prezzo: 10.30, categoria_id: 8, descrizione: "Memorie di una vita tra sfide personali e crescita interiore." },
  { titolo: "La mia Africa", autore: "Karen Blixen", prezzo: 11.00, categoria_id: 8, descrizione: "Esperienze vissute in Africa raccontate con passione e poesia." },
  { titolo: "Educated", autore: "Tara Westover", prezzo: 12.20, categoria_id: 8, descrizione: "Autobiografia di una donna cresciuta senza istruzione formale che riesce a laurearsi." },
  { titolo: "La lunga strada verso la libertà", autore: "Nelson Mandela", prezzo: 13.50, categoria_id: 8, descrizione: "La lotta di Mandela per la libertà e la giustizia in Sudafrica." },
  { titolo: "Unbroken", autore: "Laura Hillenbrand", prezzo: 12.00, categoria_id: 8, descrizione: "La straordinaria storia di resilienza di un aviatore della Seconda Guerra Mondiale." },
  { titolo: "La principessa Diana (Philip Norman)", autore: "Philip Norman", prezzo: 10.90, categoria_id: 8, descrizione: "Biografia della principessa del popolo e della sua vita privata." },

  // 9. Young Adult
  { titolo: "Hunger Games", autore: "Suzanne Collins", prezzo: 11.50, categoria_id: 9, descrizione: "Katniss lotta per sopravvivere in un futuro distopico." },
  { titolo: "Divergent", autore: "Veronica Roth", prezzo: 10.90, categoria_id: 9, descrizione: "Una società divisa per fazioni e la ribellione di una giovane donna." },
  { titolo: "Colpa delle stelle", autore: "John Green", prezzo: 9.80, categoria_id: 9, descrizione: "Storia romantica e struggente di due ragazzi malati di cancro." },
  { titolo: "Maze Runner", autore: "James Dashner", prezzo: 11.00, categoria_id: 9, descrizione: "Un ragazzo si sveglia in un labirinto senza ricordi e cerca la via d'uscita." },
  { titolo: "Percy Jackson e gli dei dell'Olimpo", autore: "Rick Riordan", prezzo: 12.40, categoria_id: 9, descrizione: "Percy scopre di essere un semidio e affronta avventure mitologiche." },
  { titolo: "Looking for Alaska", autore: "John Green", prezzo: 10.20, categoria_id: 9, descrizione: "Un ragazzo cerca di capire l'amicizia e l'amore durante il liceo." },
  { titolo: "Città di Carta", autore: "John Green", prezzo: 10.50, categoria_id: 9, descrizione: "Un giovane ragazzo indaga sulla scomparsa della vicina di casa." },
  { titolo: "Il ribelle", autore: "David Levithan", prezzo: 11.20, categoria_id: 9, descrizione: "La storia di un ragazzo che sfida le regole e cerca la propria identità." },
  { titolo: "Shadowhunters - Città di Ossa", autore: "Cassandra Clare", prezzo: 10.90, categoria_id: 9, descrizione: "Avventure di cacciatori di demoni in una New York segreta e magica." },
  { titolo: "Eleanor & Park", autore: "Rainbow Rowell", prezzo: 9.70, categoria_id: 9, descrizione: "Una storia d'amore adolescenziale tra due ragazzi emarginati." },
  { titolo: "Aristotle and Dante Discover the Secrets of the Universe", autore: "Benjamin Alire Sáenz", prezzo: 12.90, categoria_id: 9, descrizione: "Due ragazzi scoprono l'amicizia e l'identità personale." },
  { titolo: "Every Day", autore: "David Levithan", prezzo: 10.80, categoria_id: 9, descrizione: "Ogni giorno un corpo diverso, una storia d'amore che sfida la normalità." },

  // 10. Classici
  { titolo: "I promessi sposi", autore: "Alessandro Manzoni", prezzo: 8.50, categoria_id: 10, descrizione: "La storia di Renzo e Lucia nell'Italia del Seicento." },
  { titolo: "Divina Commedia", autore: "Dante Alighieri", prezzo: 7.90, categoria_id: 10, descrizione: "Il viaggio di Dante attraverso Inferno, Purgatorio e Paradiso." },
  { titolo: "Odyssey", autore: "Omero", prezzo: 10.00, categoria_id: 10, descrizione: "Le avventure di Ulisse nel suo lungo viaggio di ritorno a casa." },
  { titolo: "Iliade", autore: "Omero", prezzo: 10.00, categoria_id: 10, descrizione: "Epopea della guerra di Troia e degli eroi dell'epoca." },
  { titolo: "Madame Bovary", autore: "Gustave Flaubert", prezzo: 9.80, categoria_id: 10, descrizione: "Tragedia di una donna insoddisfatta della vita matrimoniale." },
  { titolo: "Moby Dick", autore: "Herman Melville", prezzo: 11.50, categoria_id: 10, descrizione: "La caccia ossessiva della balena bianca da parte del capitano Ahab." },
  { titolo: "Guerra dei mondi", autore: "H.G. Wells", prezzo: 9.70, categoria_id: 10, descrizione: "Invasione aliena della Terra raccontata con suspense e fantascienza." },
  { titolo: "Il ritratto di Dorian Gray", autore: "Oscar Wilde", prezzo: 10.20, categoria_id: 10, descrizione: "Un uomo resta eternamente giovane mentre il suo ritratto invecchia." },
  { titolo: "Anna Karenina (classico)", autore: "Lev Tolstoj", prezzo: 11.00, categoria_id: 10, descrizione: "Tragedia e passione nella società russa del XIX secolo." },
  { titolo: "Cuore", autore: "Edmondo De Amicis", prezzo: 8.90, categoria_id: 10, descrizione: "Diario di un ragazzo italiano tra scuola, valori e amicizia." },
  { titolo: "I ragazzi della via Pál", autore: "Ferenc Molnár", prezzo: 9.60, categoria_id: 10, descrizione: "Le avventure di un gruppo di ragazzi in Budapest all'inizio del '900." },
  { titolo: "Robinson Crusoe", autore: "Daniel Defoe", prezzo: 10.50, categoria_id: 10, descrizione: "Un uomo naufraga su un'isola deserta e deve sopravvivere." },

  // 11. Avventura
  { titolo: "L'isola del tesoro", autore: "Robert Louis Stevenson", prezzo: 9.90, categoria_id: 11, descrizione: "La caccia al tesoro tra pirati e avventure in mare." },
  { titolo: "Ventimila leghe sotto i mari", autore: "Jules Verne", prezzo: 10.50, categoria_id: 11, descrizione: "Viaggio sottomarino con il misterioso Capitano Nemo." },
  { titolo: "Il richiamo della foresta", autore: "Jack London", prezzo: 9.80, categoria_id: 11, descrizione: "Un cane domestico riscopre la vita selvaggia nel Klondike." },
  { titolo: "Robinson Crusoe", autore: "Daniel Defoe", prezzo: 10.50, categoria_id: 11, descrizione: "Un uomo sopravvive su un'isola deserta e affronta le sfide della natura." },
  { titolo: "Il giro del mondo in 80 giorni", autore: "Jules Verne", prezzo: 10.20, categoria_id: 11, descrizione: "Phileas Fogg tenta di completare il giro del mondo in tempo record." },
  { titolo: "La freccia nera", autore: "Robert Louis Stevenson", prezzo: 11.00, categoria_id: 11, descrizione: "Avventure medievali tra intrighi, battaglie e misteri." },
  { titolo: "I tre moschettieri", autore: "Alexandre Dumas", prezzo: 11.50, categoria_id: 11, descrizione: "D'Artagnan e i moschettieri affrontano duelli e cospirazioni." },
  { titolo: "Il conte di Montecristo", autore: "Alexandre Dumas", prezzo: 12.00, categoria_id: 11, descrizione: "Storia di vendetta, inganno e redenzione." },
  { titolo: "Sahara", autore: "Clive Cussler", prezzo: 11.20, categoria_id: 11, descrizione: "Avventura nel deserto alla ricerca di un misterioso tesoro." },
  { titolo: "Il richiamo della foresta (ediz. italiano)", autore: "Jack London", prezzo: 9.80, categoria_id: 11, descrizione: "Un cane riscopre la vita selvaggia e la libertà." },
  { titolo: "Cuore di tenebra", autore: "Joseph Conrad", prezzo: 10.70, categoria_id: 11, descrizione: "Un viaggio sul fiume Congo e l'oscurità dell'animo umano." },
  { titolo: "La montagna incantata", autore: "Thomas Mann", prezzo: 11.90, categoria_id: 11, descrizione: "Riflessione sulla vita e la malattia in un sanatorio alpino." },

  // 12. Umoristico
  { titolo: "Il barone rampante", autore: "Italo Calvino", prezzo: 10.90, categoria_id: 12, descrizione: "Storia fantastica di un ragazzo che vive sugli alberi per ribellione." },
  { titolo: "La coscienza di Zeno", autore: "Italo Svevo", prezzo: 11.50, categoria_id: 12, descrizione: "Riflessione ironica sulla psiche e le debolezze umane." },
  { titolo: "Tre uomini in barca", autore: "Jerome K. Jerome", prezzo: 9.80, categoria_id: 12, descrizione: "Divertenti peripezie di tre amici in barca sul Tamigi." },
  { titolo: "Guida galattica per autostoppisti", autore: "Douglas Adams", prezzo: 11.30, categoria_id: 12, descrizione: "Comica avventura spaziale tra alieni e assurdità cosmiche." },
  { titolo: "Quattro sovrani dal cuor tenero", autore: "Autore sconosciuto", prezzo: 10.20, categoria_id: 12, descrizione: "Racconto umoristico su monarchi e situazioni assurde." },
  { titolo: "Il piccolo principe", autore: "Antoine de Saint-Exupéry", prezzo: 8.90, categoria_id: 12, descrizione: "Storia poetica e filosofica di un bambino viaggiatore." },
  { titolo: "Il giovane Holden", autore: "J.D. Salinger", prezzo: 9.70, categoria_id: 12, descrizione: "Avventure e riflessioni di un adolescente ribelle." },
  { titolo: "Le avventure di Pinocchio", autore: "Carlo Collodi", prezzo: 11.00, categoria_id: 12, descrizione: "Il burattino di legno che sogna di diventare un bambino vero." },
  { titolo: "Il visconte dimezzato", autore: "Italo Calvino", prezzo: 10.50, categoria_id: 12, descrizione: "Racconto ironico di un nobile diviso in due parti opposte." },
  { titolo: "Mai dire gol", autore: "Autore sconosciuto", prezzo: 12.40, categoria_id: 12, descrizione: "Raccolta di storie umoristiche legate al calcio." },
  { titolo: "La parmigiana", autore: "Autore sconosciuto", prezzo: 9.60, categoria_id: 12, descrizione: "Racconto comico e leggero sulle dinamiche familiari." },
  { titolo: "Eppure cadiamo felici", autore: "Autore sconosciuto", prezzo: 11.20, categoria_id: 12, descrizione: "Storie brevi e ironiche sulla vita quotidiana." },

  // 13. Psicologico
  { titolo: "Il giovane Holden", autore: "J.D. Salinger", prezzo: 9.70, categoria_id: 13, descrizione: "Riflessioni e conflitti interiori di un adolescente ribelle." },
  { titolo: "IT", autore: "Stephen King", prezzo: 12.50, categoria_id: 13, descrizione: "Un clown malvagio incarna le paure e ossessioni di una città." },
  { titolo: "La coscienza di Zeno", autore: "Italo Svevo", prezzo: 11.50, categoria_id: 13, descrizione: "Analisi ironica della psiche e dei comportamenti umani." },
  { titolo: "Le città invisibili", autore: "Italo Calvino", prezzo: 10.90, categoria_id: 13, descrizione: "Viaggio immaginario tra città surreali e riflessioni filosofiche." },
  { titolo: "Il deserto dei Tartari", autore: "Dino Buzzati", prezzo: 11.20, categoria_id: 13, descrizione: "Attesa e tensione nella vita di un soldato isolato." },
  { titolo: "Zeno Cosini racconta", autore: "Italo Svevo", prezzo: 10.50, categoria_id: 13, descrizione: "Storia psicologica e ironica di un uomo e le sue nevrosi." },
  { titolo: "La campana di vetro", autore: "Sylvia Plath", prezzo: 12.00, categoria_id: 13, descrizione: "La lotta di una giovane donna con depressione e aspettative sociali." },
  { titolo: "Il buio oltre la siepe", autore: "Harper Lee", prezzo: 11.30, categoria_id: 13, descrizione: "Riflessione sulla giustizia e l'innocenza nell'America segregazionista." },
  { titolo: "La strada", autore: "Cormac McCarthy", prezzo: 10.80, categoria_id: 13, descrizione: "Un padre e un figlio sopravvivono in un mondo post-apocalittico." },
  { titolo: "Norwegian Wood", autore: "Haruki Murakami", prezzo: 10.90, categoria_id: 13, descrizione: "Amore, perdita e depressione in una storia delicata e intensa." },
  { titolo: "Morte e vita delle grandi città", autore: "Jane Jacobs", prezzo: 9.60, categoria_id: 13, descrizione: "Analisi sociologica sulla vita urbana e le dinamiche cittadine." },
  { titolo: "La nausea", autore: "Jean-Paul Sartre", prezzo: 10.20, categoria_id: 13, descrizione: "Riflessione esistenziale e alienazione in una società moderna." },

  // 14. Distopico
  { titolo: "1984", autore: "George Orwell", prezzo: 9.90, categoria_id: 14, descrizione: "Un regime totalitario controlla ogni aspetto della vita dei cittadini." },
  { titolo: "Il mondo nuovo", autore: "Aldous Huxley", prezzo: 11.00, categoria_id: 14, descrizione: "Società futuristica basata su ingegneria genetica e controllo sociale." },
  { titolo: "Fahrenheit 451", autore: "Ray Bradbury", prezzo: 10.50, categoria_id: 14, descrizione: "In un futuro in cui i libri sono proibiti, un pompiere diventa ribelle." },
  { titolo: "Il racconto dell'ancella", autore: "Margaret Atwood", prezzo: 12.40, categoria_id: 14, descrizione: "Una donna vive in una società oppressiva e patriarcale." },
  { titolo: "La svastica sul sole", autore: "Philip K. Dick", prezzo: 10.80, categoria_id: 14, descrizione: "Storia alternativa in cui le potenze dell'Asse vincono la Seconda Guerra Mondiale." },

  // 15. Poesie
  { titolo: "Divina Commedia", autore: "Dante Alighieri", prezzo: 12.00, categoria_id: 15, descrizione: "Il poema epico sulla vita ultraterrena tra Inferno, Purgatorio e Paradiso." },
  { titolo: "Foglie d'erba", autore: "Walt Whitman", prezzo: 10.50, categoria_id: 15, descrizione: "Celebrazione della vita, natura e libertà dell'individuo." },
  { titolo: "Le rime", autore: "Francesco Petrarca", prezzo: 9.80, categoria_id: 15, descrizione: "Raccolta poetica di amore, bellezza e sentimento." },
  { titolo: "L'infinito", autore: "Giacomo Leopardi", prezzo: 8.50, categoria_id: 15, descrizione: "Riflessione poetica sull'infinito e la natura." },
  { titolo: "Canto notturno di un pastore errante dell'Asia", autore: "Giacomo Leopardi", prezzo: 9.20, categoria_id: 15, descrizione: "Dialogo filosofico e poetico sul destino e la vita." },
  { titolo: "Odi a un usignolo", autore: "John Keats", prezzo: 10.00, categoria_id: 15, descrizione: "Elegie e riflessioni poetiche sulla bellezza e la morte." },
  { titolo: "Amore e Psiche", autore: "Apuleio", prezzo: 11.00, categoria_id: 15, descrizione: "Racconto poetico mitologico sull'amore e le prove del destino." },
  { titolo: "Il sabato del villaggio", autore: "Giacomo Leopardi", prezzo: 8.80, categoria_id: 15, descrizione: "Riflessioni poetiche sulla vita quotidiana e i piccoli piaceri." },


];

async function seed() {
  try {
    // Pulizia tabelle
    await db.execute("DELETE FROM libri");
    await db.execute("DELETE FROM categorie");

    // Reset ID auto_increment
    await db.execute("ALTER TABLE libri AUTO_INCREMENT = 1");
    await db.execute("ALTER TABLE categorie AUTO_INCREMENT = 1");

    // Inserisci categorie
    for (const cat of categorie) {
      await db.execute(
        "INSERT INTO categorie (nome, descrizione) VALUES (?, ?)",
        [cat.nome, cat.descrizione]
      );
    }

    // Inserisci libri
    for (const libro of libri) {
      await db.execute(
        "INSERT INTO libri (titolo, autore, prezzo, categoria_id, descrizione) VALUES (?, ?, ?, ?, ?)",
        [libro.titolo, libro.autore, libro.prezzo, libro.categoria_id, libro.descrizione]
      );
    }

    console.log("Dati iniziali caricati con successo!");
    process.exit();
  } catch (err) {
    console.error("Errore inserimento:", err);
    process.exit(1);
  }
}

seed();
