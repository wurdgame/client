'use strict';

const socketio = require('socket.io-client');
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost:3000';

// const wurd = socketio.connect(`${URL}${PORT}/wurd`); // might need fixin'

const wurd = socketio.connect(`http://localhost:3000/wurd`);

const uuid = require('uuid').v4;
const randomWords = require('random-words');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
//looks like you need v17+ of node
// const ac = new AbortController();
// const signal = ac.signal;

let idGen = uuid();
let userName = randomWords();

console.log('Generated ID is: ' + idGen);
console.log('Generated userName is: ' + userName);


const player = {
  name: userName,
  playerId: idGen,
};

// connect client/player
wurd.on('connect', (payload) => {
  payload = player;
  console.log('PLAYER:', payload);
  wurd.emit('join', payload);
});

wurd.on('gamestatus', (status) => {
  console.log(status);
});

wurd.on('gamestart', async (payload) => {
  getWord(payload);
});

wurd.on('playagain', payload => {
  playagain();
});



// have player re-arrange string

function getWord(payload) {
  //take letters from payload
  let letters = payload.letters;
  readline.question(`You have 30 seconds to form these letters into the longest word you can from ${letters}\n`, answer => {
    console.log(`you entered ${answer}!`);
    console.log('Answer after readline.close(): ', answer);
    payload.answer = answer;
    payload.userName = userName;
    console.log(payload);

    wurd.emit('submit', payload);
  });
}

function playagain() {
  readline.question(`PLAY AGAIN? Y OR N...\n`, answer => {
    console.log(answer);
    if (answer.toUpperCase() === 'Y' || answer.toUpperCase() === 'YES') {
      console.log('you entered', answer);
      wurd.emit('newround', player)
    } else if (answer.toUpperCase() === 'N' || answer.toUpperCase() === 'NO') {
      console.log('you entered', answer);

      wurd.disconnect();
    } else {
      console.log('you entered into the ELSE statement', answer);

      playagain();
    }
  });
}

// create and connect client and display to player
wurd.on('receivestring', (payload) => {
  console.log(payload);
});


/*
const ac = new AbortController();
const signal = ac.signal;

rl.question('What is your favorite food? ', { signal }, (answer) => {
  console.log(`Oh, so your favorite food is ${answer}`);
});

signal.addEventListener('abort', () => {
  console.log('The food question timed out');
}, { once: true });

tTimeout(() => ac.abort(), 10000);
*/
// 

// 
// player re-enters strings which is accepted as an arg

//const answer = getWord(payload.letters);

// const answer = readline.question('See the letters? Re-arrange them into a word. The longest word that 1) Uses the letters provided AND 2) Exists in the dictionary, wins!');

// console.log('You entered: ' + answer);


// arg is checked against the pool of letters
// if passes continue

// if (!payload.letters.includes(answer)) {
//   console.log('Stop cheating! You may only use the letters provided')
// } else {
//   payload.letters = answer;
//   wurd.emit('player answer', payload)
// }


// receive string from hub
// emit new string to hub

// payload includes new string and clientId
// emit new string to hub

// payload includes new string and clientId