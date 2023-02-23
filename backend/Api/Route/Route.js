const expres = require('express');
const routes = expres.Router();
const multer = require("multer");

const {CreateUser,UserList}= require("../Controller/User.Controller");


// ===========handel image========
multer({ dest: process.env.PATH_IMG });
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
        cb(null, true);
    } else {
        cb(null, false);
        console.log(`file Extension could not supportable. only support extension(.jpge, .png , .jpg)`);
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './' + process.env.PATH_IMG); },
    filename: function (req, file, cb) { cb(null, new Date() / 10 + 'module_' + file.originalname); }
});
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter, });



// ==================Users API's=========================
routes.post('/users',upload.single('image'),CreateUser);
routes.get('/users',UserList);

module.exports=routes; 


