var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const fs = require('fs');


router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  function eliminar(id) {
    const data = fs.readFileSync('./pacientes.json', 'utf-8');
    const pacientes = JSON.parse(data);
    const data2 = fs.readFileSync('./pacientes-uci.json', 'utf-8');
    const pacientes2 = JSON.parse(data2);

    //leemos los datos para eliminar
    for (let i = 0; i < pacientes.length; i++) {
      if (id == pacientes[i].id) {

        //console.log(person.data[i])
        pacientes.splice(i, 1);
      }else{
        //res.status(400).send("Este id no existe")
      }
      for (let j = 0; j < pacientes2.length; j++) {
        if (id == pacientes2[j].id_paciente) {
          pacientes2.splice(j, 1);
        }
      }

    }

    const str = JSON.stringify(pacientes);
    const str2 = JSON.stringify(pacientes2);
    //console.log(str2);

    //luego escribimos los datos aqui
    fs.writeFileSync('pacientes.json', str, 'utf-8')
    fs.writeFileSync('pacientes-uci.json', str2, 'utf-8');
    res.status(200).send("Paciente eliminado exitosamente");
  }
  eliminar(id);

});

router.delete('/uci/:id', (req, res) => {
  let id = req.params.id
  function eliminar(id) {
    const data = fs.readFileSync('./pacientes-uci.json', 'utf-8');
    const pacientes = JSON.parse(data);

    for (let i = 0; i < pacientes.length; i++) {
      if (id == pacientes[i].id_paciente) {

        //console.log(person.data[i])
        pacientes.splice(i, 1);
      }
    }
    const str= JSON.stringify(pacientes);
    fs.writeFileSync('pacientes-uci.json',str,'utf-8');
    res.status(200).send("Paciente eliminado del area")
    

  } eliminar(id);
});

module.exports = router;
