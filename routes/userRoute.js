const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("User test is successful");
});

router.post("/userposttest", (req, res) => {
  const { username } = req.body;
  console.log(username);
  res.send("User create is successful");
});

router.patch("/usertest", (req, res) => {
  res.send("User update is successful");
});

router.delete("/usertest", (req, res) => {
  res.send("User delete is successful");
});

module.exports = router;