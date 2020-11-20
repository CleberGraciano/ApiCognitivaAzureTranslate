/**
 * Arquivo: src/tradutor-texto.js
 * Descrição: arquivo responsável por traduzir textos usando o Translator Text API.
 * Data: 03/10/2019
 * //==> API https://api.cognitive.microsofttranslator.com
 */
const readline = require('readline-sync')
const request = require('request');
const uuidv4 = require('uuid/v4');

let subscriptionKey = require('../credentials/cognitive.json').apiKey;

let endpoint =  require('../credentials/cognitive.json').url;




function traduzirTexto() {
  let termoBusca = retornoPesquisa();
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
    body: [{
      'text': termoBusca
    }],
    json: true,
  }

  // ==> Aqui vamos imprimir a nossa requisição
  request(options, (err, res, body) => {
    console.log(JSON.stringify(body, null, 4));
  })
};

function retornoPesquisa (){
  return readline.question('Digite um termo da Wikipedia: ')
}

// Aqui vamos chamar a função para que possa realizar
// a tradução via API
traduzirTexto();