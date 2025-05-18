
const {Registration , login , dashboardmsg , getAllUser} = require('../controllers/userController');

const{authenticateToken} = require('../middleware/authToken');
const express = require('express') ;
const Router = express.Router();


Router.post('/registration' , Registration );
Router.post('/login' , login);
Router.get('/dashboard', authenticateToken , dashboardmsg)
Router.get('/Alluser' , authenticateToken, getAllUser )

module.exports = Router