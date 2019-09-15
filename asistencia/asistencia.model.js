const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
  userId : String,
  sede : String,  
}, {
    timestamps: true
  });

module.exports = mongoose.model('asistencias', sucursalSchema);
