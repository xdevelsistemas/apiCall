<!--todo exemplificar melhor-->
# apiCall

Service para [node](http://nodejs.org) a fim de facilitar o request promise de front end com back end.

Exemplo simples:
```js
var body = {user: 'user', password: 'pass'};
var api = require("apicall")("Your API_PREFIX","Your API_ENDPOINT","Your API_TOKEN");
var test = api.apiCall("/", api.method.POST, body); //Retorna uma request promise
```


Exemplo GET:
```js
var body = null;
var api = require("apicall")("","http://httpbin.org","");
var test = api.apiCall("/", api.method.GET, body);
test
    .then(function(data){
        //data.data === resp server data
        //data.status === resp server status
        console.log(data);
     })
    .catch(function(error){
        //error === server error
        throw error;
    });
```