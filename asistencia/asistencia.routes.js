module.exports = (app) => {
    const asistencias = require('./asistencia.controller.js');

    app.post('/asistencias', asistencias.create);

    app.get('/asistencias', asistencias.findAll);

    app.get('/asistencias/:userId', asistencias.setAsistencia);

    app.get('/asistencias/:asistenciaId', asistencias.findOne);

    app.post('/asistencias/validar/', asistencias.findUser);

    app.put('/asistencias/:asistenciaId', asistencias.update);

    app.delete('/asistencias/:asistenciaId', asistencias.delete);
}
