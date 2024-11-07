const db = require('../config/db');

// Fetch temperature
const getTemp = (filter, callback) => {
    let query = 'SELECT * FROM temperature';
    const queryParams = [];

    if (filter.recorded_at){
        const {$gte, $lte} = filter.recorded_at;
        if ($gte, $lte){
            query += ' WHERE recorded_at BETWEEN ? AND ? ';
            queryParams.push($gte, $lte);
        }
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
