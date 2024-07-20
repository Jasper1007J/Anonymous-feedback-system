const express = require('express');
const hodRouter = express.Router();

const hodController = require('../controllers/hodController.cjs');


hodRouter.post('/authenticateHod', hodController.authenticateHod);
hodRouter.post('/fetchFacultyList', hodController.fetchFacultyList);
hodRouter.get('/:hodName', hodController.fetchProfile);
hodRouter.post('/changePassword', hodController.changePassword);
hodRouter.post('/toggleAccess', hodController.toggleAccess);
hodRouter.get('/getAccess/:department', hodController.getAccess);



module.exports = hodRouter;