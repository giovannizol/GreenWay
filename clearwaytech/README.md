# PROGETTO GREEN MOBILITY DASHBOARD

## Struttura dell'Applicazione e Analisi Funzionale

---

## 1. Introduzione e Obiettivi

Il progetto consiste nello sviluppo della **Green Mobility Dashboard**, una piattaforma web per il monitoraggio e la gestione della mobilità sostenibile urbana, con particolare riferimento ai servizi di bike-sharing e alla flotta di veicoli elettrici comunali.

L'obiettivo principale dell'applicazione è fornire uno strumento centralizzato che permetta di controllare lo stato dei mezzi sul territorio e di visualizzare i dati relativi ai flussi di traffico. L'interfaccia è progettata per essere chiara, lineare e responsiva; Il sistema ottimizza i flussi di lavoro separando le funzionalità in base a tre profili operativi: Amministratore, Tecnico e Supporto.

---

## 2. Architettura dell'Informazione e Struttura delle Pagine

Al primo accesso l'utente visualizza una **Pagina di Autenticazione (Login)**, attraverso la quale il sistema riconosce il ruolo dell'account e abilita le relative autorizzazioni di navigazione.

### Elementi Comuni della Struttura Globale

Tutte le schermate dell'applicazione condividono una struttura di base fissa per facilitare l'utilizzo del software:

- **Barra Superiore (Navbar):** Mostra il nome dell'applicazione, il profilo dell'utente collegato.
- **Menu Laterale (Sidebar):** Contiene i collegamenti alle sezioni dell'applicazione abilitate per lo specifico profilo utente.
- **Pannello Notifiche e Azioni (Pannello Laterale Destro):** Include due box: quello superiori con le notifiche, quello inferiore con le attività recenti.

### Elenco delle Sezioni Principali

- **Dashboard:** La pagina principale riassuntiva. Contiene moduli comuni (la mappa e il riquadro delle attività recenti) e moduli statistici personalizzati a seconda del ruolo.
- **Mappa Interattiva:** Un pannello cartografico con filtri di ricerca per localizzare veicoli, stazioni e colonnine di ricarica.
- **Monitoraggio & Analisi:** L'area che raccoglie la reportistica dettagliata e i grafici (a torta, a barre e a linee) per l'analisi dei consumi e dell'utilizzo dei mezzi.
- **Sistema Prenotazione Manutenzioni:** Un modulo guidato suddiviso in più passaggi (_form multi-step_), compilabile esclusivamente dai tecnici per registrare gli interventi.
- **Gestione Veicoli e Stazioni:** Il registro contenente i dati di tutti i mezzi e delle stazioni di sosta. Se l'utente loggato è l'admin, sarà visibile una terza tab per la gestione degli utenti.
- **Gestione Ticket:** La sezione dedicata alla ricezione, allo smistamento e alla risoluzione delle segnalazioni di problemi o disservizi.
- **Calendario (facoltativo):** Un'agenda per la pianificazione delle attività e la consultazione dello storico degli interventi.

---

### Tabella dei Permessi di Accesso

| Sezione Applicativa            |              Profilo: ADMIN              |           Profilo: TECNICO           |        Profilo: SUPPORTO        |
| :----------------------------- | :--------------------------------------: | :----------------------------------: | :-----------------------------: |
| **Pagina di Login**            |                 Accesso                  |               Accesso                |             Accesso             |
| **Dashboard (Home)**           |    Statistiche Generali e di Impatto     |     Stato Manutenzioni e Guasti      | Stato dei Ticket e della Flotta |
| **Mappa con Filtri**           |              Vista Completa              |       Vista + Mappa di Calore        |         Vista Operativa         |
| **Monitoraggio & Analisi**     |         Dati Finanziari e Utenti         |       Stato Salute Componenti        |   Stato Mezzi in Tempo Reale    |
| **Gestione Flotta & Stazioni** | Visualizzazione + Modifica Totale (CRUD) | Visualizzazione + Aggiornamento Dati |     Solo Ricerca e Lettura      |
| **Gestione Ticket**            |           Monitoraggio Flussi            |         Risoluzione Tecnica          |     Apertura e Smistamento      |
| **Sistema Prenotazione**       |               Solo Lettura               |     Compilazione Form Multi-Step     |             Inibito             |
| **Calendario**                 |           Monitoraggio Globale           |      Pianificazione Interventi       |        Storico Actività         |

---

## 3. Requisiti Funzionali per Ruolo

### 3.1 Profilo: SUPPORTO (Gestione Operativa)

L'operatore del supporto si occupa del monitoraggio continuo dello stato dei mezzi e dell'assistenza diretta agli utenti del servizio.

- **Pannello di Controllo:** Visualizza in tempo reale il conteggio dei mezzi disponibili, in uso o guasti, insieme a un elenco dei ticket aperti prioritari.
- **Ricerca e Consultazione:** Utilizza gli strumenti di ricerca rapida di veicoli e stazioni per individuare i dati necessari a gestire le richieste di assistenza ricevute.
- **Gestione dei Ticket:** Riceve le segnalazioni, risolve direttamente i problemi di natura amministrativa e assegna i problemi tecnici alla coda di lavoro dei tecnici.

