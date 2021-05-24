const { check, validationResult } = require("express-validator");

exports.validateSignUpRequest = [
  check("first_Name").notEmpty().withMessage("First Name is required"),
  check("surName").notEmpty().withMessage("Last Name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.validateSigninRequest = [
    check("userName").notEmpty({ min: 6 }).withMessage("userName is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long"),
  ];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
