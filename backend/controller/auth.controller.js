const { v4 } = require("uuid");
const { read_file, write_file } = require("../api/file-system");

const register = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "name required" });
    }

    const users = read_file("register.json");

    const newUser = {
      id: v4(),
      name: name.trim(),
      email,
      password
    };
    users.push(newUser);

    write_file("register.json", users);

    res.status(200).json({
      message: "Registered",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register };
