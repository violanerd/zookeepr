const router = require('express').Router();
const {filterByQuery, findById, createNewAnimal, validateAnimal} = require("../../lib/animals");
const { animals }= require('../../data/animals.json');

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res)=> {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send("Sorry we can't find that!");
    }
    
});

router.post('/animals', (req, res) => {
    // req.body is where our incoming content will be
    console.log('req.body', req.body);
    req.body.id = animals.length.toString(); //sets id based off of next index in array
    if (!validateAnimal(req.body)){
        res.status(400).send('Animal was improperly formatted');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;