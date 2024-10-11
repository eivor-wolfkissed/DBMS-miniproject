const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
    user: 'root',
    password: 'rohit123',
    server: 'localhost',
    database: 'supermarket',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// SQL Server Connection
sql.connect(dbConfig, err => {
    if (err) {
        console.log("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to SQL Server!");
});

// Authentication Middleware

// Routes
// Customer CRUD
app.get('/customers', (req, res) => {
    new sql.Request().query('SELECT * FROM CUSTOMER', (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result.recordset);
    });
});

app.post('/customers', (req, res) => {
    const { fname, lname, address, account_no } = req.body;
    const query = `INSERT INTO CUSTOMER (fname, lname, address, account_no) VALUES ('${fname}', '${lname}', '${address}', '${account_no}')`;
    
    new sql.Request().query(query, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send('Customer added successfully');
    });
});

// More CRUD operations for other entities...

// Login (for authentication)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
