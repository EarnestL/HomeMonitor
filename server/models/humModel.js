const db = require('../config/db');

// Fetch temperature
const getHum = (filter, callback) => {
    let query = 'SELECT * FROM humidity';
    const queryParams = [];

    if (filter.recorded_at){
        const {$gte, $lte} = filter.recorded_at;
        if ($gte, $lte){
            query += ' WHERE recorded_at BETWEEN ? AND ? ';
            queryParams.push($gte, $lte);
        }
    } else if (filter.recent){
        query += ' WHERE recorded_at = (SELECT MAX(recorded_at) FROM humidity) ';
    }
    
    db.query(query, queryParams, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const getHumZ = (callback) => {
    const query = `WITH LatestTime AS (
        SELECT TIME(MAX(recorded_at)) AS target_time
        FROM humidity
    ),
    RankedHumidities AS (
        SELECT 
            *,
            ROW_NUMBER() OVER (
                PARTITION BY DATE(recorded_at)
                ORDER BY ABS(TIMESTAMPDIFF(SECOND, recorded_at, 
                    CONCAT(DATE(recorded_at), ' ', (SELECT target_time FROM LatestTime))
                )) ASC
            ) AS rn
        FROM humidity
        WHERE recorded_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    )
    
    SELECT *
    FROM RankedHumidities
    WHERE rn = 1
    ORDER BY recorded_at;`;

    db.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}
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
    getHumZ,
    addHum,
};