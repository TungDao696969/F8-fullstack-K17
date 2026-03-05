const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_PATH = path.join(__dirname, "data", "users.json");
app.use(express.json());

async function readUsers() {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(data);
}

async function writeUsers(users) {
  await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2));
}

app.get("/users", async (req, res) => {
  try {
    const users = await readUsers();
    const { q } = req.query;

    if (!q) {
      return res.status(200).json(users);
    }

    const keyword = q.toLowerCase();

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword),
    );

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const users = await readUsers();
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(404).json({ message: "Name and email are required" });
    }

    const users = await readUsers();
    const newUser = {
      id: Date.now(),
      name,
      email,
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const id = Number(req.params.id);

    const users = await readUsers();

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) users[index].name = name;
    if (email !== undefined) users[index].email = email;

    await writeUsers(users);
    res.status(200).json(users[index]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const users = await readUsers();

    const filtered = users.filter((u) => u.id !== id);

    if (filtered.length === users.length) {
      return res.status(404).json({ message: "User not found" });
    }

    await writeUsers(filtered);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Đang chạy với http://localhost:${PORT}`);
});
