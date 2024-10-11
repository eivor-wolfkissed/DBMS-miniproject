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
// Product CRUD
app.get('/products', (req, res) => {
    new sql.Request().query('SELECT * FROM PRODUCT', (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result.recordset);
    });
});

app.post('/products', (req, res) => {
    const { product_id, product_name, price, expiration_date, brand } = req.body;
    const query = `INSERT INTO PRODUCT (product_id, product_name, price, expiration_date, brand) VALUES ('${product_id}', '${product_name}', '${price}', '${expiration_date}', '${brand})`;
    
    new sql.Request().query(query, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send('Product added successfully');
    });
});

// Employee CRUD
app.get('/employees', (req, res) => {
    new sql.Request().query('SELECT * FROM EMPLOYEE', (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result.recordset);
    });
});

app.post('/employees', (req, res) => {
    const { employee_id, fname, lname, dept_id, dob, salary } = req.body;
    const query = `INSERT INTO EMPLOYEE (employee_id, fname, lname, dept_id, dob, salary) VALUES ('${employee_id}', '${fname}', '${lname}', '${dept_id}', '${dob}', '${salary}')`;
    
    new sql.Request().query(query, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send('Employee added successfully');
    });
});

// Department CRUD
app.get('/departments', (req, res) => {
    new sql.Request().query('SELECT * FROM DEPARTMENT', (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result.recordset);
    });
});

app.post('/departments', (req, res) => {
    const { dept_id, dept_name, dept_type, dept_mgr_ssn } = req.body;
    const query = `INSERT INTO DEPAERMENT (dept_id, dept_name, dept_type, dept_mgr_ssn) VALUES ('${dept_id}', '${dept_name}', '${dept_type}', '${dept_mgr_ssn}')`;
    
    new sql.Request().query(query, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send('Department added successfully');
    });
});

// Sales Facts CRUD
app.get('/sales_facts', (req, res) => {
    new sql.Request().query('SELECT * FROM SALES_FACTS', (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result.recordset);
    });
});

app.post('/sales_facts', (req, res) => {
    const { sale_id, customer_id, product_id, unit_price, quantity } = req.body;
    const query = `INSERT INTO SALES_FACTS (sale_id, customer_id, product_id, unit_price, quantity) VALUES ('${sale_id}', '${customer_id}', '${product_id}', '${unit_price}', '${quantity}')`;
    
    new sql.Request().query(query, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send('sales facts added successfully');
    });
});
// Login (for authentication)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
