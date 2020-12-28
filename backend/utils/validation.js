const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};

// fetch("/api/session", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `N0SYi1dm-ZXvBhN9Os0LhU8i0MrBzSMKxt1g`,
//   },
//   body: JSON.stringify({ credential: "", password: "" }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// fetch("/api/session", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `N0SYi1dm-ZXvBhN9Os0LhU8i0MrBzSMKxt1g`,
//   },
//   body: JSON.stringify({ credential: "Demo-lition", password: "" }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
