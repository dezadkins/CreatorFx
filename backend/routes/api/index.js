const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const fxRouter = require("./fx.js");
const profilesRouter = require("./profile.js");
const searchRouter = require("./search.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.use("/fxes", fxRouter);
router.use("/profiles", profilesRouter);
router.use("/search", searchRouter);
module.exports = router;
