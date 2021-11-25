// import required dependancies
const express = require("express");
const path = require("path");

// initialise express
const app = express();

const PORT = 3031;
app.use(express.static(path.join(__dirname, "public")));

// endpoints
app.get("/", (req, res) => {
    res.sendFile("/views/index.html", { root: __dirname });
});

// 404 page
app.all("*", function(req, res) {
    res.sendFile("/views/404.html", { root: __dirname });
});

// log
app.listen(PORT, () => {
    console.log(`Client server has started listening on port ${PORT}`);
});