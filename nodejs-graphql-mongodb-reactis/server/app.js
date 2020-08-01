const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cors-origin requests
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/graphql');
mongoose.connection.once('open', () => {
    console.log('connected to db');
})

// GraphQL middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('server is runging on port 4000..');
})