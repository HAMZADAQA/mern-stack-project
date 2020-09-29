const router = require('express').Router();
const Exercise = require('../models/exercise.model');

//Handles incoming HTTP GET requests for /exercises URL
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

/*** Handles incoming HTTP POST requests ***/

// Create new exercise
router.route('/add').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
    .then(() => res.json('Exercise added !'))
    .catch(err => res.status(400).json('Error = ' + err))
})

// Get exercise by ID
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Delete exercise
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Update exercise
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercises => {
        exercises.username = req.body.username
        exercises.description = req.body.description
        exercises.duration = Number(req.body.duration)
        exercises.date = Date.parse(req.body.date)

        exercises.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router