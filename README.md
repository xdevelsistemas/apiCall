<!--todo exemplificar melhor-->
# apiCall

Service [node](http://nodejs.org) to facilitate the request promise front end to back end.

Simple example:
```js
var body = {user: 'user', password: 'pass'};
var api = require("apicall")("Your API_PREFIX","Your API_ENDPOINT","Your API_TOKEN");
var test = api.apiCall("/", api.method.POST, body); //Retorna uma request promise
```


GET Exemple:
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

Method's:
```js
var api = require("apicall")("","http://httpbin.org","");

//GET
api.method.GET // Returns: 'GET'
//POST
api.method.POST // Returns: 'POST'
//PUT
api.method.PUT // Returns: 'PUT'
//DELETE
api.method.DELETE // Returns: 'DELETE'

```

Authentication token bearer example:
```js
var prefix = "";
var endpoint = "http://localhost:3000";
var apitoken = "iLoveScothScoth";
var api = require("apicall")(prefix, endpoint, apitoken); //Authentication is configured with "Bearer iLoveScothScoth"
```

Data in the url or query parameter:
```js
var prefix = "";
var endpoint = "http://localhost:3000";
var apitoken = "iLoveScothScoth";
var api = require("apicall")(prefix, endpoint, apitoken); //Authentication is configured with "Bearer iLoveScothScoth"

var data = {
    id: '1231231231231'
};

// Example 1
var test = api.apiCall('users/{token}', api.method.GET, data);
test
    .then(function(result){
        console.log(result.status);
        console.log(result.data);
    })
    .catch(function(error){
        console.log(error);
    });
        
// Example 2
var test2 = api.apiCall('users?token={token}', api.method.GET, data);
test2
    .then(function(result){
        console.log(result.status);
        console.log(result.data);
    })
    .catch(function(error){
        console.log(error);
    });

```

Catching errors
```js
var api = require("apicall")("","http://httpbin.org","");
api.apiGetErr(error,res);
```


Nodejs app example:
```js
var express = require('express');
var app = express();
var api = require("apicall")("","http://httpbin.org","");
 
app.get('/', function (req, res) {
    api.apiCall('/post', api.method.POST, {html: "<html><body><h1>Hello World</h1></body></html>"})
        .then(function(dataApi){
            var htmlReceived = JSON.parse(dataApi.data.data).html;
            res.status(dataApi.status).send(htmlReceived);
        })
        .catch(function(errorApi){
            api.apiGetErr(errorApi,res);
        })
})
 
app.listen(3000);
```