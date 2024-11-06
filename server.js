const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',  // Replace with your MySQL username
    password: 'yourPassword',  // Replace with your MySQL password
    database: 'auth_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hash, email], (err, results) => {
                if (err) throw err;
                res.status(201).json({ message: 'User registered' });
            });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (results.length === 0) return res.status(401).json({ message: 'Invalid username or password' });

        bcrypt.compare(password, results[0].password, (err, result) => {
            if (result) return res.status(200).json({ message: 'Login successful' });
            res.status(401).json({ message: 'Invalid username or password' });
        });
    });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
