db = db.getSiblingDB('documents')


db.createUser({
    user: 'express-api',
    pwd: 'example',
    roles: [
      {
        role: 'dbOwner',
      db: 'documents',
    },
  ],
});