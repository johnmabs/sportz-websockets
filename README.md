# Sportz WebSockets

Prototype backend permettant de diffuser des commentaires
sportifs en temps réel via WebSockets.

Le projet a été créé pour expérimenter les patterns de
communication temps réel entre une API Express, PostgreSQL
et plusieurs clients WebSocket.

## Stack

- Node.js
- Express
- WebSockets (`ws`)
- PostgreSQL
- Drizzle ORM

## Architecture

```text
Client
   │
   │ WebSocket
   ▼
Express Server
   │
   ├── REST / HTTP
   │
   ├── WebSocket broadcast
   │
   └── PostgreSQL
```

## Fonctionnement

Un commentaire de match est enregistré côté serveur puis
diffusé aux clients WebSocket connectés.

```text
New commentary
      │
      ▼
   Server
      │
      ├── save to PostgreSQL
      │
      └── broadcast
              │
      ┌───────┼───────┐
      ▼       ▼       ▼
   Client A Client B Client C
```

## Concepts étudiés
- WebSocket lifecycle
- Broadcast
- Connection management
- REST + WebSocket
- Persistence PostgreSQL
- Event-driven communication

## Objectif

Projet expérimental destiné à approfondir les systèmes
temps réel et les communications WebSocket.
