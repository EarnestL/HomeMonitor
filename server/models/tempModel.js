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
    } else if (filter.recent){
        query += ' WHERE recorded_at = (SELECT MAX(recorded_at) FROM temperature) ';
    }
    
    db.query(query, queryParams, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const getTempZ = (callback) => {
    const query = `WITH LatestTime AS (
        SELECT TIME(MAX(recorded_at)) AS target_time
        FROM temperature
    ),
    RankedTemperatures AS (
        SELECT 
            *,
            ROW_NUMBER() OVER (
                PARTITION BY DATE(recorded_at)
                ORDER BY ABS(TIMESTAMPDIFF(SECOND, recorded_at, 
                    CONCAT(DATE(recorded_at), ' ', (SELECT target_time FROM LatestTime))
                )) ASC
            ) AS rn
        FROM temperature
        WHERE recorded_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    )
    
    SELECT *
    FROM RankedTemperatures
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
    getTempZ,
    addTemp,
};
