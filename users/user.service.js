const config = require('config.json');
const jwt = require('jsonwebtoken');

const users = [{ id: 1, username: 'name', password: 'pass', firstName: 'Name', lastName: 'Last' }];

module.exports = {
    authenticate,
    getAll,
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(user => omitPassword(user));
}

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}