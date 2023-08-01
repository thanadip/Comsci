const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const port = 5001;

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gallery",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected successfully');
});


app.listen(port, () => {
  console.log("Backend connected");
});


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend ");
});

function generateToken(user) {
  const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });
  return token;
}


app.post('/login', async (req ,res) => {

  const {username, password } = req.body;

  try {
    const existingUser = await new Promise((resolve, reject)=>{

      db.query('SELECT * FROM users WHERE username = ?',[username],(err,data)=>{

        if(err) reject(err);
        else resolve(data);

      });
    })

    if (existingUser.length === 0){
      return res.status(401).json({message:'Invalid inputs'});
    }

    const storedPassword = existingUser[0].password;
    bcrypt.compare(password,storedPassword ,(err,result) => {

      if(err || !result){
        return res.status(401).json({ message: 'Invalid inputs' });
      }

      const user = {
        id: existingUser[0].id,
        username: existingUser[0].username,
        user_email: existingUser[0].user_email,
        password: existingUser[0].password,
        user_phone: existingUser[0].user_phone,
        user_type_id: existingUser[0].user_type_id,

      };
      const token = generateToken(user);
      return res.status(200).json({ message: 'Login successful', token: token ,user_type_id: user.user_type_id , username: user.username});

    })


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, user_email, password } = req.body;

    // Check if the email already exists
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE user_email = ?', [user_email], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash the password before saving it in the database
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error while hashing password' });
      }

      // Save the user information (including the hashed password) to the database
      await new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, user_email, password) VALUES (?, ?, ?)', [username, user_email, hashedPassword], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      res.status(201).json({ message: 'Registration successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

