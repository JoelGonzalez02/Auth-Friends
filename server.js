const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

let nextId = 7;

let friends = [
  {
    id: 1,
    name: 'Krillin',
    age: 40,
    email: 'destructoDisk@gmail.com',
    picture: 'https://media1.tenor.com/images/22db41774080e9faf5aadc5ec8aff7e0/tenor.gif?itemid=11098959'
  },
  {
    id: 2,
    name: 'Gohan',
    age: 23,
    email: 'ibeatCell@gmail.com',
    picture: 'https://media1.tenor.com/images/6a948e2fe83c9f355b6f8bb570b1cd9e/tenor.gif?itemid=12375586'
  },
  {
    id: 3,
    name: 'Vegeta',
    age: 41,
    email: 'princeVegeta@gmail.com',
    picture: 'https://media.tenor.com/images/47a1d5bf6f266a75fdbb0bf6416ba4f4/tenor.gif'
  },
  {
    id: 4,
    name: 'Piccolo',
    age: 28,
    email: 'namekianDude@gmail.com',
    picture: 'https://media.tenor.com/images/cd9d1003990871476ca4b8f971aaba34/tenor.gif'
  },
  {
    id: 5,
    name: 'Master Roshi',
    age: 300,
    email: 'notACreepyOldManAtAll@gmail.com',
    picture: 'https://media1.tenor.com/images/b50825ee0d8d4fde937b33581beaf805/tenor.gif?itemid=5788111'
  },
  {
    id: 6,
    name: 'Android 17',
    age: 20,
    email: 'ihatePoachers@gmail.com', 
    picture: 'https://media.tenor.com/images/501ee0da29a7ef71d4f5698d0fd6b9ef/tenor.gif'
  }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: 'User must be logged in to do that.' });
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Lambda School' && password === 'i<3Lambd4') {
    req.loggedIn = true;
    res.status(200).json({
      payload: token
    });
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see Readme' });
  }
});

app.get('/api/friends', authenticator, (req, res) => {
  setTimeout(() => {
    res.send(friends);
  }, 1000);
});

app.get('/api/friends/:id', authenticator, (req, res) => {
  const friend = friends.find(f => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.post('/api/friends', authenticator, (req, res) => {
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends);
});

app.put('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  const friendIndex = friends.findIndex(f => f.id == id);

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body };

    friends = [
      ...friends.slice(0, friendIndex),
      friend,
      ...friends.slice(friendIndex + 1)
    ];
    res.send(friends);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.delete('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  friends = friends.filter(f => f.id !== Number(id));

  res.send(friends);
});

function getNextId() {
  return nextId++;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
