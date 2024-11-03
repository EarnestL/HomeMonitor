const db = require('../config/db');

// Fetch temperature
const getTemp = (filter, callback) => {
    let query = 'SELECT * FROM temperature';
    const queryParams = [];

    if (filter.date){
        query += ' WHERE DATE(recorded_at) = ?';
        queryParams.push(filter.date);
    }
    
    db.query(query, queryParams, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

// Add new temperature data point
const addTemp = (val, coverage, callback) => {
    let query = 'INSERT INTO temperature (val, coverage) VALUES (?, ?)';

    db.query(query, [val, coverage], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.insertId);
        }
    });
};


module.exports = {
    getTemp,
    addTemp,
};
