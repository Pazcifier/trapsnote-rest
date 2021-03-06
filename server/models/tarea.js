var mongoose = require("mongoose");
const validator = require("validator");
var jsValidate = require("js-validate");
var names = ["Estudios","Trabajo","Hogar","Actividad","Ejercicio","Plan","Informacion"];
var includes = require('array-includes');
var validate = jsValidate.start();
//Constructor de tareas
var Tarea = mongoose.model('Tarea', {
  nombre: {
    type: String,
    required: true,
    minlength:1,
    maxlength:255,
    trim: true,
    validate:{
    validator: (value)=>{
          return validate(value, 'alphanumeric _space_');
    },
    message: 'El nombre debe ser alfanumerica'
    }
  },
  descripcion: {
    type: String,
    required: true,
    minlength: 1,
    maxlength:255,
    trim: true,
    validate:{
    validator: (value)=>{
          return validate(value, 'alphanumeric _space_');
    },
    message: 'La descripcion debe ser alfanumerica'
    }
  },
  categoria: {
    type:String,
    trim: true,
    required: true,
    validate:{
    validator: (value)=>{
          return includes(names,value);
    },
    message: '{VALUE} La categoria no existe'
    }
  },
  username: {
    type: String
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaLimite: {
    type: Date,
    default: null,
    validate:{
      validator: fechaInvalida,  //Llamo a la funcion que me permite verificar si es mayor de edad
      message: 'La fecha limite tiene que ser despues de la fecha actual' //Si no es mayor de edad te devuelve un error con el msj
    }
  },
  fechaRegistro: {
    type: Date,
    default : new Date()
  }
});

function fechaInvalida (value) {
  if (value != null){
  if (value < new Date ()) return false; }
  return true;
}
module.exports = {Tarea};
