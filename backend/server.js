const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
const dotenv = require("dotenv"); 
const notesController = require("./Controllers/notesController");
const cookieParser = require("cookie-parser");
const UserController=require("./Controllers/UserContoller");
const requireAuth=require("./Middleware/requireAuth");
dotenv.config();
// Create an express app

const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//routing
app.post("/signup", UserController.signup);
app.post("/login", UserController.login);
app.get("/logout", UserController.logout);
app.get("/check-auth", requireAuth, UserController.checkAuth);
app.get("/notes",notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.post("/notes", notesController.createNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
