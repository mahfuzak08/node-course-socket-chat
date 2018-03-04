var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () =>{
    var from = 'Mahfuz';
    var text = 'Some asdasd afsd';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,text});
  });
});

describe('generateLocationMessage', () =>{
  it('should generate correct location object', () =>{
    var from = 'Mahfuz';
    var message = generateLocationMessage(from, 1, 1);

    expect(typeof message.createdAt).toBe('number');
    expect(message.from).toBe(from);
    expect(message.url).toBe('https://www.google.com/maps?q=1,1');
  });
});
