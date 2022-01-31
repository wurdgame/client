# WurdGame Client

## APP Overview

Wurdgame is a 2 player word game using Socket.io. The game begins when two players join. They will each then be sent a set of random letters. Each player will then create the longest word that they can with the letters and send them back to the hub. The hub will then calculate the players' words and let them know which player won.

## Deployed URL

- [Wurd](https://wurdgame.herokuapp.com/)

## Hub Responsibilties

-  The clients will be the players in the game.

- client/player will recieve a string of letters and return a word

- The word will be checked to make sure all words are avaialble to be used.

- will recieve results once calculated by the Hub

## Tools

- Socket.io

- uuid

- jest

- express

- axios

## Installation

- run `git clone https://github.com/wurdgame/client.git`

- `cd wordgame/client`

- `npm install`

## Usage

- to start: `npm start`

## UML

![UML](https://github.com/wurdgame/hub/issues/2#issue-1118732612)

## Team Members

- Erik Savage

- Ryan Lee

- Spencer Tower

- Michael Hendricks
