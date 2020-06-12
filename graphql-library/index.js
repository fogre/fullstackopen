const config = require('./utils/config')
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author =  require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

console.log('connecting to ' + config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { 
  useFindAndModify: false, 
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Query {
    authorCount: Int!
    allAuthors(name: String): [Author!]!
    allBooks(author: String, title: String, published: String, genres: String): [Book!]!
    allUsers: [User!]!
    allGenres: [String!]!
    findByGenre(genre: String!): [Book!]!
    me: User
  }

  type Mutation {
    addAuthor(
      name: String!,
      born: Int
    ): Author

    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const newAuthor = async (args) => {
  const authorName = args.name ? args.name : args.author
  const author = new Author({
    ...args,
    name: authorName.toLowerCase()
  })
  try {
    await author.save()
    return author
  } catch (error) {
    throwUserInputError(error, args)
  }  
}

const throwUserInputError = (error, args) => {
  throw new UserInputError(error.message, {
    invalidArgs: args,
  })
}

const authenticateUser = (context) => {
  const currentUser = context.currentUser
  if (!currentUser)
    throw new AuthenticationError("not authenticated")
  return currentUser
}

const resolvers = {
  Query: {
    allAuthors: (root, args) => Author.find(args),
    allBooks: async (root, args) => {
      const argus = { ...args }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        argus.author = author ? author._id : null
      }
      return Book.find(argus).populate('author', { name: 1 })
    },
    allGenres: (root, args) => Book.distinct('genres'),
    allUsers: (root, args) => User.find(args),
    authorCount: () => Author.collection.countDocuments(),
    findByGenre: (root, args) => {
      return Book.find({ genres: args.genre }).populate('author', { name: 1 })
    },
    me: (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: (root) => root.books.length
  },
  Book: {
    author: (root) => root.author.name
  },

  Mutation: {
    addAuthor: (root, args, context) => {
      authenticateUser(context)
      return newAuthor(args)
    },

    addBook: async (root, args, context) => {
      authenticateUser(context)
      let author = await Author.findOne({
        name: args.author.toLowerCase()
      })
      if (!author) {
        author = await newAuthor(args)
      }
      const book = new Book({ 
        ...args,
        title: args.title.toLowerCase(),
        author: author._id 
      })
      try {
        const savedBook = await book.save()
        author.books = author.books.concat(savedBook._id)
        await author.save()
        return savedBook
      } catch (error) {
        throwUserInputError(error, args)
      }
    },

    editAuthor: async (root, args, context) => {
      authenticateUser(context)
      const author = await Author.findOne({ name: args.name.toLowerCase() })
      if (!author) return null
      author.name = args.name.toLowerCase()
      author.born = args.setBornTo
      return author
        .save()
        .catch(err => throwUserInputError(err, args))
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })
      return user
        .save()
        .catch(err => throwUserInputError(err, args))
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') 
        throw new UserInputError("wrong credentials")
    
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, config.SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})