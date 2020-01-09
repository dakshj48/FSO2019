const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const JWT_SECRET = config.SECRET
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID! 
  }

  type Token {
    value: String!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    hello: () => "world",
    
    bookCount: async () => await Book.count(),
    
    authorCount: async () => await Author.count(),
    
    allBooks: async (root, args) => {
      if(args.genre === 'all genres')
        return await Book.find().populate('author')
      if (args.author != null && args.genre == null) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: author._id }).populate('author')
      }
      else if (args.author == null && args.genre != null)
        return await Book.find({ genres: args.genre }).populate('author')
      else if (args.author != null && args.genre != null) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ genres: args.genre }).populate('author')
        return books.filter(book => book.author.name === author.name)
      }
      return await Book.find().populate('author')
    },

    allAuthors: async () => await Author.find(),

    me: async (root, args, context) => context.currentUser
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError("not authenticated")
      let book = null
      if (args.genres.length === 0) {
        throw new UserInputError("No genre specified", {
          invalidArgs: args
        })
      }
      try {
        let author = await Author.findOneAndUpdate({ name: args.author }, { $inc: { "bookCount": 1 } })
        if (!author) {
          author = new Author({ name: args.author, bookCount: 1 })
          await author.save()
        }
        book = new Book({ ...args, author: author['id'] })
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return { title: book['title'], author: { name: args.author } }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError("not authenticated")
      if (!args.name)
        throw new UserInputError("Invalid input", {
          invalidArgs: args
        })
      let author = null
      try {
        author = await Author.findOneAndUpdate({ name: args.name },{ $set: { "born": args.setBornTo }}, { returnOriginal : false })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      if(author === null)
        return null
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password != 'daksh' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
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
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  } 
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
