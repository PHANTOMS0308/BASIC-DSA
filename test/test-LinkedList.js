const should = require('chai').should();
const SLL = require('../LinkedList.js');

describe('LinkedList', function() {
  const dataStream = {
    number: [1, 22, NaN, -3, 14, 0, -16],
    string: ['John', 'Steve', 'Shennie', 'Wong', 'David'],
    array: [ ['a', 1], ['c', 5], ['z', -4], ['m', 22] ],
    object: [ 
      {name: 'Shennie', job: 'Hacker'},
      {name: 'Shen', job: 'Poker'},
      {name: 'Johnny', job: 'Actor'}
    ]
  };

  describe('High Level Utilities', function() {
    const list = SLL.fromArray(dataStream.number);
    
    it('LinkedList should be iterable', function() {
      [...list].should.be.deep.equal(dataStream.number);
    });

    it('LinkedList has custom name type as [object LinkedList]', () => {
      list.should.be.a('LinkedList').but.not.an('object');
      console.log('The name tag is ', list.toString());
    });


  });

});
