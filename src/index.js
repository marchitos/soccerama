import https from 'https';

export class Soccerama{

  token = null;
  version = 'v1.2';
  baseUrl = "https://api.soccerama.pro/";

  constructor(tokenId, vId){
    this.token = tokenId;
    if (vId) this.version = vId;
    if (vId == 'v2.0') this.baseUrl = "https://soccer.sportmonks.com/api/";
    this.baseUrl = this.baseUrl + this.version + "/";
  }

  _get(url,plain){
    return new Promise((resolve, reject) => {
      const request = https.get(url, (response) => {
        // handle http errors
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error('Failed to load page, status code: ' + response.statusCode));
        }
        // temporary data holder
        const body = [];
        // on every content chunk, push it to the data array
        response.on('data', (chunk) => body.push(chunk));
        // we are done, resolve promise with those joined chunks
        response.on('end', () => resolve( plain ? body.join('') : JSON.parse(body.join('')) ));
      });
      // handle connection errors of the request
      request.on('error', (err) => reject(err))
    })
  }

  get(endpoint, params){
    let url = this.composeUrl(endpoint,params);
    return this._get(url);
  }

  composeUrl(endpoint, params){
    let newEndpoint = this.baseUrl + endpoint;
    let wrapped = endpoint.match(/\{(.*?)\}/g);
    if (wrapped) {
      let unwrapped = (wrapped) =>  wrapped.replace('{', '').replace('}', '');
      for (let w in wrapped){
        let k = unwrapped(wrapped[w]);
        newEndpoint = newEndpoint.replace(wrapped[w],params[k]);
        delete params[k]
      }
    }
    newEndpoint += "?api_token=" + this.token;

    if (params && Object.keys(params).length > 0) {
        var plist = [];
        var page;
        var pkeys = Object.keys(params);
        var pvalues = Object.values(params);
        for (var p in pkeys) {
          
          if(pkeys[p] == 'page'){
            page="&page="+pvalues[p];
          }
          else{
            if (params[pkeys[p]]) plist.push(pkeys[p]);
          }
        }
        
        if (plist.length > 0) newEndpoint += "&include=" + plist.join(',');
        if (typeof page != "undefined") newEndpoint += page;
        console.log(newEndpoint);
    }
    return newEndpoint;
  }
}