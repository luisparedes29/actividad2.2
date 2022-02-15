var express = require('express');
const app = require('../app');
const fs = require('fs');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');


const data = fs.readFileSync('./pacientes.json', 'utf-8');

let pacientes = JSON.parse(data);


/* Registro de paciente nuevo*/
router.post('/', (req, res) => {
  const { nombre, sexo, edad, historialMedico, numeroContacto, numeroFamiliar, direccion } = req.body;

  if (!nombre || !sexo || !edad || !historialMedico || !numeroContacto || !numeroFamiliar || !direccion) {
    res.status(400).send("Las entradas deben tener todos los campos")
    return;
  }

  let nuevoPaciente = {
    id: uuidv4(),
    nombre,
    sexo,
    edad,
    historialMedico,
    numeroContacto,
    numeroFamiliar,
    direccion
  };

  function validar(val) {
    if (/^[a-z ,.'-]+$/i.test(val.nombre)) {
      if (val.sexo.toLowerCase() == 'm' || val.sexo.toLowerCase() == 'f') {
        if (isNaN(val.edad) === false) {
          if (val.historialMedico !== undefined) {
            if (isNaN(val.numeroContacto) === false && val.numeroContacto.length < 20) {
              if (isNaN(val.numeroFamiliar) === false && val.numeroFamiliar.length < 20) {
                if (val.direccion !== undefined) {
                  pacientes.push(nuevoPaciente);
                } else {
                  res.status(400).send("Debe completar el campo de la direccion")
                }
              } else {
                res.status(400).send("Numero de contacto familiar invalido");
              }
            } else {
               res.status(400).send("Numero de contacto invalido");
            }
          } else {
             res.status(400).send("Debe llenar el campo del historial medico");
          }
        } else {
           res.status(400).send('Debe colocar valores numericos en la Edad');
        }
      } else {
         res.status(400).send('Sexo no valido');
      }
      return true
    } else {
       res.status(400).send('Nombre no valido usar solo letras');
    }
  }
  if(validar(nuevoPaciente)){
    const data = JSON.stringify(pacientes);
    fs.writeFileSync('pacientes.json', data, 'utf-8')
    res.status(200).send("Paciente almacenado exitosamente")
  }
})

module.exports = router;
