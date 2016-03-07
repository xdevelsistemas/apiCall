var format = require('string-format');
var reqPro = require("request-promise");
var proxy  = {
    rest : {}
};

var extend = require('extend');

var methods = {
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    DELETE : "DELETE"
};

module.exports  = function(API_PREFIX, API_ENDPOINT, API_AUTH) {
    proxy.rest.prefix = !!API_PREFIX?API_PREFIX:"";
    proxy.rest.api_endpoint = !!API_ENDPOINT?API_ENDPOINT:"";
    proxy.rest.api_auth = !!API_AUTH?API_AUTH:null;
    return {
        apiCall: apiCall,
        method: methods,
        apiGetErr: apiGetErr,
        configProxy: configProxy
    };
};


function apiGetErr (error,res){
    var msgerr = {};


    if (!!error.error) {
        switch (error.error.name) {
            case 'ValidationError':
                msgerr  = {err : "Erro de validação de dados"};
                fieldarr = [];
                for (field in error.error.errors) {
                    switch (error.error.errors[field].kind) {
                        case 'required':
                            fieldarr.push({ field : field , err : 'campo "' + field + '" é obrigatório'});
                            break;
                        case 'invalid':
                            fieldarr.push({ field : field , err : 'campo "' + field + '" é inválido'});
                            break;
                    }
                }
                extend(true,msgerr,{fields : fieldarr});
                break;
            default:
                msgerr = error.error.errors;
        }

    }

    /*return res.status(!!error.statusCode?error.statusCode:500).json(!!error.error?msgerr:error.message);*/
    return res.status(!!error.statusCode?error.statusCode:500).json({statusCode: error.statusCode||500});
}



function apiCall( entity , method ,reqData ) {

    var uri = proxy.rest.api_endpoint;
    var body = null;

    if ((method === methods.GET || method === methods.DELETE)&&(reqData)){
        uri += format(entity,reqData)
    }else{
        uri += entity;
        body = reqData
    }

    var options = {
        uri: uri ,
        headers : {
            'Content-Type': 'application/json'
        },
        method: method,
        json : body,
        resolveWithFullResponse: true
    };

    if(!!proxy.rest.api_auth){
        options.auth = proxy.rest.api_auth;
    }

    return reqPro(options).then(function(resp){
        var  data = {};
        if (typeof(resp.body) === "string"){
            console.log(data);console.log(data.body);
            data = _isJson(resp.body)?JSON.parse(resp.body):resp.body;
        }else{
            data = resp.body
        }
        return { data : data , status:  resp.statusCode};
    });

}

function configProxy(_proxy){
    if(!!_proxy||!!_proxy.rest||!!_proxy.api_endpoint||!!_proxy.api_token){
        console.log("Proxy ex:");
        console.log(proxy);
        throw new Error('Invalid proxy config!');
    }
    proxy = _proxy;
}

function _isJson(d){
    return (/^[\],:{}\s]*$/.test(d.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
}