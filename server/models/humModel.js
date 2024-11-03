const db = require('../config/db');

// Fetch humidity
const getHum = (filter, callback) => {
    let query = 'SELECT * FROM humidity';
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

// Add new humidity data point
const addHum = (val, coverage, callback) => {
    let query = 'INSERT INTO humidity (val, coverage) VALUES (?, ?)';

    db.query(query, [val, coverage], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.insertId);
        }
    });
};


module.exports = {
    getHum,
    addHum,
};
