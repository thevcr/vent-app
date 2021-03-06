const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Vent, User, Comment, Upvote, Downvote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
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
      res.json(dbVentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Vent.create({
    title: req.body.title,
    vent_text: req.body.vent_text,
    user_id: req.session.user_id
  })
    .then(dbVentData => res.json(dbVentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upvote', withAuth, (req, res) => {
  // pass session id along with all destructured properties on req.body
  Vent.upvote({ ...req.body, user_id: req.session.user_id }, { Upvote, Comment, User })
    .then(updatedUpvoteData => res.json(updatedUpvoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/downvote', withAuth, (req, res) => {
  // pass session id along with all destructured properties on req.body
  Vent.downvote({ ...req.body, user_id: req.session.user_id }, { Downvote, Comment, User })
    .then(updatedDownvoteData => res.json(updatedDownvoteData))
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
