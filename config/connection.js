const {connect, connection} = require('mongoose');

connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

connection.on('connected', () => {
    console.log('Mongoose connected successfully');
}
);

module.exports = connection;