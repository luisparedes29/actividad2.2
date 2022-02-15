var express = require('express');
var router = express.Router();
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');


const data2 = fs.readFileSync('./pacientes-uci.json', 'utf-8');


let uci = JSON.parse(data2);

//Regristro nuevo paciente a UCI

router.post('/:id', (req, res) => {
    let id_paciente = req.params.id
    const { numeroHabitacion } = req.body;

    if (!numeroHabitacion) { res.status(400).send("Por favor llene el campo del numero de la Habitacion") }

    function nuevoPaciente(id, habitacion) {
        let nuevaHabitacion = {
            id_paciente: id,
            id_habitacion: uuidv4(),
            numeroHabitacion: habitacion
        }
        function validar2(val) {
            if (uci.length < 25) {
                if (isNaN(val.numeroHabitacion) === false) {
                    if (val.numeroHabitacion <= 100) {
                        const found = uci.some(el => el.numeroHabitacion === numeroHabitacion);
                        if (!found) {
                            uci.push(nuevaHabitacion)
                        } else {
                            res.status(404).send("Esta habitacion ya esta siendo ocupada intente otra")
                        }


                    } else {
                        res.status(400).send("Por favor indique un numero menor a 100")
                    }
                } else {
                    res.status(400).send("Por favor indique un valor numerico")
                }

            } else {
                res.status(400).send("Todas las camas de UCI estan ocupadas")
            }
        }

        function validar1(val) {
            if (uci.length < 25) {
                if (isNaN(val.numeroHabitacion) === false) {
                    if (val.numeroHabitacion < 100) {
                        uci.push(nuevaHabitacion);

                    } else {
                        res.status(400).send("El numero de habitacion debe ser menor a 100")
                    }
                } else {
                    res.status(400).send("El campo Numero de habitacion debe ser numerico intente de nuevo")
                }
            } else {
                res.status(400).send("Todas las camas de UCI han sido ocupadas");
            }

        }
        if (uci.length == 0) {
            validar1(nuevaHabitacion)
        } else {
            validar2(nuevaHabitacion)
        }
    }
    nuevoPaciente(id_paciente, numeroHabitacion);

    const data2 = JSON.stringify(uci);
    //console.log(data2)
    //Escribimos los datos aqui
    fs.writeFileSync('pacientes-uci.json', data2, 'utf-8')
    res.status(200).send("Paciente registrado en la UCI");
})


module.exports = router