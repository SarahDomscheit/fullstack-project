import express from "express";
import todos from "./data/todos.json" with {type: "json"};
import users from "./data/users.json" with {type: "json"};
import cors from "cors"


const app = express();
const PORT = 5500;

// middleware
app.use(express.json());
app.use(cors())
app.post("/login", (req, res) => {const {username, password}= req.body;
const newUser = users.find((user)=>user.username === username && user.password === password)
 res.json(newUser)});

app.post("/todos", (req, res) => {
    const {userID} = req.body
    const userTodos = todos.filter((todo)=> todo.uID === userID)
    res.json(userTodos)});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
