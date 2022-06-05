// import all models
const Vent = require('./Vent');
const User = require('./User');
const Upvote = require('./Upvote');
const Comment = require('./Comment');

// create associations
User.hasMany(Vent, {
  foreignKey: 'user_id'
});

Vent.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// User.belongsToMany(Vent, {
//   through: Upvote,
//   as: 'upvoted_vents',
//   foreignKey: 'user_id',
//   onDelete: 'SET NULL'
// });

// Vent.belongsToMany(User, {
//   through: Upvote,
//   as: 'upvoted_vents',
//   foreignKey: 'vent_id',
//   onDelete: 'SET NULL'
// });

Upvote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Upvote.belongsTo(Vent, {
  foreignKey: 'vent_id',
  onDelete: 'SET NULL'
});

User.hasMany(Upvote, {
  foreignKey: 'user_id'
});

Vent.hasMany(Upvote, {
  foreignKey: 'vent_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Vent, {
  foreignKey: 'vent_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vent.hasMany(Comment, {
  foreignKey: 'vent_id'
});

module.exports = { User, Vent, Upvote, Comment };
