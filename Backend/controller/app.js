// import requiered dependancies
const express = require("express");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

// multer options
const storageTaskImg = multer.diskStorage({
    destination: "./public/taskimg/",
    filename: (req, file, callback) => {
        return callback(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// multer image filter
const filterImg = (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        callback(null, true);
    } else {
        callback(new Error("Unsupported file received"), false);
    }
};

// allow image files to be uploaded
const uploadTaskImg = multer({
    storage: storageTaskImg,
    fileFilter: filterImg,
});

// express settings
app.use(express.json()); //parse json input
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.options("*", cors());
app.use(cors());
app.use("/tasks", express.static("public/taskimg")); // serve taskimg photos on /tasks

// jwt encryption secret
const JWT_SECRET = require("../config.js");

// import model
const task = require("../model/task.js");

//
// ENDPOINTS
//

// get all tasks: GET /tasks
app.get("/tasks", function (req, res) {
    // call getTask from task.js to query sql database
    task.getTask(function (err, result) {
        if (!err) {
            res.status(200).json(result); // send response with status code
        } else {
            res.status(500).json({ Result: "Internal Error" }); // send error with status code
        }
    });
});

// post new task: POST /tasks
app.post("/tasks", uploadTaskImg.single("photo"), function (req, res) {
    // add new filename to req.body
    if (req.file != undefined) {
        req.body.photo = req.file.filename;
    }

    // call createTask from task.js to query sql database
    task.createTask(req.body, function (err, result) {
        if (!err) {
            // send response with status code
            res.status(201).header("Content-Type", "application/json").json({
                success: true,
                status: "Task Successfully Created",
            });
        } else {
            // send error with status code
            res.status(500).header("Content-Type", "application/json").json({
                success: false,
                status: "Internal Server Error",
            });
        }
    });
});

// update existing task: PUT /tasks/id
app.put("/tasks/:id", uploadTaskImg.single("photo"), function (req, res) {
    var id = req.params.id; // get id parameter from url

    // prevent taskid and date from being changed
    if (req.body.taskid || req.body.date) {
        if (req.file != undefined) {
            // remove uploaded photo
            try {
                fs.unlinkSync(`./public/taskimg/${req.file.filename}`);
                //file removed
            } catch (err) {
                console.error(err);
            }
        }
        res.status(500).send(); // send error with status code
    } else {
        // add new filename to req.body
        if (req.file != undefined) {
            req.body.photo = req.file.filename;
        }

        // call updateTask from task.js to query sql database
        task.updateTask(req.body, id, function (err, result) {
            if (!err) {
                res.status(204).send("Success"); // send response with status code
            } else {
                res.status(500).send(); // send error with status code
            }
        });
    }
});

// delete existing task: DELETE /tasks/id
app.delete("/tasks/:id", function (req, res) {
    var id = req.params.id; // get id parameter from url
    // call deleteTask from movie.js to query sql database
    task.deleteTask(id, function (err, result) {
        if (!err) {
            if (result.affectedRows == 0) {
                res.status(500).send();
            } else {
                res.status(204).send(); // send response with status code
            }
        } else {
            res.status(500).json({ Result: "Internal Error" }); // send error with status code
        }
    });
});

// 404
app.all("*", function (req, res) {
    res.status(404).send();
});

module.exports = app;
