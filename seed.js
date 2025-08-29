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
  { nome: "Romanzo rosa", descrizione: "Romanzi romantici" },
  { nome: "Storico", descrizione: "Libri di storia e romanzi storici" },
  { nome: "Horror", descrizione: "Libri horror" },
  { nome: "Biografie", descrizione: "Biografie e autobiografie" },
  { nome: "Young Adult", descrizione: "Libri per giovani adulti" },
  { nome: "Classici", descrizione: "Libri classici della letteratura" },
  { nome: "Avventura", descrizione: "Libri di avventura e viaggi" },
  { nome: "Umoristico", descrizione: "Libri divertenti e satirici" },
  { nome: "Psicologico", descrizione: "Libri di narrativa psicologica" },
  { nome: "Distopico", descrizione: "Romanzi distopici e futuristici" },
  { nome: "Poesia", descrizione: "Raccolte di poesie classiche e moderne" },
  { nome: "Novità", descrizione: "Libri pubblicati di recente"}

];

// Elenco libri
const libri = [
  // 1. Narrativa
  { titolo: "Il cacciatore di aquiloni", autore: "Khaled Hosseini", prezzo: 12.99, categoria_id: 1, descrizione: "Un romanzo che esplora amicizia, tradimento e redenzione in Afghanistan.", img: "https://www.ibs.it/images/9788807070600_0_0_0_350_75.jpg" },
  { titolo: "La solitudine dei numeri primi", autore: "Paolo Giordano", prezzo: 9.99, categoria_id: 1, descrizione: "Due vite segnate da traumi infantili e dal difficile rapporto con il mondo.", img: "https://www.ibs.it/images/9788804666639_0_0_0_350_75.jpg" },
  { titolo: "Storia di una ladra di libri", autore: "Markus Zusak", prezzo: 14.50, categoria_id: 1, descrizione: "Durante la Seconda Guerra Mondiale, una giovane ragazza ruba libri e condivide storie.", img: "https://www.ibs.it/images/8010312109614_0_0_0_350_75.jpg" },
  { titolo: "Le otto montagne", autore: "Paolo Cognetti", prezzo: 11.90, categoria_id: 1, descrizione: "La storia di un'amicizia e della ricerca di sé tra le montagne italiane.", img: "https://www.ibs.it/images/9788806239831_0_0_0_350_75.jpg" },
  { titolo: "L'amica geniale", autore: "Elena Ferrante", prezzo: 10.99, categoria_id: 1, descrizione: "La complessa amicizia tra due ragazze nella Napoli del dopoguerra.", img: "https://www.ibs.it/images/9788866320326_0_0_0_350_75.jpg" },
  { titolo: "Il nome della rosa", autore: "Umberto Eco", prezzo: 13.90, categoria_id: 1, descrizione: "Un giallo medievale che unisce mistero, filosofia e teologia.", img: "https://www.ibs.it/images/9788834603000_0_0_0_350_75.jpg" },
  { titolo: "La strada", autore: "Cormac McCarthy", prezzo: 11.40, categoria_id: 1, descrizione: "Un padre e un figlio viaggiano in un mondo post-apocalittico.", img: "https://www.ibs.it/images/9788806219369_0_0_0_350_75.jpg" },
  { titolo: "Il Gattopardo", autore: "Giuseppe Tomasi di Lampedusa", prezzo: 10.80, categoria_id: 1, descrizione: "Romanzo storico e familiare ambientato in Sicilia nell'Ottocento.", img: "https://www.ibs.it/images/9788807883828_0_0_0_350_75.jpg" },
  { titolo: "Se questo è un uomo", autore: "Primo Levi", prezzo: 9.90, categoria_id: 1, descrizione: "La testimonianza dell'autore sopravvissuto ai campi di sterminio.", img: "https://www.ibs.it/images/9788806219352_0_0_0_350_75.jpg" },
  { titolo: "La coscienza di Zeno", autore: "Italo Svevo", prezzo: 10.50, categoria_id: 1, descrizione: "Un classico che esplora nevrosi, ironia e psicanalisi.", img: "https://www.ibs.it/images/9788854165472_0_0_0_350_75.jpg" },
  { titolo: "La lunga attesa dell'angelo", autore: "Melania G. Mazzucco", prezzo: 12.30, categoria_id: 1, descrizione: "Ritratto immaginario della vita del pittore Tintoretto.", img: "https://www.ibs.it/images/9788806249144_0_0_0_350_75.jpg" },
  { titolo: "Il barone rampante", autore: "Italo Calvino", prezzo: 11.00, categoria_id: 1, descrizione: "Un ragazzo sceglie di vivere sugli alberi, tra ribellione e avventura.", img: "https://www.ibs.it/images/9788804774112_0_0_0_350_75.jpg" },

  // 2. Thriller
  { titolo: "La ragazza del treno", autore: "Paula Hawkins", prezzo: 12.99, categoria_id: 2, descrizione: "Un thriller psicologico che segue tre donne legate da un mistero.", img: "https://www.ibs.it/images/9788855446990_0_0_0_350_75.jpg" },
  { titolo: "Uomini che odiano le donne", autore: "Stieg Larsson", prezzo: 11.50, categoria_id: 2, descrizione: "Il primo capitolo della saga Millennium, tra omicidi e segreti di famiglia.", img: "https://www.ibs.it/images/9788831743358_0_0_536_0_75.jpg" },
  { titolo: "Shutter Island", autore: "Dennis Lehane", prezzo: 10.99, categoria_id: 2, descrizione: "Due agenti federali indagano sulla scomparsa di una paziente da un ospedale psichiatrico.", img: "https://www.ibs.it/images/9788850266005_0_0_0_350_75.jpg" },
  { titolo: "Il silenzio degli innocenti", autore: "Thomas Harris", prezzo: 9.99, categoria_id: 2, descrizione: "Un'agente dell'FBI cerca l'aiuto di Hannibal Lecter per catturare un serial killer.", img: "https://www.ibs.it/images/9788804716082_0_0_0_350_75.jpg" },
  { titolo: "La verità sul caso Harry Quebert", autore: "Joël Dicker", prezzo: 13.50, categoria_id: 2, descrizione: "Uno scrittore indaga sull'omicidio di una giovane donna avvenuto anni prima.", img: "https://www.ibs.it/images/9788834611852_0_0_0_350_75.jpg" },
  { titolo: "Io uccido", autore: "Giorgio Faletti", prezzo: 12.00, categoria_id: 2, descrizione: "Un serial killer annuncia i suoi omicidi durante una trasmissione radiofonica.", img: "https://www.ibs.it/images/9788834606001_0_0_0_350_75.jpg" },
  { titolo: "La psichiatra", autore: "Wulf Dorn", prezzo: 11.20, categoria_id: 2, descrizione: "Una psichiatra si trova coinvolta in un caso inquietante che mette a rischio la sua vita.", img: "https://www.ibs.it/images/9788850259113_0_0_0_350_75.jpg" },
  { titolo: "Il codice Da Vinci", autore: "Dan Brown", prezzo: 10.50, categoria_id: 2, descrizione: "Un professore di simbologia e una crittologa svelano un segreto nascosto da secoli.", img: "https://www.ibs.it/images/9788817196161_0_0_0_350_75.jpg" },
  { titolo: "Angeli e Demoni", autore: "Dan Brown", prezzo: 10.50, categoria_id: 2, descrizione: "Un'avventura tra scienza e religione per sventare un attentato al Vaticano.", img: "https://www.ibs.it/images/9788817196192_0_0_0_350_75.jpg" },
  { titolo: "Nessuno si salva da solo", autore: "Margaret Mazzantini", prezzo: 9.80, categoria_id: 2, descrizione: "La storia intensa di una coppia che affronta la fine del loro amore.", img: "https://www.ibs.it/images/9788804728535_0_0_0_350_75.jpg" },
  { titolo: "L'ipotesi del male", autore: "Donato Carrisi", prezzo: 11.00, categoria_id: 2, descrizione: "Un'indagine che scava nei lati più oscuri della mente umana.", img: "https://www.ibs.it/images/9788850235773_0_0_0_350_75.jpg" },
  { titolo: "Il tribunale delle anime", autore: "Donato Carrisi", prezzo: 11.00, categoria_id: 2, descrizione: "Un investigatore e una fotografa forense si muovono tra segreti e delitti a Roma.", img: "https://www.ibs.it/images/9788850233960_0_0_0_350_75.jpg" },

  // 3. Fantascienza
  { titolo: "Dune", autore: "Frank Herbert", prezzo: 14.99, categoria_id: 3, descrizione: "Un'epica saga di potere, ecologia e destino ambientata sul pianeta Arrakis.", img: "https://www.ibs.it/images/9788834739679_0_0_0_350_75.jpg" },
  { titolo: "Fondazione", autore: "Isaac Asimov", prezzo: 12.50, categoria_id: 3, descrizione: "La storia della caduta e rinascita di un impero galattico.", img: "https://www.ibs.it/images/9788804730392_0_0_0_350_75.jpg" },
  { titolo: "Neuromante", autore: "William Gibson", prezzo: 10.99, categoria_id: 3, descrizione: "Il romanzo che ha definito il genere cyberpunk.", img: "https://www.ibs.it/images/9788804752233_0_0_0_350_75.jpg" },
  { titolo: "Hyperion", autore: "Dan Simmons", prezzo: 13.20, categoria_id: 3, descrizione: "Un pellegrinaggio verso un misterioso essere chiamato lo Shrike.", img: "https://www.ibs.it/images/9788834727119_0_0_0_350_75.jpg" },
  { titolo: "Snow Crash", autore: "Neal Stephenson", prezzo: 11.50, categoria_id: 3, descrizione: "Un'avventura cyberpunk tra realtà virtuale e antiche lingue.", img: "https://www.ibs.it/images/9788835732419_0_0_0_350_75.jpg" },
  { titolo: "La mano sinistra del buio", autore: "Ursula K. Le Guin", prezzo: 10.80, categoria_id: 3, descrizione: "Un'ambasciatrice esplora un pianeta dove il genere è fluido.", img: "https://www.ibs.it/images/9788804732051_0_0_0_350_75.jpg" },
  { titolo: "Solaris", autore: "Stanisław Lem", prezzo: 9.90, categoria_id: 3, descrizione: "Un pianeta oceanico mette alla prova la mente e le emozioni degli scienziati.", img: "https://www.ibs.it/images/9788838929106_0_0_0_350_75.jpg" },
  { titolo: "La guerra dei mondi", autore: "H.G. Wells", prezzo: 8.99, categoria_id: 3, descrizione: "Il classico racconto dell'invasione marziana della Terra.", img: "https://www.ibs.it/images/9788807904301_0_0_0_350_75.jpg" },
  { titolo: "Ubik", autore: "Philip K. Dick", prezzo: 10.50, categoria_id: 3, descrizione: "Un thriller metafisico che sfida la percezione della realtà.", img: "https://www.ibs.it/images/9788804731481_0_0_0_350_75.jpg" },
  { titolo: "Il problema dei tre corpi", autore: "Liu Cixin", prezzo: 12.80, categoria_id: 3, descrizione: "Un contatto alieno mette in moto eventi che cambieranno il destino dell'umanità.", img: "https://www.ibs.it/images/9788804756187_0_0_0_350_75.jpg" },
  { titolo: "Fahrenheit 451", autore: "Ray Bradbury", prezzo: 9.50, categoria_id: 3, descrizione: "In un futuro distopico, i libri sono proibiti e bruciati dai pompieri.", img: "https://www.ibs.it/images/9788804783497_0_0_536_0_75.jpg" },
  { titolo: "L'invasione degli ultracorpi", autore: "Jack Finney", prezzo: 9.20, categoria_id: 3, descrizione: "Gli abitanti di una città vengono sostituiti da copie aliene prive di emozioni.", img: "https://www.ibs.it/images/9788889468104_0_0_0_350_75.jpg" },


  // 4. Fantasy
  { titolo: "Il signore degli anelli", autore: "J.R.R. Tolkien", prezzo: 16.99, categoria_id: 4, descrizione: "Un viaggio epico per distruggere un potente anello malvagio.", img: "https://covers.openlibrary.org/b/id/10716508-L.jpg" },
  { titolo: "Harry Potter e la Pietra Filosofale", autore: "J.K. Rowling", prezzo: 8.90, categoria_id: 4, descrizione: "Il giovane Harry scopre di essere un mago e inizia la sua avventura a Hogwarts.", img: "https://www.ibs.it/images/9788831004169_0_0_0_350_75.jpg" },
  { titolo: "Eragon", autore: "Christopher Paolini", prezzo: 10.50, categoria_id: 4, descrizione: "Un ragazzo scopre di essere l'ultimo Cavaliere dei Draghi e parte per un'avventura.", img: "https://www.ibs.it/images/9788817061629_0_0_0_350_75.jpg" },
  { titolo: "Le cronache di Narnia", autore: "C.S. Lewis", prezzo: 10.90, categoria_id: 4, descrizione: "Un mondo magico scoperto attraverso un armadio incantato.", img: "https://www.ibs.it/images/9788804806301_0_0_0_350_75.jpg" },
  { titolo: "La ruota del tempo", autore: "Robert Jordan", prezzo: 13.50, categoria_id: 4, descrizione: "Una lunga saga fantasy tra magia, destino e battaglie epiche.", img: "https://www.ibs.it/images/9788834739525_0_0_0_350_75.jpg" },
  { titolo: "Mistborn - L'Ultimo Impero", autore: "Brandon Sanderson", prezzo: 12.40, categoria_id: 4, descrizione: "Un mondo governato da un tiranno e rivoluzionari con poteri magici.", img: "https://www.ibs.it/images/9788804778769_0_0_0_350_75.jpg" },
  { titolo: "La Spada di Shannara", autore: "Terry Brooks", prezzo: 11.80, categoria_id: 4, descrizione: "Avventura fantasy classica con eroi e magie antiche.", img: "https://www.ibs.it/images/9788804726654_0_0_0_350_75.jpg" },
  { titolo: "American Gods", autore: "Neil Gaiman", prezzo: 12.00, categoria_id: 4, descrizione: "Un viaggio che intreccia dèi antichi e moderni negli USA.", img: "https://www.ibs.it/images/9788804745303_0_0_0_350_75.jpg" },
  { titolo: "La Bussola d'Oro", autore: "Philip Pullman", prezzo: 11.30, categoria_id: 4, descrizione: "Il primo volume della trilogia 'Queste Oscure Materie'.", img: "https://www.ibs.it/images/9788850267286_0_0_0_350_75.jpg" },
  { titolo: "Il Ciclo di Conan", autore: "Robert E. Howard", prezzo: 10.90, categoria_id: 4, descrizione: "Le leggendarie imprese del barbaro più famoso della letteratura.", img: "https://www.ibs.it/images/9788852077463_0_0_0_350_75.jpg" },
  { titolo: "Le cronache di Amber", autore: "Roger Zelazny", prezzo: 13.20, categoria_id: 4, descrizione: "Un mondo di intrighi, poteri e regni paralleli.", img: "https://www.ibs.it/images/9788834732922_0_0_0_350_75.jpg" },
  { titolo: "Game of thrones", autore: "George R.R. Martin", prezzo: 11.70, categoria_id: 4, descrizione: "La saga fantasy legata alle lotte per ottenere il trono di spade", img: "https://www.ibs.it/images/9788865462119_0_0_0_350_75.jpg" },

  // 5. Romanzo rosa
  { titolo: "Orgoglio e Pregiudizio", autore: "Jane Austen", prezzo: 9.90, categoria_id: 5, descrizione: "L'amore e le convenzioni sociali nell'Inghilterra del XIX secolo.", img: "https://covers.openlibrary.org/b/id/12884289-L.jpg" },
  { titolo: "Come l'acqua per il cioccolato", autore: "Laura Esquivel", prezzo: 10.50, categoria_id: 5, descrizione: "Storia d'amore e cucina, tra emozioni e tradizioni familiari.", img: "https://www.ibs.it/images/8032700998709_0_0_0_350_75.jpg" },
  { titolo: "Sogni e delitti", autore: "Lisa Kleypas", prezzo: 11.20, categoria_id: 5, descrizione: "Intrighi romantici e colpi di scena in un contesto storico elegante.", img: "https://www.ibs.it/images/9788875764586_0_0_0_350_75.jpg" },
  { titolo: "Le pagine della nostra vita", autore: "Nicholas Sparks", prezzo: 12.00, categoria_id: 5, descrizione: "Una storia d'amore intensa che supera prove e avversità.", img: "https://www.ibs.it/images/9788868360399_0_0_0_350_75.jpg" },
  { titolo: "Anna Karenina", autore: "Lev Tolstoj", prezzo: 13.50, categoria_id: 5, descrizione: "La tragedia dell'amore e della passione in una società rigida.", img: "https://www.ibs.it/images/9788807900006_0_0_0_350_75.jpg" },
  { titolo: "Il giardino segreto", autore: "Frances Hodgson Burnett", prezzo: 10.90, categoria_id: 5, descrizione: "Una ragazza scopre un giardino segreto che cambierà la sua vita.", img: "https://www.ibs.it/images/9788863113556_0_0_0_350_75.jpg" },
  { titolo: "Uno splendido disastro", autore: "Jamie McGuire", prezzo: 9.80, categoria_id: 5, descrizione: "Una storia di amore turbolento tra due giovani dal carattere opposto.", img: "https://www.ibs.it/images/9788811670131_0_0_0_350_75.jpg" },
  { titolo: "Il profumo delle foglie di limone", autore: "Clara Sanchez", prezzo: 12.40, categoria_id: 5, descrizione: "Una vicenda di ricordi e misteri legati a un amore perduto.", img: "https://covers.openlibrary.org/b/id/10834596-L.jpg" },
  { titolo: "Le coincidenze dell'amore", autore: "Jane Green", prezzo: 10.30, categoria_id: 5, descrizione: "L'incontro casuale che cambierà il destino dei protagonisti.", img: "https://www.ibs.it/images/9788833752105_0_0_0_350_75.jpg" },
  { titolo: "Ti amerò sempre, cara", autore: "Cecelia Ahern", prezzo: 14.00, categoria_id: 5, descrizione: "Una commovente storia d'amore e legami indissolubili.", img: "https://www.ibs.it/images/9788852059018_0_0_0_350_75.jpg" },
  { titolo: "La voce invisibile delle cose", autore: "Agnès Ledig", prezzo: 11.50, categoria_id: 5, descrizione: "Una giovane donna affronta il dolore e la rinascita personale.", img: "https://covers.openlibrary.org/b/id/9259435-L.jpg" },

  // 6. Storico
  { titolo: "I pilastri della terra", autore: "Ken Follett", prezzo: 14.50, categoria_id: 6, descrizione: "Costruzione di una cattedrale medievale e intrighi politici.", img: "https://www.ibs.it/images/9788804666929_0_0_0_350_75.jpg" },
  { titolo: "Il nome della rosa", autore: "Umberto Eco", prezzo: 13.90, categoria_id: 6, descrizione: "Un monaco detective indaga su misteriosi omicidi in un monastero.", img: "https://www.ibs.it/images/9788834603000_0_0_0_350_75.jpg" },
  { titolo: "Guerra e Pace", autore: "Lev Tolstoj", prezzo: 15.00, categoria_id: 6, descrizione: "Epica storia di amore e conflitto durante le guerre napoleoniche.", img: "https://www.ibs.it/images/9788811686200_0_0_0_350_75.jpg" },
  { titolo: "La caduta dei giganti", autore: "Ken Follett", prezzo: 12.80, categoria_id: 6, descrizione: "Storie intrecciate di famiglie durante la Prima Guerra Mondiale.", img: "https://www.ibs.it/images/9788804666912_0_0_0_350_75.jpg" },
  { titolo: "Il falco e la colomba", autore: "Ken Follett", prezzo: 11.50, categoria_id: 6, descrizione: "Avventure e intrighi tra nobili e popolo in epoca medievale.", img: "https://www.ibs.it/images/9788868572556_0_0_0_350_75.jpg" },
  { titolo: "Il guerriero dell'alba", autore: "Ken Follett", prezzo: 12.50, categoria_id: 6, descrizione: "Avventure e lotte di potere durante l'epoca medievale.", img: "https://www.ibs.it/images/9788864022208_0_0_0_350_75.jpg" },
  { titolo: "Il medico di corte", autore: "Ken Follett", prezzo: 13.20, categoria_id: 6, descrizione: "La storia di un medico al servizio dei potenti e dei segreti di corte.", img: "https://www.ibs.it/images/9788870911008_0_0_0_350_75.jpg" },
  { titolo: "Via col vento", autore: "Margaret Mitchell", prezzo: 12.40, categoria_id: 6, descrizione: "Romance e drammi durante la Guerra Civile Americana.", img: "https://www.ibs.it/images/9788854520264_0_0_0_350_75.jpg" },
  { titolo: "La sposa scomparsa", autore: "Ken Follett", prezzo: 10.80, categoria_id: 6, descrizione: "Intrighi, misteri e drammi nella società inglese.", img: "https://www.ibs.it/images/9788829706082_0_0_0_350_75.jpg" },
  { titolo: "La storia", autore: "Elsa Morante", prezzo: 14.00, categoria_id: 6, descrizione: "Vita di una famiglia italiana durante la Seconda Guerra Mondiale.", img: "https://www.ibs.it/images/9788806219642_0_0_0_350_75.jpg" },

  // 7. Horror
  { titolo: "Dracula", autore: "Bram Stoker", prezzo: 9.90, categoria_id: 7, descrizione: "Il celebre vampiro e la sua minaccia sull'Inghilterra vittoriana.", img: "https://www.ibs.it/images/9788807901836_0_0_0_350_75.jpg" },
  { titolo: "Frankenstein", autore: "Mary Shelley", prezzo: 8.90, categoria_id: 7, descrizione: "Uno scienziato crea una creatura che sfugge al suo controllo.", img: "https://www.ibs.it/images/9788806228644_0_0_0_350_75.jpg" },
  { titolo: "Shining", autore: "Stephen King", prezzo: 11.90, categoria_id: 7, descrizione: "Un uomo impazzisce in un hotel isolato con poteri soprannaturali.", img: "https://www.ibs.it/images/9788830110526_0_0_0_350_75.jpg" },
  { titolo: "Rosemary's Baby", autore: "Ira Levin", prezzo: 10.50, categoria_id: 7, descrizione: "Una giovane donna sospetta che il marito sia coinvolto in un culto satanico.", img: "https://www.ibs.it/images/9788869980008_0_0_0_350_75.jpg" },
  { titolo: "La casa delle belle addormentate", autore: "Yasunari Kawabata", prezzo: 9.70, categoria_id: 7, descrizione: "Riflessione sull'invecchiamento e desiderio in una casa misteriosa.", img: "https://www.ibs.it/images/9788804779469_0_0_0_350_75.jpg" },
  { titolo: "L'Esorcista", autore: "William Peter Blatty", prezzo: 11.20, categoria_id: 7, descrizione: "Una ragazza viene posseduta e un esorcismo lotta contro il male.", img: "https://www.ibs.it/images/9791256150953_0_0_0_350_75.jpg" },
  { titolo: "Pet Sematary", autore: "Stephen King", prezzo: 10.80, categoria_id: 7, descrizione: "La morte e il ritorno di persone amate con conseguenze inquietanti.", img: "https://www.ibs.it/images/9788868361259_0_0_0_350_75.jpg" },
  { titolo: "La bambina che amava Tom Gordon", autore: "Stephen King", prezzo: 10.30, categoria_id: 7, descrizione: "Una bambina persa nei boschi lotta per sopravvivere.", img: "https://www.ibs.it/images/9788868362423_0_0_0_350_75.jpg" },
  { titolo: "Cattedrale", autore: "Raymond Carver", prezzo: 9.90, categoria_id: 7, descrizione: "Racconti di vita quotidiana con un tocco inquietante e riflessivo.", img: "https://www.ibs.it/images/9788806223786_0_0_0_350_75.jpg" },
  { titolo: "L'ombra dell'angelo", autore: "Gillian Flynn", prezzo: 11.50, categoria_id: 7, descrizione: "Un thriller psicologico con tensione crescente e segreti oscuri.", img: "https://www.ibs.it/images/1230005792146_0_0_0_350_75.jpg" },
  { titolo: "La casa delle foglie", autore: "Mark Z. Danielewski", prezzo: 12.00, categoria_id: 7, descrizione: "Una casa che sfida le leggi della fisica e la sanità mentale dei suoi abitanti.", img: "https://www.ibs.it/images/9788869052736_0_0_0_350_75.jpg" },

  // 8. Biografie
  { titolo: "Steve Jobs (Isaacson)", autore: "Walter Isaacson", prezzo: 13.90, categoria_id: 8, descrizione: "Biografia del cofondatore di Apple e della sua visione rivoluzionaria.", img: "https://www.ibs.it/images/9788804680246_0_0_0_350_75.jpg" },
  { titolo: "Io sono Malala", autore: "Malala Yousafzai", prezzo: 11.50, categoria_id: 8, descrizione: "La storia della giovane attivista per il diritto all'istruzione.", img: "https://www.ibs.it/images/9788811149682_0_0_0_350_75.jpg" },
  { titolo: "La mia vita", autore: "Hilary Clinton", prezzo: 10.70, categoria_id: 8, descrizione: "Autobiografia dell'ex first lady degli Stati Uniti.", img: "https://www.ibs.it/images/9788820035310_0_0_0_350_75.jpg" },
  { titolo: "Il diario di Anne Frank", autore: "Anne Frank", prezzo: 9.80, categoria_id: 8, descrizione: "Il racconto commovente di una ragazza ebrea durante la Seconda Guerra Mondiale.", img: "https://www.ibs.it/images/9788822621375_0_0_0_350_75.jpg" },
  { titolo: "Long Walk to Freedom", autore: "Nelson Mandela", prezzo: 12.40, categoria_id: 8, descrizione: "Autobiografia di Nelson Mandela e della lotta contro l'apartheid.", img: "https://www.ibs.it/images/9781447258582_0_0_0_350_75.jpg" },
  { titolo: "Becoming", autore: "Michelle Obama", prezzo: 11.90, categoria_id: 8, descrizione: "La storia dell'ex first lady degli Stati Uniti e del suo percorso personale.", img: "https://www.ibs.it/images/9788811149866_0_0_0_350_75.jpg" },
  { titolo: "Io, Ibra", autore: "Ibra Z.", prezzo: 10.30, categoria_id: 8, descrizione: "Memorie di una vita tra sfide personali e crescita interiore.", img: "https://www.ibs.it/images/9788817070324_0_0_0_350_75.jpg" },
  { titolo: "La mia Africa", autore: "Karen Blixen", prezzo: 11.00, categoria_id: 8, descrizione: "Esperienze vissute in Africa raccontate con passione e poesia.", img: "https://www.ibs.it/images/9788807886393_0_0_0_350_75.jpg" },
  { titolo: "Educated", autore: "Tara Westover", prezzo: 12.20, categoria_id: 8, descrizione: "Autobiografia di una donna cresciuta senza istruzione formale che riesce a laurearsi.", img: "https://www.ibs.it/images/9781473538641_0_0_0_350_75.jpg" },
  { titolo: "La lunga strada verso la libertà", autore: "Nelson Mandela", prezzo: 13.50, categoria_id: 8, descrizione: "La lotta di Mandela per la libertà e la giustizia in Sudafrica.", img: "https://www.ibs.it/images/9788807170003_0_0_0_350_75.jpg" },
  { titolo: "Unbroken", autore: "Laura Hillenbrand", prezzo: 12.00, categoria_id: 8, descrizione: "La straordinaria storia di resilienza di un aviatore della Seconda Guerra Mondiale.", img: "https://www.ibs.it/images/9788804657026_0_0_0_350_75.jpg" },
  { titolo: "La principessa Diana (Philip Norman)", autore: "Philip Norman", prezzo: 10.90, categoria_id: 8, descrizione: "Biografia della principessa del popolo e della sua vita privata.", img: "https://www.ibs.it/images/9788822761736_0_0_536_0_75.jpg" },

  // 9. Young Adult
  { titolo: "Hunger Games", autore: "Suzanne Collins", prezzo: 11.50, categoria_id: 9, descrizione: "Katniss lotta per sopravvivere in un futuro distopico.", img: "https://www.ibs.it/images/9788804780403_0_0_0_350_75.jpg" },
  { titolo: "Divergent", autore: "Veronica Roth", prezzo: 10.90, categoria_id: 9, descrizione: "Una società divisa per fazioni e la ribellione di una giovane donna.", img: "https://www.ibs.it/images/9788841878217_0_0_0_350_75.jpg" },
  { titolo: "Colpa delle stelle", autore: "John Green", prezzo: 9.80, categoria_id: 9, descrizione: "Storia romantica e struggente di due ragazzi malati di cancro.", img: "https://www.ibs.it/images/9788817094368_0_0_0_350_75.jpg" },
  { titolo: "Maze Runner", autore: "James Dashner", prezzo: 11.00, categoria_id: 9, descrizione: "Un ragazzo si sveglia in un labirinto senza ricordi e cerca la via d'uscita.", img: "https://www.ibs.it/images/9788834739686_0_0_0_350_75.jpg" },
  { titolo: "Percy Jackson e gli dei dell'Olimpo", autore: "Rick Riordan", prezzo: 12.40, categoria_id: 9, descrizione: "Percy scopre di essere un semidio e affronta avventure mitologiche.", img: "https://www.ibs.it/images/9788804734161_0_0_0_350_75.jpg" },
  { titolo: "Looking for Alaska", autore: "John Green", prezzo: 10.20, categoria_id: 9, descrizione: "Un ragazzo cerca di capire l'amicizia e l'amore durante il liceo.", img: "https://www.ibs.it/images/9780007424832_0_0_0_350_75.jpg" },
  { titolo: "Città di Carta", autore: "John Green", prezzo: 10.50, categoria_id: 9, descrizione: "Un giovane ragazzo indaga sulla scomparsa della vicina di casa.", img: "https://www.ibs.it/images/9788817119702_0_0_0_350_75.jpg" },
  { titolo: "Shadowhunters - Città di Ossa", autore: "Cassandra Clare", prezzo: 10.90, categoria_id: 9, descrizione: "Avventure di cacciatori di demoni in una New York segreta e magica.", img: "https://www.ibs.it/images/9788804716624_0_0_0_350_75.jpg" },
  { titolo: "Eleanor & Park", autore: "Rainbow Rowell", prezzo: 9.70, categoria_id: 9, descrizione: "Una storia d'amore adolescenziale tra due ragazzi emarginati.", img: "https://www.ibs.it/images/9788868368173_0_0_0_350_75.jpg" },
  { titolo: "Aristotle and Dante Discover the Secrets of the Universe", autore: "Benjamin Alire Sáenz", prezzo: 12.90, categoria_id: 9, descrizione: "Due ragazzi scoprono l'amicizia e l'identità personale.", img: "https://www.ibs.it/images/9781442408944_0_0_0_350_75.jpg" },

  // 10. Classici
  { titolo: "I promessi sposi", autore: "Alessandro Manzoni", prezzo: 8.50, categoria_id: 10, descrizione: "La storia di Renzo e Lucia nell'Italia del Seicento.", img: "https://covers.openlibrary.org/b/id/12758624-L.jpg" },
  { titolo: "Divina Commedia", autore: "Dante Alighieri", prezzo: 7.90, categoria_id: 10, descrizione: "Il viaggio di Dante attraverso Inferno, Purgatorio e Paradiso.", img: "https://covers.openlibrary.org/b/id/14651444-L.jpg" },
  { titolo: "Odyssey", autore: "Omero", prezzo: 10.00, categoria_id: 10, descrizione: "Le avventure di Ulisse nel suo lungo viaggio di ritorno a casa.", img: "https://covers.openlibrary.org/b/id/9817640-L.jpg" },
  { titolo: "Iliade", autore: "Omero", prezzo: 10.00, categoria_id: 10, descrizione: "Epopea della guerra di Troia e degli eroi dell'epoca.", img: "https://covers.openlibrary.org/b/id/5989831-L.jpg" },
  { titolo: "Madame Bovary", autore: "Gustave Flaubert", prezzo: 9.80, categoria_id: 10, descrizione: "Tragedia di una donna insoddisfatta della vita matrimoniale.", img: "https://covers.openlibrary.org/b/id/8316889-L.jpg" },
  { titolo: "Moby Dick", autore: "Herman Melville", prezzo: 11.50, categoria_id: 10, descrizione: "La caccia ossessiva della balena bianca da parte del capitano Ahab.", img: "https://covers.openlibrary.org/b/id/10089516-L.jpg" },
  { titolo: "Guerra dei mondi", autore: "H.G. Wells", prezzo: 9.70, categoria_id: 10, descrizione: "Invasione aliena della Terra raccontata con suspense e fantascienza.", img: "https://covers.openlibrary.org/b/id/14821280-L.jpg" },
  { titolo: "Il ritratto di Dorian Gray", autore: "Oscar Wilde", prezzo: 10.20, categoria_id: 10, descrizione: "Un uomo resta eternamente giovane mentre il suo ritratto invecchia.", img: "https://covers.openlibrary.org/b/id/14314462-L.jpg" },
  { titolo: "Anna Karenina (classico)", autore: "Lev Tolstoj", prezzo: 11.00, categoria_id: 10, descrizione: "Tragedia e passione nella società russa del XIX secolo.", img: "https://covers.openlibrary.org/b/id/12164250-L.jpg" },
  { titolo: "Cuore", autore: "Edmondo De Amicis", prezzo: 8.90, categoria_id: 10, descrizione: "Diario di un ragazzo italiano tra scuola, valori e amicizia.", img: "https://covers.openlibrary.org/b/id/8242318-M.jpg" },
  { titolo: "I ragazzi della via Pál", autore: "Ferenc Molnár", prezzo: 9.60, categoria_id: 10, descrizione: "Le avventure di un gruppo di ragazzi in Budapest all'inizio del '900.", img: "https://covers.openlibrary.org/b/id/15106078-M.jpg" },
  { titolo: "Robinson Crusoe", autore: "Daniel Defoe", prezzo: 10.50, categoria_id: 10, descrizione: "Un uomo naufraga su un'isola deserta e deve sopravvivere.", img: "https://covers.openlibrary.org/b/id/5904934-M.jpg" },

  // 11. Avventura
  { titolo: "L'isola del tesoro", autore: "Robert Louis Stevenson", prezzo: 9.90, categoria_id: 11, descrizione: "La caccia al tesoro tra pirati e avventure in mare.", img: "https://www.ibs.it/images/9788806226589_0_0_0_350_75.jpg" },
  { titolo: "Ventimila leghe sotto i mari", autore: "Jules Verne", prezzo: 10.50, categoria_id: 11, descrizione: "Viaggio sottomarino con il misterioso Capitano Nemo.", img: "https://www.ibs.it/images/9788807902901_0_0_0_350_75.jpg" },
  { titolo: "Il richiamo della foresta", autore: "Jack London", prezzo: 9.80, categoria_id: 11, descrizione: "Un cane domestico riscopre la vita selvaggia nel Klondike.", img: "https://www.ibs.it/images/9788806230814_0_0_0_350_75.jpg" },
  { titolo: "Robinson Crusoe", autore: "Daniel Defoe", prezzo: 10.50, categoria_id: 11, descrizione: "Un uomo sopravvive su un'isola deserta e affronta le sfide della natura.", img: "https://www.ibs.it/images/9788807900181_0_0_0_350_75.jpg" },
  { titolo: "Il giro del mondo in 80 giorni", autore: "Jules Verne", prezzo: 10.20, categoria_id: 11, descrizione: "Phileas Fogg tenta di completare il giro del mondo in tempo record.", img: "https://www.ibs.it/images/9788807900808_0_0_0_350_75.jpg" },
  { titolo: "La freccia nera", autore: "Robert Louis Stevenson", prezzo: 11.00, categoria_id: 11, descrizione: "Avventure medievali tra intrighi, battaglie e misteri.", img: "https://www.ibs.it/images/9788807902444_0_0_0_350_75.jpg" },
  { titolo: "I tre moschettieri", autore: "Alexandre Dumas", prezzo: 11.50, categoria_id: 11, descrizione: "D'Artagnan e i moschettieri affrontano duelli e cospirazioni.", img: "https://www.ibs.it/images/9788817106979_0_0_0_350_75.jpg" },
  { titolo: "Il conte di Montecristo", autore: "Alexandre Dumas", prezzo: 12.00, categoria_id: 11, descrizione: "Storia di vendetta, inganno e redenzione.", img: "https://www.ibs.it/images/9788806225186_0_0_0_350_75.jpg" },
  { titolo: "Sahara", autore: "Clive Cussler", prezzo: 11.20, categoria_id: 11, descrizione: "Avventura nel deserto alla ricerca di un misterioso tesoro.", img: "https://www.ibs.it/images/2570040348977_0_0_0_350_75.jpg" },
  { titolo: "Cuore di tenebra", autore: "Joseph Conrad", prezzo: 10.70, categoria_id: 11, descrizione: "Un viaggio sul fiume Congo e l'oscurità dell'animo umano.", img: "https://www.ibs.it/images/9788807900167_0_0_0_350_75.jpg" },
  { titolo: "La montagna incantata", autore: "Thomas Mann", prezzo: 11.90, categoria_id: 11, descrizione: "Riflessione sulla vita e la malattia in un sanatorio alpino.", img: "https://www.ibs.it/images/9788867009466_0_0_0_350_75.jpg" },

  // 12. Umoristico
  { titolo: "Il barone rampante", autore: "Italo Calvino", prezzo: 10.90, categoria_id: 12, descrizione: "Storia fantastica di un ragazzo che vive sugli alberi per ribellione.", img: "https://www.ibs.it/images/9788804774112_0_0_0_350_75.jpg" },
  { titolo: "La coscienza di Zeno", autore: "Italo Svevo", prezzo: 11.50, categoria_id: 12, descrizione: "Riflessione ironica sulla psiche e le debolezze umane.", img: "https://covers.openlibrary.org/b/id/5406162-M.jpg" },
  { titolo: "Tre uomini in barca", autore: "Jerome K. Jerome", prezzo: 9.80, categoria_id: 12, descrizione: "Divertenti peripezie di tre amici in barca sul Tamigi.", img: "https://www.ibs.it/images/9788817150361_0_0_0_350_75.jpg" },
  { titolo: "Guida galattica per autostoppisti", autore: "Douglas Adams", prezzo: 11.30, categoria_id: 12, descrizione: "Comica avventura spaziale tra alieni e assurdità cosmiche.", img: "https://www.ibs.it/images/9788804666851_0_0_0_350_75.jpg" },
  { titolo: "Il piccolo principe", autore: "Antoine de Saint-Exupéry", prezzo: 8.90, categoria_id: 12, descrizione: "Storia poetica e filosofica di un bambino viaggiatore.", img: "https://www.ibs.it/images/9788854172388_0_0_0_350_75.jpg" },
  { titolo: "Il giovane Holden", autore: "J.D. Salinger", prezzo: 9.70, categoria_id: 12, descrizione: "Avventure e riflessioni di un adolescente ribelle.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdbMTfSC9KGfbq1w6XqGx7iPlAGs4orp5U8hQhLUallVES1QXN" },
  { titolo: "Le avventure di Pinocchio", autore: "Carlo Collodi", prezzo: 11.00, categoria_id: 12, descrizione: "Il burattino di legno che sogna di diventare un bambino vero.", img: "https://www.ibs.it/images/9788807901119_0_0_0_350_75.jpg" },
  { titolo: "Il visconte dimezzato", autore: "Italo Calvino", prezzo: 10.50, categoria_id: 12, descrizione: "Racconto ironico di un nobile diviso in due parti opposte.", img: "https://www.ibs.it/images/9788804772729_0_0_0_350_75.jpg" },
  { titolo: "Eppure cadiamo felici", autore: "Autore sconosciuto", prezzo: 11.20, categoria_id: 12, descrizione: "Storie brevi e ironiche sulla vita quotidiana.", img: "https://www.ibs.it/images/9788811011583_0_0_0_350_75.jpg" },

  // 13. Psicologico
  { titolo: "Il giovane Holden", autore: "J.D. Salinger", prezzo: 9.70, categoria_id: 13, descrizione: "Riflessioni e conflitti interiori di un adolescente ribelle.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdbMTfSC9KGfbq1w6XqGx7iPlAGs4orp5U8hQhLUallVES1QXN" },
  { titolo: "IT", autore: "Stephen King", prezzo: 12.50, categoria_id: 13, descrizione: "Un clown malvagio incarna le paure e ossessioni di una città.", img: "https://covers.openlibrary.org/b/id/14420464-M.jpg" },
  { titolo: "La coscienza di Zeno", autore: "Italo Svevo", prezzo: 11.50, categoria_id: 13, descrizione: "Analisi ironica della psiche e dei comportamenti umani.", img: "https://covers.openlibrary.org/b/id/5406162-M.jpg" },
  { titolo: "Le città invisibili", autore: "Italo Calvino", prezzo: 10.90, categoria_id: 13, descrizione: "Viaggio immaginario tra città surreali e riflessioni filosofiche.", img: "https://covers.openlibrary.org/b/id/9063085-M.jpg" },
  { titolo: "Il deserto dei Tartari", autore: "Dino Buzzati", prezzo: 11.20, categoria_id: 13, descrizione: "Attesa e tensione nella vita di un soldato isolato.", img: "https://covers.openlibrary.org/b/id/1048984-M.jpg" },
  { titolo: "La campana di vetro", autore: "Sylvia Plath", prezzo: 12.00, categoria_id: 13, descrizione: "La lotta di una giovane donna con depressione e aspettative sociali.", img: "https://covers.openlibrary.org/b/id/8181206-M.jpg" },
  { titolo: "Il buio oltre la siepe", autore: "Harper Lee", prezzo: 11.30, categoria_id: 13, descrizione: "Riflessione sulla giustizia e l'innocenza nell'America segregazionista.", img: "https://covers.openlibrary.org/b/id/7083647-M.jpg" },
  { titolo: "La strada", autore: "Cormac McCarthy", prezzo: 10.80, categoria_id: 13, descrizione: "Un padre e un figlio sopravvivono in un mondo post-apocalittico.", img: "https://covers.openlibrary.org/b/id/9249844-M.jpg" },
  { titolo: "Norwegian Wood", autore: "Haruki Murakami", prezzo: 10.90, categoria_id: 13, descrizione: "Amore, perdita e depressione in una storia delicata e intensa.", img: "https://covers.openlibrary.org/b/id/13436625-M.jpg" },
  { titolo: "Morte e vita delle grandi città", autore: "Jane Jacobs", prezzo: 9.60, categoria_id: 13, descrizione: "Analisi sociologica sulla vita urbana e le dinamiche cittadine.", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSmLtl54tF54OAJrffNkCg_49gP1K4zitSyICpYAFaCXa0-glvBnab_sG4Iax9cgvusc3tiRmNfvo-j4jeez7DTNbxCHGbKcltHtFaUapE&usqp=CAc" },
  { titolo: "La nausea", autore: "Jean-Paul Sartre", prezzo: 10.20, categoria_id: 13, descrizione: "Riflessione esistenziale e alienazione in una società moderna.", img: "https://covers.openlibrary.org/b/id/7104813-M.jpg" },

  // 14. Distopico
  { titolo: "1984", autore: "George Orwell", prezzo: 9.90, categoria_id: 14, descrizione: "Un regime totalitario controlla ogni aspetto della vita dei cittadini.", img: "https://covers.openlibrary.org/b/id/12454965-M.jpg" },
  { titolo: "Il mondo nuovo", autore: "Aldous Huxley", prezzo: 11.00, categoria_id: 14, descrizione: "Società futuristica basata su ingegneria genetica e controllo sociale.", img: "https://www.ibs.it/images/9788804735823_0_0_536_0_75.jpg" },
  { titolo: "Fahrenheit 451", autore: "Ray Bradbury", prezzo: 10.50, categoria_id: 14, descrizione: "In un futuro in cui i libri sono proibiti, un pompiere diventa ribelle.", img: "https://www.ibs.it/images/9788804783497_0_0_536_0_75.jpg" },
  { titolo: "Il racconto dell'ancella", autore: "Margaret Atwood", prezzo: 12.40, categoria_id: 14, descrizione: "Una donna vive in una società oppressiva e patriarcale.", img: "https://www.ibs.it/images/9788833312255_0_0_536_0_75.jpg" },
  { titolo: "La svastica sul sole", autore: "Philip K. Dick", prezzo: 10.80, categoria_id: 14, descrizione: "Storia alternativa in cui le potenze dell'Asse vincono la Seconda Guerra Mondiale.", img: "https://www.ibs.it/images/9788834738955_0_0_0_350_75.jpg" },

  // 15. Poesie
  { titolo: "Divina Commedia", autore: "Dante Alighieri", prezzo: 12.00, categoria_id: 15, descrizione: "Il poema epico sulla vita ultraterrena tra Inferno, Purgatorio e Paradiso.", img: "https://covers.openlibrary.org/b/id/14651444-L.jpg" },
  { titolo: "Foglie d'erba", autore: "Walt Whitman", prezzo: 10.50, categoria_id: 15, descrizione: "Celebrazione della vita, natura e libertà dell'individuo.", img: "https://covers.openlibrary.org/b/id/12773021-M.jpg" },
  { titolo: "Il Canzoniere", autore: "Francesco Petrarca", prezzo: 9.80, categoria_id: 15, descrizione: "Raccolta poetica di amore, bellezza e sentimento.", img: "https://books.google.it/books/content?id=9KYZAAAAYAAJ&hl=it&pg=PP7&img=1&zoom=3&bul=1&sig=ACfU3U18G1mwb9fsxw3xcyNLPbxpFlxO1w&w=1025" },
  { titolo: "L'infinito", autore: "Giacomo Leopardi", prezzo: 8.50, categoria_id: 15, descrizione: "Riflessione poetica sull'infinito e la natura.", img: "https://www.ibs.it/images/9788894818918_0_0_536_0_75.jpg" },
  { titolo: "Canto notturno di un pastore errante dell'Asia", autore: "Giacomo Leopardi", prezzo: 9.20, categoria_id: 15, descrizione: "Dialogo filosofico e poetico sul destino e la vita.", img: "https://www.ibs.it/images/2560350082159_0_0_0_350_75.jpg" },
  { titolo: "Odi a un usignolo", autore: "John Keats", prezzo: 10.00, categoria_id: 15, descrizione: "Elegie e riflessioni poetiche sulla bellezza e la morte.", img: "https://www.ibs.it/images/9788899274368_0_0_0_350_75.jpg" },
  { titolo: "Amore e Psiche", autore: "Apuleio", prezzo: 11.00, categoria_id: 15, descrizione: "Racconto poetico mitologico sull'amore e le prove del destino.", img: "https://www.ibs.it/images/9788807903588_0_0_0_350_75.jpg" },
  { titolo: "Il sabato del villaggio", autore: "Giacomo Leopardi", prezzo: 8.80, categoria_id: 15, descrizione: "Riflessioni poetiche sulla vita quotidiana e i piccoli piaceri.", img: "https://www.ibs.it/images/9788894834116_0_0_0_350_75.jpg" },

  // 16. Novità
  { titolo: "L'eco del futuro", autore: "Giulia Rossi", prezzo: 14.90, categoria_id: 16, descrizione: "Un viaggio nel tempo tra misteri e colpi di scena.", img: "https://www.ibs.it/images/9788882158156_0_0_0_350_75.jpg" },
  { titolo: "Ombre nella nebbia", autore: "Marco Bianchi", prezzo: 13.50, categoria_id: 16, descrizione: "Un thriller mozzafiato ambientato nella Venezia contemporanea.", img: "https://img2.libreriauniversitaria.it/BIT/500/140/9788868921408.jpg" },
  { titolo: "Sogni di carta", autore: "Sara Conti", prezzo: 13.20, categoria_id: 16, descrizione: "Romanzo emozionante sul potere dei libri e dei sogni.", img: "https://www.bertonieditore.com/shop/790-large_default/sogni-di-carta.jpg" },
  { titolo: "Voci lontane", autore: "Francesca Galli", prezzo: 13.00, categoria_id: 16, descrizione: "Racconto di memorie e segreti di famiglia.", img: "https://www.baimaronchetti.it/wp-content/uploads/2025/04/Voci-lontane.jpg" },
  { titolo: "Notte infinita", autore: "Romano Battaglia", prezzo: 14.00, categoria_id: 16, descrizione: "Un romanzo noir che sfida ogni aspettativa.", img: "https://www.ibs.it/images/9788817204248_0_0_536_0_75.jpg" },
  { titolo: "L'ombra della luna", autore: "Martina Ferri", prezzo: 13.40, categoria_id: 16, descrizione: "Avventura e mistero sotto cieli notturni.", img: "https://books.google.it/books/publisher/content?id=GCLlCQAAQBAJ&hl=it&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U37_iWd5-7EZO5tWfX3SkiDp3mwzQ&w=1280" },
  { titolo: "Onde di vetro", autore: "Chiara Moretti", prezzo: 13.60, categoria_id: 16, descrizione: "Romanzo contemporaneo con colpi di scena inattesi.", img: "https://www.ibs.it/images/9788869211973_0_0_0_350_75.jpg" },
  { titolo: "L'alfabeto dei sogni", autore: "Riccardo Santini", prezzo: 12.90, categoria_id: 16, descrizione: "Un percorso tra fantasia e realtà che cattura il lettore.", img: "https://www.ibs.it/images/2560752003981_0_0_536_0_75.jpg" },

];

async function seed() {
  try {
    // Pulizia tabelle
    await db.execute("DELETE FROM carrello");
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
        "INSERT INTO libri (titolo, autore, prezzo, categoria_id, descrizione, immagine_url) VALUES (?, ?, ?, ?, ?, ?)",
        [libro.titolo, libro.autore, libro.prezzo, libro.categoria_id, libro.descrizione, libro.img]
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
