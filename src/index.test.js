import { Soccerama } from './index';
import { expect } from 'chai';
import { apiToken } from './apitoken';

describe('Soccerama', function(){

  let soccerama;

  beforeEach( () => {
    soccerama = new Soccerama(apiToken);
  });

  it('must have a token field', () => {
      expect(soccerama.token).to.be.equal(apiToken);
  });

  it('must have a baseUrl field', () => {
      expect(soccerama.baseUrl).to.be.equal('https://api.soccerama.pro/v1.1/');
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

  it('should return countries when countries endpoint is called', () => {
    return soccerama.get('countries').then( data => {
      expect(data).to.have.property('data');
      expect(data.data).to.be.instanceof(Array);
      expect(data.data[0]).to.have.property('id');
      expect(data.data[0]).to.not.have.property('competitions');
    });
  });

});