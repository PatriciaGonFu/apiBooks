const { Router } = require("express");
const router = Router();
const usersCtrl = require("../controller/user.controller");

router.get("/", usersCtrl.getStart);
router.post("/register", usersCtrl.postRegister); 
router.post("/login", usersCtrl.postLogin);
router.put("/users/:id_user", usersCtrl.putUsuarios); 

module.exports = router;