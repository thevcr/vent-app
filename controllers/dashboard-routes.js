const router = require('express').Router();
const sequelize = require('../config/connection');
const { Vent, User, Comment, Upvote, Downvote } = require('../models');
const withAuth = require('../utils/auth');

// get all vents for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Vent.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'vent_text',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM upvote WHERE vent.id = upvote.vent_id)'), 'upvote_count'],
      [sequelize.literal('(SELECT COUNT(*) FROM downvote WHERE vent.id = downvote.vent_id)'), 'downvote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'vent_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbVentData => {
      const vents = dbVentData.map(vent => vent.get({ plain: true }));
      res.render('dashboard', { vents, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Vent.findByPk(req.params.id, {
    attributes: [
      'id',
      'vent_text',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM upvote WHERE vent.id = upvote.vent_id)'), 'upvote_count'],
      [sequelize.literal('(SELECT COUNT(*) FROM downvote WHERE vent.id = downvote.vent_id)'), 'downvote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'vent_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbVentData => {
      if (dbVentData) {
        const vent = dbVentData.get({ plain: true });
        
        res.render('edit-vent', {
          vent,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
