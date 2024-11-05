const tempModel = require('../models/tempModel');

// Controller to get temperature
const getTemp = (req, res) => {
    const filters = {
        date: req.query.date ? req.query.date : undefined,
    }
    tempModel.getTemp(filters, (err, temps) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
          const timeZone = 'America/Los_Angeles';
          // Convert each date in temps to PST
          /*const tempsWithPST = temps.map(temp => {
            const dateInUTC = new Date(temp.recorded_at);
            const dateInPST = new Date(dateInUTC.getTime() - 8 * 60 * 60 * 1000);

            const dateInPSTFormatted = dateInPST.toISOString().slice(0, -1) + "Z";
            
            return {
              ...temp,
              recorded_at: dateInPSTFormatted
            };
        });*/
        res.json();
        }
    });
};

// Controller to add a temp data point
const addTemp = (req, res) => {
  const { val, coverage } = req.body;
  tempModel.addTemp(val, coverage, (err, id) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Data added successfully', id });
    }
  });
};

module.exports = {
  getTemp,
  addTemp,
};
