const mysql = require("mysql");

// Database Details
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// View user homepage
exports.view = (req, res) => {
  // Connect to Database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Home Connect as ID " + connection.threadId);

    // Query all user data
    connection.query("SELECT * FROM user", (err, rows) => {
      connection.release();

      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
    });
  });
};

// Find user using search bar
exports.find = (req, res) => {
  // Connect to Database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect as ID " + connection.threadId);

    let searchString = req.body.search;

    // Query user data based on search
    connection.query(
      "SELECT * FROM user WHERE name LIKE ? OR matric_id LIKE ?",
      ["%" + searchString + "%", "%" + searchString + "%"],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.viewAddUser = (req, res) => {
  res.render("addUser");
};

// Add new user to the system database
exports.add = (req, res) => {
  const { name, matric_id, email, course, company } = req.body;

  // Connect to Database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect as ID " + connection.threadId);

    // Add user data into database
    connection.query(
      "INSERT INTO user SET matric_id = ?, name = ?, course = ?, company = ?, email = ?",
      [matric_id, name, course, company, email],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("addUser", {
            alert: "added",
          });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// View the data of selected data
exports.viewEditUser = (req, res) => {
  // Get selected user ID
  const userID = req.params.id;

  // Connect to Database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect as ID " + connection.threadId);

    // Query specified user data
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [userID],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("editUser", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Update the existing user data
exports.edit = (req, res) => {
  // Get selected user ID
  const userID = req.params.id;
  const { name, matric_id, email, course, company } = req.body;

  // Connect to Database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect as ID " + connection.threadId);

    // Query specified user data
    connection.query(
      "UPDATE user SET matric_id = ?, name = ?, course = ?, company = ?, email = ? WHERE id = ?",
      [matric_id, name, course, company, email, userID],
      (err, rows) => {
        connection.release();

        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log("Connect as ID " + connection.threadId);

            // Query specified user data
            connection.query(
              "SELECT * FROM user WHERE id = ?",
              [userID],
              (err, rows) => {
                connection.release();

                if (!err) {
                  res.render("editUser", {
                    rows,
                    alert: "Student Data has been successfully updated!",
                  });
                } else {
                  console.log(err);
                }
              }
            );
          });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Delete user from system databse
exports.delete = (req, res) => {
  // Get selected user ID
  const userID = req.params.id;

  // Connect to Database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect as ID " + connection.threadId);

    // Query all user data
    connection.query("DELETE FROM user WHERE id = ?", [userID], (err, rows) => {
      connection.release();

      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  });
};

exports.viewUser = (req, res) => {
  // Get selected user ID
  const userID = req.params.id;

  // Connect to Database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect as ID " + connection.threadId);

    // Query specified user data
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [userID],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("viewUser", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};
