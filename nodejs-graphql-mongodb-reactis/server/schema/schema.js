const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book.js');
const Author = require('../models/author.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// Hardcoded data
// var books = [
//     {name: "Doremon", genre: 'cartoon', id: "1", authorId: "1"},
//     {name: "Black clover", genre: 'cartoon', id: "2", authorId: "2"},
//     {name: "Conan", genre: 'cartoon', id: "3", authorId: "3"},
//     {name: "One piece", genre: 'cartoon', id: "1", authorId: "1"},
//     {name: "Naruto", genre: 'cartoon', id: "2", authorId: "2"},
//     {name: "Tower of god", genre: 'cartoon', id: "3", authorId: "3"},
// ];

// var authors = [
//     {name: "Ngoc Son", age: 22, id: "1"},
//     {name: "Anh cong", age: 23, id: "2"},
//     {name: "Anh doan", age: 23, id: "3"},
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, argds) {
                console.log(parent);
                // use lodash return hardcoded
                // return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, agrs) {
                // return _.filter(books, {authorId: parent.id});
                return Book.find({authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve (parent, args) {
                // return _.find(books, {id: args.id})
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

// reference: https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&index=1