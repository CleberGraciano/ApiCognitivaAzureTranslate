/**
 * Descrição: arquivo responsável por traduzir textos usando o Translator Text API.
 */
const readline = require('readline-syncclear')
const request = require('request');
const uuidv4 = require('uuid/v4');

let subscriptionKey = require('../credentials/cognitive.json').apiKey;

let endpoint =  require('../credentials/cognitive.json').url;



function traduzirTexto() {
  // ==> Aqui vamos configurar os requests
  let options = {
    method: 'POST',
    baseUrl: endpoint,
    url: 'translate',
    qs: {
      'api-version': '3.0',
      'to': ['en', 'es', 'fr', 'sv', 'zh-Hans']
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Ocp-Apim-Subscription-Region' : 'eastus',
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
   
    json: true,
  }
      
    const texto = readline.question('Digite um termo da Wikipedia: ');
 

  // ==> Aqui vamos imprimir a nossa requisição
  request(options, (err, res, body) => {
    console.log(JSON.stringify(body, null, 4));
  })
};

// Aqui vamos chamar a função para que possa realizar
// a tradução via API
traduzirTexto();