import { Soccerama } from './index';
import { expect } from 'chai';

describe('Soccerama', function(){

  let soccerama;
  let apiToken = "jhfksjfhsjfhkjshfdjk";

  beforeEach( () => {
    soccerama = new Soccerama(apiToken);
  });

  it('must have a token field', () => {
      expect(soccerama.token).to.be.equal(apiToken);
  });

  it('must have a baseUrl field for v1.2', () => {
      expect(soccerama.baseUrl).to.be.equal('https://api.soccerama.pro/v1.2/');
  });

  it('must have a baseUrl field for v2.0', () => {
    soccerama = new Soccerama(apiToken, 'v2.0');
    expect(soccerama.baseUrl).to.be.equal('https://soccer.sportmonks.com/api/v2.0/');
  });

  it('must have a composeUrl method', () => {
    expect(soccerama.composeUrl).to.exist;
    let endpoint = "players/team/{teamId}/season/{seasonId}";
    let params = { competition: true, country: false, teamId: 'pippo', seasonId: '2' };
    let res = soccerama.baseUrl + "players/team/pippo/season/2?api_token="+apiToken+"&include=competition";
    expect(soccerama.composeUrl(endpoint,params)).to.be.equal(res);
    let endpoint2 = "countries";
    let params2 = null;
    let res2 = soccerama.baseUrl + "countries?api_token="+apiToken;
    expect(soccerama.composeUrl(endpoint2,params2)).to.be.equal(res2);

  });

  it('must have a get method', () => {
    expect(soccerama.get).to.exist;
  });

  it('must have a _get method', () => {
    expect(soccerama._get).to.exist;
    return soccerama._get('https://example.com',true).then( data => {

    });
  });


});