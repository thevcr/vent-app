const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Vent extends Model {
  static upvote(body, models) {
    return models.Upvote.create({
      user_id: body.user_id,
      vent_id: body.vent_id,
    }).then(() => {
      return Vent.findOne({
        where: {
          id: body.vent_id,
        },
        attributes: [
          "id",
          "vent_text",
          "title",
          "created_at",
          [sequelize.literal('(SELECT COUNT(*) FROM upvote WHERE vent.id = upvote.vent_id)'), 'upvote_count'],
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'vent_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }

  static downvote(body, models) {
    return models.Downvote.create({
      user_id: body.user_id,
      vent_id: body.vent_id,
    }).then(() => {
      return Vent.findOne({
        where: {
          id: body.vent_id,
        },
        attributes: [
          "id",
          "vent_text",
          "title",
          "created_at",
          [sequelize.literal('(SELECT COUNT(*) FROM upvote WHERE vent.id = upvote.vent_id)'), 'upvote_count'],
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'vent_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}
  
// create fields/columns for Vent model
Vent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vent_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "vent",
  }
);

module.exports = Vent;