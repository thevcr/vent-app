// import all models
const Vent = require('./Vent');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
User.hasMany(Vent, {
  foreignKey: 'user_id'
});

Vent.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Vent, {
  through: Vote,
  as: 'voted_vents',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vent.belongsToMany(User, {
  through: Vote,
  as: 'voted_vents',
  foreignKey: 'vent_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Vent, {
  foreignKey: 'vent_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Vent.hasMany(Vote, {
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

module.exports = { User, Vent, Vote, Comment };