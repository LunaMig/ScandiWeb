const express = require("express");
const app = express();
const mysql = require("mysql");

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.db = mysql.createConnection(
    process.env.CLEARDB_DATABASE_URL ||
      "mysql://b174aa75d15a10:84698536@eu-cdbr-west-01.cleardb.com/heroku_668e1ec018830fc?reconnect=true"
  )
  req.db.connect();
  next()
})

app.use(function(req, res, next) {
  console.log("before");

  res.on("finish", function() {
    req.db.end();
  });

  next();
});

app.post("/create", (req, res) => {
  return req.db.query(
    "INSERT INTO products (sku, name, price, productType, specification) VALUES (?,?,?,?,?)",
    Object.values(req.body),
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err)
      } else {
        res.json({ success: true, message: 'Values inserted' });
      }
    }
  );
});

app.get("/products", (req, res) => {
  return req.db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      res.send(result);
    }
  });
});

app.put("/setId", (req, res) => {
  const id = req.body.id;
  req.db.query("UPDATE products SET id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/delete/", (req, res) => {
  console.log(req.body.skus);
  req.db.query(
    "DELETE FROM products WHERE sku IN (?)",
    [req.body.skus.join(", ")],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(process.env.PORT || 8000, () => {
  console.log("running");
});
