const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const jwt = require("jsonwebtoken");
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/pension-management-service",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`pension-management service DB  Connected`);
  }
);


// login

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ sucess: 0, message: "User dose not exist" });
  } else {
    if (password !== user.password) {
      return res.json({ sucess: 0, message: "Incorrect password" });
    }
    const payload = {
      email,
      name: user.name,
    };
    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else {
        return res.json({ token: token });
      }
    });
  }
});


app.listen(PORT, () => {
  console.log(`Auth service at ${PORT}`);
});