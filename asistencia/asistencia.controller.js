const Asistencia = require('./asistencia.model.js');

//Create new Asistencia
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const asistencia = new Asistencia({
      Nombres : req.body.Nombres,
      ApellidoMaterno : req.body.ApellidoMaterno,
      ApellidoPaterno : req.body.ApellidoPaterno,
      Correo : req.body.Correo,
      CorreoPersonal : req.body.CorreoPersonal,
      FechaNacimiento : req.body.FechaNacimiento,
      Rut : req.body.Rut,
      Profesion : req.body.Profesion,
      Direccion : req.body.Direccion,
      Numero : req.body.Numero,
      Rol : req.body.Rol,
      Sede : req.body.Sede,
      Clave : req.body.Clave,
    });

    asistencia.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las Asistenciaes."
        });
    });
};

exports.setAsistencia = (req,res)=>{
  const asistencia = new Asistencia({
    userId : req.params.userId,
  });
  asistencia.save()
  .then(data => {
    res.send(data);
  }).catch( err =>{
    res.status(500).send({
        message: err.message || " Error en crear las Asistenciaes."
    });
  })
};
// Retrieve all Asistenciaes from the database.
exports.findAll = (req, res) => {
    Asistencia.find()
    .then(Asistenciaes => {
        res.send(Asistenciaes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las Asistenciaes."
        });
    });
};
exports.findByRol = (req, res) => {
    Asistencia.find({Rol:req.params.AsistenciaId})
    .then(Asistenciaes => {
        res.send(Asistenciaes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las Asistenciaes."
        });
    });
};


exports.findUser = (req, res) => {
    Asistencia.find( {Correo : req.body.Correo , Clave : req.body.Clave } )
    .then(Asistencia => {
        if(!Asistencia) {
            return res.status(404).send({
                message: "No se encontro Asistencia"
            });
        }
        res.send(Asistencia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado correo   " + req.body.Correo
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar el Asistencia "
        });
    });
};
// Find a single Asistencia with a AsistenciaId
exports.findOne = (req, res) => {
    Asistencia.findById(req.params.AsistenciaId)
    .then(Asistencia => {
        if(!Asistencia) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.AsistenciaId
            });
        }
        res.send(Asistencia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado Asistencia  " + req.params.AsistenciaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.AsistenciaId
        });
    });
};


exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Asistencia content can not be empty"
        });
    }

    Asistencia.findByIdAndUpdate(req.params.AsistenciaId, {
      Nombres : req.body.Nombres,
      ApellidoMaterno : req.body.ApellidoMaterno,
      ApellidoPaterno : req.body.ApellidoPaterno,
      Correo : req.body.Correo,
      CorreoPersonal : req.body.CorreoPersonal,
      FechaNacimiento : req.body.FechaNacimiento,
      Rut : req.body.Rut,
      Profesion : req.body.Profesion,
      Direccion : req.body.Direccion,
      Numero : req.body.Numero,
      Rol : req.body.Rol,
      Sede : req.body.Sede,
      Clave : req.body.Clave,
    }, {new: true})
    .then(Asistencia => {
        if(!Asistencia) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.AsistenciaId
            });
        }
        res.send(Asistencia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.AsistenciaId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.AsistenciaId
        });
    });
};

exports.delete = (req, res) => {
    Asistencia.findByIdAndRemove(req.params.AsistenciaId)
    .then(Asistencia => {
        if(!Asistencia) {
            return res.status(404).send({
                message: "Asistencia no encontrado id " + req.params.AsistenciaId
            });
        }
        res.send({message: "Asistencia borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Asistencia no encontrado id " + req.params.AsistenciaId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el Asistencia id " + req.params.AsistenciaId
        });
    });
};
