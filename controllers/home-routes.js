const router = require('express').Router();
const sequelize = require('../config/connection');
const { Vent, User, Comment, Upvote } = require('../models');

router.get('/', (req, res) => {
    Vent.findAll({
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
        // pass a single vent object into the homepage template
        const vents = dbVentData.map(vent => vent.get({ plain: true }));

        res.render('homepage', {
            vents,
            loggedIn: req.session.loggedIn
          });

      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  // get single vent
  router.get('/vent/:id', (req, res) => {
    Vent.findOne({
      where: {
        id: req.params.id
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
        if (!dbVentData) {
          res.status(404).json({ message: 'No vent found with this id' });
          return;
        }
  
        // serialize the data
        const vent = dbVentData.get({ plain: true });
  
        res.render('single-vent', {
            vent,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;