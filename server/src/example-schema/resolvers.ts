// Hardcoded data store
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

// Resolver map
export const resolvers = {
    Query: {
      books() {
        return books;
      },
    },
  };
  