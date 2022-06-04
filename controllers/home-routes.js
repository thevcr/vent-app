const router = require('express').Router();
const sequelize = require('../config/connection');
const { Vent, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Vent.findAll({
      attributes: [
        'id',
        'vent_text',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE vent.id = vote.vent_id)'), 'vote_count']
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
        // pass a single post object into the homepage template
        const vents = dbVentData.map(vent => vent.get({ plain: true }));

        res.render('homepage', { vents });

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

module.exports = router;