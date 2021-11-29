var db = require("./databaseConfig.js");

module.exports = {
    // get all tasks: GET /tasks
    getTask: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                const sql = "SELECT taskid, task, photo, date FROM task;";
                dbConn.query(sql, (error, results) => {
                    dbConn.end();
                    if (error) {
                        // change to morgan later
                        console.log("[GETTASK] Error!", error);
                        return callback(error, null);
                    } else {
                        console.log("[GETTASK] Success!");
                        return callback(null, results);
                    }
                });
            }
        });
    },

    // post new task: POST /tasks
    createTask: function (content, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                // task creation with photo
                if (content.photo) {
                    const sql = "INSERT INTO task(photo) VALUES(?)";
                    dbConn.query(sql, [content.photo], (error, results) => {
                        dbConn.end();
                        if (error) {
                            console.log("[CREATETASK] Error!", error);
                            return callback(error, null);
                        } else {
                            console.log("[CREATETASK] Success!");
                            return callback(null, results);
                        }
                    });

                    // task creation without photo
                } else {
                    const sql = "INSERT INTO task(task) VALUES(?)";
                    dbConn.query(sql, [content.task], (error, results) => {
                        dbConn.end();
                        if (error) {
                            console.log("[CREATETASK] Error!", error);
                            return callback(error, null);
                        } else {
                            console.log("[CREATETASK] Success!");
                            return callback(null, results);
                        }
                    });
                }
            }
        });
    },

    // update existing task: PUT /tasks
    updateTask: function (update, taskid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                // convert parsed content from client into JSON object
                update = JSON.parse(JSON.stringify(update));
                if (JSON.stringify(update) != "{}") {
                    // dynamic update of row according to data parsed in
                    const sql =
                        "UPDATE task SET " +
                        Object.keys(update)
                            .map((key) => `${key} = ?`)
                            .join(", ") +
                        " WHERE taskid = ?";
                    dbConn.query(sql, [...Object.values(update), taskid], (error, results) => {
                        dbConn.end();
                        if (error) {
                            console.log("[UPDATETASK] Error!", error);
                            return callback(error, null);
                        } else {
                            content_updated = true;
                            console.log("[UPDATETASK] Success!");
                            return callback(null, results);
                        }
                    });
                } else {
                    console.log("[UPDATETASK] Success!");
                    return callback(null);
                }
            }
        });
    },

    // delete existing task: DELETE /tasks/id
    deleteTask: function (taskid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                const sql = "DELETE FROM task WHERE taskid = ?";
                dbConn.query(sql, [taskid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error);
                        console.log("[DELETETASK] Error!", error);
                        return callback(error, null);
                    } else {
                        console.log("[DELETETASK] Success!");
                        return callback(null, results);
                    }
                });
            }
        });
    },
};
