const express = require("express");
const authRoutes = require("./routes/auth.routes");
const app = express();

app.use(express.json({ extended: false }));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
