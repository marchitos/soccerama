import { Soccerama } from './index';
let expect = require('chai').expect;

describe('Soccerama', function(){

  let soccerama;

  beforeEach( () => {
    soccerama = new Soccerama('jkldjgklfjgfl');
  });

  it('should have a tokenId', () => {
    expect(soccerama.token).to.be.equal('jkldjgklfjgfl');
  });

});