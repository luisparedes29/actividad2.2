var express = require('express');
const fs = require('fs');
var router = express.Router();


//cambiar datos de pacientes
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let params = { nombre, sexo, edad, historialMedico, numeroContacto, numeroFamilar, direccion } = req.body;
    function cambiar(id, params) {
        const data = fs.readFileSync('./pacientes.json', 'utf-8');
        const pacientes = JSON.parse(data);

        for (let i = 0; i < pacientes.length; i++) {
            if (id == pacientes[i].id) {
                console.log('id lo mismo');
                for (let key in params) {
                    if (pacientes[i][key]) {
                        pacientes[i][key] = params[key];
                    }
                }
            }else{
                res.status(400).send("Id no existe")
            }
        }
        const str = JSON.stringify(pacientes);
        console.log(str);

        //luego escribimos los datos aqui
        fs.writeFileSync('pacientes.json', str, 'utf-8')
        res.status(200).send("Datos del paciente actualizados correctamente");
    }
    cambiar(id, params);
})
// cambiar numero de cama del paciente
router.put('/modificar-uci/:id', (req, res) => {
    let id_habitacion = req.params.id;
    let params = { numeroHabitacion } = req.body
    function cambiar(id, params) {
        const data = fs.readFileSync('./pacientes-uci.json', 'utf-8');
        const pacientes = JSON.parse(data);
        for (let i = 0; i < pacientes.length; i++) {
            if (id == pacientes[i].id_habitacion) {
                console.log('id lo mismo');
                if (isNaN(numeroHabitacion) === false) {
                    if (numeroHabitacion < 100) {
                        const found = pacientes.some(el => el.numeroHabitacion === numeroHabitacion);
                    if (!found) {
                        for (let key in params) {
                            if (pacientes[i][key]) {
                                pacientes[i][key] = params[key];
                            }
                        }

                    } else {
                        res.status(400).send("Esta habitacion ya esta en uso")
                    }

                    }else{
                        res.status(400).send("El numero de habitacion debe ser menor a 100")
                    }
                    

                } else {
                    res.status(400).send("El campo de numeroHabitacion debe ser numerico")
                }

            }else{
                res.status(400).send("Id no existe");
            }
        }
        const str = JSON.stringify(pacientes);
        console.log(str);
        //luego escribimos los datos aqui
        fs.writeFileSync('pacientes-uci.json', str, 'utf-8')
        res.status(200).send("Datos del paciente actualizados correctamente");

    }
    cambiar(id_habitacion, params);
})

module.exports = router;