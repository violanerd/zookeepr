const router = require('express').Router();
const { zookeepers } = require('../../data/zookeepers.json');
const {filterByQuery, findById, createNewZookeeper, validateZookeeper} = require("../../lib/zookeepers");

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

router.get('/zookeeprs/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Error - we are unable to find that!');
    }
})

router.post('/zookeepers', (req, res) => {
    console.log('req.body', req.body);
    req.body.id = zookeepers.length.toString();
  
    if (!validateZookeeper(req.body)){
        res.status(400).send('Zookeeper was improperly formatted');
    }
    else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;