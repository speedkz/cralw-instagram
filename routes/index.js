const express = require('express');
var cors = require('cors');
const router = express.Router();
router.use(cors());
const postcontroller = require('../controller/post_controller');
const filmController = require('../controller/bilutv_controller');
const tikiController = require('../controller/tiki_controller');
const employeeController = require("../controller/employee_controller");
const sharpController = require("../controller/sharp_controller");
const gaiXinhChonLocController = require("../controller/gai_xinh_chon_loc_controller");
const smartboxController = require("../controller/smart_box_controller");
const userController = require("../controller/user_controller");
const tiktokController = require("../controller/tiktok_controller");

router.post('/add-post', postcontroller.addPost);
router.get('/posts', postcontroller.showPost);
router.get('/post/:id', postcontroller.singlePost);
router.post('/post-update', postcontroller.updatePost);
router.delete('/remove-post/:id', postcontroller.deletePost);

//#region Bilutv
router.get('/add-film', filmController.addFilm);
//#endregion

//#region Tiki
router.get('/tiki-add-laptop-gaming', tikiController.addLaptopGaming);
router.get('/tiki-add-laptop', tikiController.addLaptop);
router.get('/tiki-add-macbook', tikiController.addMacbook);

router.get('/api/get-tiki-laptop-gaming', tikiController.getLaptopGaming);
router.get('/get-tiki-laptop', tikiController.addLaptop);
router.get('/get-tiki-macbook', tikiController.addMacbook);
//#endregion

//#region Employee
router.get("/api/employee/get-all", employeeController.getAll);

//#region Sharp
router.get("/api/sharp", sharpController.resizeImages);

//#region GaiXinhChonLoc
router.get("/gai-xinh-chon-loc", gaiXinhChonLocController.addImages);
module.exports = router;

//#region EVN smartbox
router.get("/api/get-ds-ban-phong", smartboxController.getDsBanPhong)
router.get("/api/get-sm-tiep-nhan-to-trinh", smartboxController.getSmTiepNhanTTinh)
router.get("/api/ds-nhan-vien", smartboxController.searchEmployee)
router.get("/api/ds-file-y-kien", smartboxController.searchFileYKien)

//#region Authen
router.post("/api/authorize-user", userController.authorizeUser)
router.post("/api/add-user", userController.addUser)

//#region tiktok
router.post("/api/tiktok/login-with-email", tiktokController.loginWithEmail)