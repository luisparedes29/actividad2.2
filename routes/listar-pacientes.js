var express = require('express');
var router = express.Router();
const fs = require('fs');


const data = fs.readFileSync('./pacientes.json', 'utf-8');
const pacientes = JSON.parse(data);
const data2 = fs.readFileSync('./pacientes-uci.json', 'utf-8');
const pacientes2 = JSON.parse(data2);

//mostrar todos los pacientes registrados
router.get('/', (req, res, next) => {
    res.status(200).json(pacientes);
});
//mostrat todos los pacientes ubicados en uci
router.get('/uci', (req, res, next) => {
    res.status(200).json(pacientes2);
});

//mostrar habitacion de uci de un paciente en especifico
router.get('/uci/:id', (req, res) => {
    let id = req.params.id;
    let lista = [];
    for (let i = 0; i < pacientes.length; i++) {
        // console.log("primero")
        if (id == pacientes[i].id) {
            //console.log("segundo")
            for (let j = 0; j < pacientes2.length; j++) {
                // console.log("tercero")
                if (id == pacientes2[j].id_paciente) {
                    //console.log("cuarto");
                    pacientes2[j].nombre = pacientes[i].nombre;
                    lista.push(pacientes2[j])
                } else {
                    return res.status(400).send("Este paciente no se encuentra en UCI o el id no existe")
                }

            }
            //console.log(pacientes[i])
        }
    }
    res.status(200).json(lista);

});

//mostrar datos del paciente segun id

router.get('/:id', (req, res, next) => {
    let id = req.params.id;

    let lista = [];
    for (let i = 0; i < pacientes.length; i++) {
        if (id == pacientes[i].id) {
            for (let j = 0; j < pacientes2.length; j++) {
                if (id == pacientes2[j].id_paciente) {
                    console.log("Entro")
                   // pacientes[i].mensaje = "Este paciente se encuentra en la cama " + pacientes2[j].numeroHabitacion + " del area de UCI"
                    res.status(200).json(pacientes[i]);
                    //lista.push(pacientes[i]);
                    //console.log(lista);
                } else {
                    //lista.push(pacientes[i]);
                    res.status(200).json(pacientes[i]);
                }

            }
            console.log(pacientes[i])
        } else {
            //return res.status(400).send("Este id no existe");
        }
    }
   // res.status(200).json(lista);
});



module.exports = router;