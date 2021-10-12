const router = require("express").Router();
const authControllers = require("../controllers/authControllers");

router.get("/signup", authControllers.signup_get);
router.get("/login", authControllers.login_get);
router.post("/signup", authControllers.signup_post);
router.post("/login", authControllers.login_post);
router.get("/logout", authControllers.logout_get);

module.exports = router;
