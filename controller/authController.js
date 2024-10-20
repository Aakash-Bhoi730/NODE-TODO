const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        message: "Error hashing password",
      });
    }
    const user = new User({
      username,
      password: hashedPassword,
    });
    user
      .save()
      .then(() =>
        res.status(201).json({
          message: "User Registered Successfully",
        })
      )
      .catch((err) =>
        res.status(400).json({
          message: "Error in registration",
        })
      );
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user)
        return res.status(400).json({
          message: "User Not Found",
        });

      // Use callback for password comparison
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({
            message: "Error comparing Password",
          });
        }
        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }

        const token = jwt.sign({ id: user.id }, "SECRET", { expiresIn: "1h" });
        res.json({
          token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server Error",
      });
    });
};

module.exports = {
  login,
  register,
};
