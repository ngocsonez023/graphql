const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('server is runging on port 4000..');    
})
/* 
reference: 
    https://www.youtube.com/watch?v=PEcJxkylcRM
    https://www.youtube.com/watch?v=qqzIA1BQ_ys
    https://www.youtube.com/watch?v=e9Zxzr7sy60
    https://www.youtube.com/watch?v=BqfZZ0wDeMU
    https://www.youtube.com/watch?v=ay81Q5JhkEw
*/