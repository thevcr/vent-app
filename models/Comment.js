const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        // this means the password must be at least four characters long
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    },
    vent_id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      references: {
        model: "vent",
        key: "id"
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
