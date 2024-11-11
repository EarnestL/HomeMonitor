const tempModel = require('../models/tempModel');

// Controller to get temperature
const getTemp = (req, res) => {
    const {pastDay, pastWeek, recent} = req.query;

    let filter = {};

    const now = new Date();
  
    if (pastDay === 'true'){
      const pastDay = new Date(now);
      pastDay.setUTCDate(pastDay.getUTCDate() - 1);
      filter = { recorded_at: {$gte: pastDay.toISOString(), $lte: now.toISOString()}};
    }
    else if (pastWeek === 'true'){
      const pastWeek = new Date(now);
      pastWeek.setUTCDate(pastWeek.getUTCDate() - 7);
      filter = {recorded_at: {$gte: pastWeek.toISOString(), $lte: now.toISOString()}};
    }
    else if (recent == 'true'){
      filter = {recent: true};
    }

    tempModel.getTemp(filter, (err, temps) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
          const timeZone = 'America/Los_Angeles';
          // Convert each date in temps to PST
          const tempsWithPST = temps.map(temp => {
            const dateInUTC = new Date(temp.recorded_at);
            const dateInPST = new Date(dateInUTC.getTime() - 0 * 60 * 60 * 1000);

            const dateInPSTFormatted = dateInPST.toISOString().slice(0, -1) + "Z";
            
            return {
              ...temp,
              recorded_at: dateInPSTFormatted
            };
        });
        res.json(temps);
        }
    });
};

const getTempZ = (req, res) => {
  tempModel.getTempZ((err, temps) => {
    if (err) {
        res.status(500).json({ error: err.message });
    } else {
      const timeZone = 'America/Los_Angeles';
      // Convert each date in temps to PST
      const tempsWithPST = temps.map(temp => {
        const dateInUTC = new Date(temp.recorded_at);
        const dateInPST = new Date(dateInUTC.getTime() - 0 * 60 * 60 * 1000);

        const dateInPSTFormatted = dateInPST.toISOString().slice(0, -1) + "Z";
        
        return {
          ...temp,
          recorded_at: dateInPSTFormatted
        };
    });
    res.json(temps);
    }
});

}

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
  getTempZ,
  addTemp,
};
