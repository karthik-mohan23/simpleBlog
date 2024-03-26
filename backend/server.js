import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(3000, () => console.log("server running on PORT 3000"));
