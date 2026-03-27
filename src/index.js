import express from "express";
import { matchRouter } from "./routes/matches.js";

const app = express();
const PORT = 8000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/matches", matchRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
