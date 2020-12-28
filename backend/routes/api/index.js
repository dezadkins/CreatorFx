const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
// // GET /api/set-token-cookie
// const asyncHandler = require("express-async-handler");
// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");
// router.get(
//   "/set-token-cookie",
//   asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: "Demo-lition",
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );
// //check whether or not the req.user key has
// // been populated by middleware properly
// const { restoreUser } = require("../../utils/auth.js");
// router.get("/restore-user", restoreUser, (req, res) => {
//   return res.json(req.user);
// });

// // will return an error if there is no session user, otherwise
// // return the session user's information.
// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
