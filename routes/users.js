const { Router } = require("express");

const router = Router();

const { userGet, userPost, userGetId } = require("../controllers/users");

router.get("/", userGet);
router.get("/:id", userGetId);

router.post("/", userPost);

module.exports = router;
