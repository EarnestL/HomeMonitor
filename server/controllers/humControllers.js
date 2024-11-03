const humModel = require('../models/humModel');

// Controller to get humidity
const getHum = (req, res) => {
    const filters = {
        date: req.query.date ? req.query.date : undefined,
    }
    humModel.getHum(filters, (err, hums) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(hums);
        }
    });
};

// Controller to add a temp data point
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
  addHum,
};
