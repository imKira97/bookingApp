const User = require("../model/user");

exports.getUsers = async (req, res, next) => {
  await User.findAll()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.insertUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    console.log(phone);
    if (name === "" || email === "" || phone === "") {
      throw new Error("All fields are required");
    } else {
      const data = await User.create({
        name: name,
        email: email,
        phoneNo: phone,
      });
      console.log(data);
      res.status(201).json({ message: "user created", data: data });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    console.log(email);
    //The findOne method obtains the first entry it finds (that fulfills the optional query options, if provided).
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User not found");
    } else {
      await user.destroy();
      res.status(200).json({ message: "user deleted" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.get404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
};
