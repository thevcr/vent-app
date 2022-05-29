const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Vent, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Vent.findAll({
    attributes: [
      'id',
      'vent_url',
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
    .then(dbVentData => res.json(dbVentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Vent.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'vent_url',
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
      if (!dbVentData) {
        res.status(404).json({ message: 'No vent found with this id' });
        return;
      }
      res.json(dbVentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.vent('/', withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', vent_url: 'https://taskmaster.com/press', user_id: 1}
  Vent.create({
    title: req.body.title,
    vent_url: req.body.vent_url,
    user_id: req.session.user_id
  })
    .then(dbVentData => res.json(dbVentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upvote', withAuth, (req, res) => {
  // custom static method created in models/Vent.js
  Vent.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Vent.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbVentData => {
      if (!dbVentData) {
        res.status(404).json({ message: 'No vent found with this id' });
        return;
      }
      res.json(dbVentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Vent.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbVentData => {
      if (!dbVentData) {
        res.status(404).json({ message: 'No vent found with this id' });
        return;
      }
      res.json(dbVentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
