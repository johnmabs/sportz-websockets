# Sportz WebSockets

**Real-time backend experiment built with Node.js, Express, PostgreSQL and WebSockets.**

Sportz WebSockets est un projet backend expérimental conçu pour approfondir la **communication temps réel** entre un serveur et plusieurs clients connectés.

Le projet combine une API Express, PostgreSQL et WebSockets afin d’enregistrer puis diffuser des commentaires sportifs en direct.

> ⚡ Projet expérimental orienté Real-Time Backend Engineering.

---

## 🎯 Objectif

L’objectif principal est d’explorer les problématiques liées aux applications temps réel :

* connexions WebSocket persistantes ;
* diffusion d’événements à plusieurs clients ;
* synchronisation entre persistence et temps réel ;
* gestion du cycle de vie des connexions ;
* architecture REST + WebSocket.

---

## 🛠 Stack

* Node.js
* Express
* WebSockets (`ws`)
* PostgreSQL
* Drizzle ORM

---

## 🏗 Architecture

```text id="5ykmns"
                    ┌─────────────┐
                    │ PostgreSQL  │
                    └──────▲──────┘
                           │
                           │ persist
                           │
Client HTTP ───────► Express API
                           │
                           │ broadcast
                           ▼
                    WebSocket Server
                     │      │      │
                     ▼      ▼      ▼
                  Client A Client B Client C
```

Une opération peut être reçue côté serveur, persistée en base puis diffusée aux clients WebSocket connectés.

---

## 🔄 Exemple de flux

```text id="1x2rzf"
Nouveau commentaire
       │
       ▼
   Express Server
       │
       ├── Validation
       │
       ├── Persistence PostgreSQL
       │
       └── Broadcast WebSocket
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
     Client A Client B Client C
```

Cela permet aux clients de recevoir les nouvelles informations sans avoir à rafraîchir la page ou interroger continuellement l’API.

---

## 🧠 Concepts travaillés

### WebSocket lifecycle

* ouverture de connexion ;
* maintien d’une connexion persistante ;
* fermeture ;
* gestion des clients déconnectés.

### Broadcast

Un événement reçu par le serveur peut être diffusé à l’ensemble des clients connectés.

### REST + temps réel

Le projet combine deux styles de communication :

```text id="25yix0"
REST
↓
opérations classiques

WebSocket
↓
mise à jour temps réel
```

### Persistence

Les données sont persistées dans PostgreSQL via Drizzle ORM.

Cela permet de conserver un historique tout en utilisant WebSockets pour la diffusion immédiate.

---

## 📁 Structure

Le projet sépare les responsabilités principales entre :

```text id="sd5kfm"
server
routes
database
websocket
models / schema
```

La structure peut évoluer au fur et à mesure des expérimentations.

---

## 🚀 Installation

### 1. Cloner le repository

```bash id="1cuufn"
git clone https://github.com/johnmabs/sportz-websockets.git
cd sportz-websockets
```

### 2. Installer les dépendances

```bash id="1v52o8"
npm install
```

### 3. Configurer PostgreSQL

Configurer la connexion à la base de données dans les variables d’environnement utilisées par le projet.

Par exemple :

```env id="8r19rc"
DATABASE_URL=
```

### 4. Lancer le serveur

```bash id="1uuy7h"
npm run dev
```

ou selon les scripts disponibles :

```bash id="egc6hz"
npm start
```

---

## 🧪 Idées d’évolution

Ce projet pourrait évoluer vers :

* rooms / channels ;
* authentification WebSocket ;
* heartbeat / ping-pong ;
* gestion des reconnexions ;
* Redis Pub/Sub ;
* scaling horizontal ;
* rate limiting ;
* historique paginé ;
* tests d’intégration ;
* monitoring des connexions.

---

## 🔬 Problématiques intéressantes à approfondir

### Scalabilité

Avec une seule instance serveur :

```text id="8k7oin"
Clients
  ↓
Server
```

le broadcast est simple.

Avec plusieurs instances :

```text id="3sp5cz"
              Redis Pub/Sub
                   │
          ┌────────┴────────┐
          ▼                 ▼
      Server A          Server B
       │   │              │   │
       ▼   ▼              ▼   ▼
     clients            clients
```

il faut partager les événements entre les serveurs.

C’est une évolution naturelle du projet pour approfondir les systèmes distribués.

---

## 👨‍💻 Auteur

**John Mabiala**

Full-Stack / Backend Developer

* [GitHub](https://github.com/johnmabs)
* [LinkedIn](https://linkedin.com/in/john-mabiala)

---

## 📌 Portfolio

Ce repository fait partie de mon portfolio technique et illustre mon travail sur la **communication temps réel, les WebSockets et les architectures événementielles simples**.
