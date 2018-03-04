const expect = require('expect');

const {Users} = require('./users');

describe('Users', () =>{
  var sampleUsers;
  beforeEach(() =>{
    sampleUsers = new Users();

    sampleUsers.users = [
      {id: '1', name: 'Mike', room: 'Room1'},
      {id: '2', name: 'Jen', room: 'Room2'},
      {id: '3', name: 'Ren', room: 'Room1'}
    ];
  });

  it('should add new user', () =>{
    var users = new Users();
    var user = {
      id: '123456',
      name: 'Mahfuz',
      room: 'Test3'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () =>{
    var removeUser = sampleUsers.removeUser('1');
    expect(removeUser.id).toBe('1');
    expect(sampleUsers.users.length).toBe(2);
  });

  it('should not remove a user', () =>{
    var removeUser = sampleUsers.removeUser('99');
    expect(removeUser).toBeFalsy();
    expect(sampleUsers.users.length).toBe(3);
  });

  it('should find user', () =>{
    var findUser = sampleUsers.getUser('1');
    expect(findUser.id).toBe('1');
    // or
    expect(findUser.name).toBe('Mike');
  });

  it('should not find user', () =>{
    var findUser = sampleUsers.getUser('99');
    expect(findUser).toBeFalsy();
  });

  it('should return names for Room1', () =>{
    var userList = sampleUsers.getUserList('Room1');
    expect(userList).toEqual(['Mike', 'Ren']);
  });

  it('should return names for Room2', () =>{
    var userList = sampleUsers.getUserList('Room2');
    expect(userList).toEqual(['Jen']);
  });

})