### 3.2 Profilo: TECNICI (Manutenzione e Diagnostica)

Il tecnico necessita di strumenti per valutare lo stato dei componenti dei veicoli e registrare gli interventi eseguiti.

- **Diagnostica e Stato dei Mezzi:** Selezionando un singolo veicolo, il tecnico visualizza i dati sui cicli di vita della batteria, l'usura degli pneumatici, i chilometri totali, la distanza mancante al tagliando e l'efficienza energetica del motore (espressa in Watt/km).
- **Analisi dei Guasti:** Visualizza grafici sull'andamento dei guasti giornalieri o settimanali e una mappa di calore che evidenzia le zone cittadine con il maior numero di interventi registrati.
- **Sistema di Prenotazione Interventi:** Utilizza un modulo strutturato in 4 passaggi per registrare le manutenzioni:
  1. _Step 1:_ Selezione e verifica del veicolo o della stazione.
  2. _Step 2:_ Inserimento del tipo di problema e della diagnostica.
  3. _Step 3:_ Assegnazione dell'intervento (tecnico interno o ditta esterna).
  4. _Step 4:_ Riepilogo dei dati inseriti e conferma finale.
- **Operazioni sul campo:** Aggiorna i dati relativi a scadenze, assicurazioni o pulizia, e dispone della funzione di sblocco remoto del veicolo.

### 3.3 Profilo: ADMIN (Amministrazione e Controllo Generale)

L'Amministratore supervisiona l'intero sistema, analizza i dati generali e gestisce le configurazioni del database.

- **Statistiche di Impatto Ambientale:** Monitora i dati relativi alla CO2 risparmiata e al risparmio di carburante derivanti dall'utilizzo della flotta elettrica e del bike-sharing.
- **Analisi Dati e Flussi:** Visualizza il numero di utenti attivi, la durata media dei viaggi, il tasso di crescita degli iscritti e l'andamento economico del servizio.
- **Gestione Totale:** Ha l'autorizzazione esclusiva per creare, modificare o cancellare i dati (operazioni CRUD) relativi a veicoli, stazioni e account dei dipendenti (Tecnici e Supporto). Dispone inoltre dello sblocco remoto di emergenza per tutti i mezzi.

## 4. Stack Tecnologico (Tecnologie Utilizzate)

Per lo sviluppo della piattaforma sono stati selezionati strumenti moderni e standard del settore web, mirati a garantire velocità di sviluppo e un'interfaccia fluida.

- **Figma:** Utilizzato nella fase iniziale del progetto per lo studio della User Experience (UX) e per la creazione del prototipo grafico del progetto (UI).
- **React:** La libreria JavaScript principale su cui si basa l'intera applicazione.
- **JavaScript (ES6+):** Il linguaggio di programmazione utilizzato per gestire la logica della dashboard, il passaggio dei dati tra i diversi ruoli e il comportamento dei moduli (come il form multi-step).
- **HTML5 e CSS3:** Utilizzati rispettivamente per definire la struttura semantica delle pagine e per la gestione del layout grafico. Il CSS include l'uso di variabili globali (`:root`) per mantenere coerenti i font e i colori in tutta l'applicazione.
- **JSON (JavaScript Object Notation):** Utilizzato per creare file di dati simulati (_mock data_), usati per simulare la struttura di un database reale (tabelle utenti, veicoli, stazioni, ticket), permettendo all'applicazione di effettuare ricerche, letture e simulazioni di scrittura in modo realistico direttamente sul front-end.

## 5. Struttura del Progetto (Atomic Design)

L'architettura del codice segue la metodologia **Atomic Design** per garantire la massima modularità e riutilizzabilità dei componenti React:

green-mobility/
│
├── .github/ # Workflows di CI/CD e configurazioni di GitHub
├── config/ # File di configurazione globale e variabili d'ambiente
│
├── src/ # Codice sorgente principale dell'applicazione
│ ├── assets/ # Risorse statiche (immagini, font, stili globali)
│ ├── components/ # Componenti dell'interfaccia utente (riutilizzabili)
│ ├── context/ # Gestione dello stato globale (o Store/Redux)
│ ├── data/ # Mock dati, file JSON locali o costanti statiche
│ ├── layouts/ # Strutture di pagina riutilizzabili (es. Header + Sidebar + Footer)
│ ├── pages/ # Pagine principali dell'app (collegate al routing)
│ ├── utils/ # Funzioni helper e utility di supporto
│ └── views/ # Pagine principali / Schermate dell'app (Routes)
│
├── public/ # File pubblici statici non elaborati dal build tools
│
├── .gitignore # Esclusioni per il controllo versione Git
├── package.json # Dipendenze del progetto e script di avvio/build
└── README.md # Documentazione principale del progetto
