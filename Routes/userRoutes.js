
const {Registration , login , dashboardmsg , getAllUser , VerifyUserEmail} = require('../controllers/userController');

const{authenticateToken} = require('../middleware/authToken');
const express = require('express') ;
const Router = express.Router();


Router.post('/registration' , Registration );
Router.post('/login' , login);
Router.get('/dashboard', authenticateToken , dashboardmsg)
Router.get('/Alluser' ,  getAllUser )
Router.get('/verify/:id/:token',VerifyUserEmail )

module.exports = Router