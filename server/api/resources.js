const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

router.get('/api/resources', async function (req, res) {
    const resources = await Resource.findAll();
    res.status(200).json(resources);
});

router.get('/api/resources/:id', async function (req, res) {
    const resource = await Resource.findByPk(req.params.id);

    if(!resource){
        res.status(404).json({
            message: 'No resource found with given ID'
        });
    } else {
        res.status(200).json(resource);
    }

});

router.post('/api/resources', async function (req, res) {
    const { url, type } = req.body;

    if(!url || !type){
        res.status(400).json('Bad request, include a URL or type');
    }

    const resource =  await Resource.create({
        url: url,
        type: type
    });

    if(resource){
        res.status(201).json(resource);
    }

});

router.put('/api/resources/:id', async function (req, res) {
    const { url, type } = req.body;
    const resource = await Resource.findByPk(req.params.id);

    if(!resource) {
        res.status(404).json({
            message: 'No resource found with given ID to update'
        });
    } else {
        resource.url = url;
        resource.type = type;
        await resource.save();
        res.status(200).json(resource);
    }
});


router.delete('/api/resources/:id', async function (req, res) {
    const resource = await Resource.findByPk(req.params.id);
    if(!resource){
        res.status(404).json({
            message: 'No resource found with given ID to delete'
        });
    } else  {
        await resource.destroy();
        res.status(204).json();
    }
});

module.exports = router;