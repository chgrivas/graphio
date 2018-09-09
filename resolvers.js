var _id = 0;
var photos = [];

const resolvers = {
  Query: {
    totalPhotos: (parent, args, { db }) =>
      db.collection('photos')
        .estimatedDocumentCount(),

    allPhotos: (parent, args, { db }) =>
      db.collection('photos')
        .find()
        .toArray(),

    totalUsers: (parent, args, { db }) =>
      db.collection('users')
        .estimatedDocumentCount(),

    allUsers: (parent, args, { db }) =>
      db.collection('users')
        .find()
        .toArray()
  },
  Mutation: {
    postPhoto(parent, args) {
      var newPhoto = {
        id: _id++,
        ...args.input
      };
      photos.push(newPhoto);

      return newPhoto;
    }
  },
  Photo: {
    url: parent => `http://yoursite.com/img/${parent.id}.jpg`
  }
};

module.exports = resolvers;
