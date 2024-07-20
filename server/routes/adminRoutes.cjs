const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController.cjs');


adminRouter.get('/saveAdmin', adminController.saveAdmin);
adminRouter.post('/login', adminController.authenticate);
adminRouter.post('/changePassword', adminController.changePassword);
adminRouter.post('/deleteAllData', adminController.deleteAllData);


module.exports = adminRouter;
