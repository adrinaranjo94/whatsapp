/*
    path: 
*/

const { Router } = require("express");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

// Create new users
router.post(
  "/new",
  [
    check("name", "name is empty").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is empty").not().isEmpty(),
    validateFields,
  ],
  createUser
);

// Login
router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is empty").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

// Refresh token
router.get("/renew", validateJWT, renewToken);

module.exports = router;
