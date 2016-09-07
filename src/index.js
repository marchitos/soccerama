import https from 'https';

export class Soccerama{

  token = null;
  baseUrl = "https://api.soccerama.pro/v1.1/";

  constructor(tokenId){
    this.token = tokenId;
  }

  _get(url){
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
        response.on('end', () => resolve(JSON.parse(body.join(''))));
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

    if (params && Object.keys(params).length > 0){
      let plist = [];
      let pkeys = Object.keys(params);
      for (let p in pkeys) {
        if (params[pkeys[p]]) plist.push(pkeys[p]);
      }
      if (plist.length > 0) newEndpoint += "&include="+plist.join(',');
    }
    return newEndpoint;
  }
}