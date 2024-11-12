const humModel = require('../models/humModel');

// Controller to get temperature
const getHum = (req, res) => {
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

    humModel.getHum(filter, (err, hums) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
          const timeZone = 'America/Los_Angeles';
          // Convert each date in temps to PST
          const humWithPST = hums.map(hum => {
            const dateInUTC = new Date(hum.recorded_at);
            const dateInPST = new Date(dateInUTC.getTime() - 0 * 60 * 60 * 1000);

            const dateInPSTFormatted = dateInPST.toISOString().slice(0, -1) + "Z";
            
            return {
              ...hum,
              recorded_at: dateInPSTFormatted
            };
        });
        res.json(hums);
        }
    });
};

const getHumZ = (req, res) => {
  humModel.getHumZ((err, hums) => {
    if (err) {
        res.status(500).json({ error: err.message });
    } else {
      const timeZone = 'America/Los_Angeles';
      // Convert each date in temps to PST
      const humsWithPST = hums.map(hum => {
        const dateInUTC = new Date(hum.recorded_at);
        const dateInPST = new Date(dateInUTC.getTime() - 0 * 60 * 60 * 1000);

        const dateInPSTFormatted = dateInPST.toISOString().slice(0, -1) + "Z";
        
        return {
          ...hum,
          recorded_at: dateInPSTFormatted
        };
    });
    res.json(hums);
    }
});

}

// Controller to add a hum data point
const addHum = (req, res) => {
  const { val, coverage } = req.body;
  humModel.addHum(val, coverage, (err, id) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Data added successfully', id });
    }
  });
};

module.exports = {
  getHum,
  getHumZ,
  addHum,
};