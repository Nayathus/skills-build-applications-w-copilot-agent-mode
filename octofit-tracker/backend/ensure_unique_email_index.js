use octofit_db;
db.auth_user.createIndex({ "email": 1 }, { unique: true });
print('Unique index on email created for auth_user collection.');