const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const {
  s3,
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../awsS3");

const router = express.Router();

//Validation

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  singleMulterUpload("profilePic"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    let profilePicURL = null;
    if (req.file)
      profilePicURL = await singlePublicFileUpload(req.file, "prof-pics");

    const user = await User.signup({
      email,
      username,
      password,
      profilePicURL,
    });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
      limit: 6,
    });

    res.json(users);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    const user = await User.findByPk(userId);

    res.json(user);
  })
);

module.exports = router;

module.exports = router;
