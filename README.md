# soccerama
## Soccerama API for v1.1 and v1.2

[![travis build](https://img.shields.io/travis/marchitos/soccerama.svg?style=flat.square)](https://travis-ci.org/marchitos/soccerama)
![codecov coverage](https://img.shields.io/codecov/c/github/marchitos/soccerama.svg?style=flat.square)
![version](https://img.shields.io/npm/v/soccerama.svg?style=flat.square)
![downloads](https://img.shields.io/npm/dm/soccerama.svg?style=flat.square)
![MIT License](https://img.shields.io/npm/l/soccerama.svg?style=flat.square)

# installation
```js
npm install soccerama
```
# import
## ES6
```js
import { Soccerama } from 'soccerama';
const soccerama = new Soccerama(__YOUR_API_TOKEN__, 'v1.2');
```
## CommonJS
```js
var Soccerama = require('soccerama').Soccerama;
var soccerama = new Soccerama(__YOUR_API_TOKEN__, 'v1.2');
```
# usage
```js
var soccerama = new Soccerama(__YOUR_API_TOKEN__, 'v1.2'); // if second param is omitted api v1.1 will be used

soccerama.get(endpoint,params).then( function(data){
    console.log(data);
});
```
## endpoint
you can get the endpoint from the [official soccerama documentation](https://soccerama.pro/docs/1.1)
omitting the base url and the parameters (that are set with the params field)

```js
soccerama.get('countries').then( function(data){
    console.log(data)
});
```

## params
if you need to specify parameters you can set the params field as follow
```js
soccerama.get('countries/{id}', { id: 13, competitions: true }).then( function(data){
    //id in the params field will replace {id} in the endpoint
    //competitions: true, will add include=competitions in query string
});
```