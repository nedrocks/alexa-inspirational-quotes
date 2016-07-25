import fs from 'fs';
import path from 'path';

import alexa from 'alexa-app';
import express from 'express';

const app = new alexa.app('sample');

let quotes;
try {
  quotes = fs.readFileSync(
    path.join(__dirname, '/var/task/quotes.txt'), {encoding: 'utf8'}
  ).toString().split('\n');
} catch(exc) {
  fs.readFileSync(
    path.join(__dirname, '../../assets/quotes.txt'), {encoding: 'utf8'}
  ).toString().split('\n');
}

app.launch(
  (request, response) => {
    console.log(request.data);
    response.say('Welcome to inspirational quotes. Get ready to be inspired!');
  }
);

app.intent(
  'InspireMeIntent',
  {
    'utterances': [
      '{can it |if it can ||to |will it }{read|tell} me {a quote|an inspirational quote}',
      'the {inspirational |}quote',
      'to inspire me'
    ]
  },
  (request, response) => {
    try {
      console.log(request.data);
      const randomIdx: number = parseInt(Math.random() * quotes.length);
      const quoteParts = quotes[randomIdx].split('\t');
      response.say(`${quoteParts[0]}<break strength="strong">${quoteParts[1]}}`);
      console.log('completed request.');
    } catch (exc) {
      console.error('Caught an exception', exc);
      response.say('Sorry, I wasn\'t able to understand the question');
    }
  }
);

// Manually hook the handler function into express
// expressApp.post('/sample', function(req, res) {
//   app.request(req.body)        // connect express to alexa-app
//     .then(function(response) { // alexa-app returns a promise with the response
//       res.json(response);      // stream it to express' output
//     });
// });

const inspirational = app.lambda();

export { inspirational }
