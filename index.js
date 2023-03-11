// Este archivo index solo sirve para emular el post del front cuando el coder ingrese sus datos, le llegará un correo de bienvenida
// se pueden hacer pruebas para testear, pero en producción se elminará este archivo.
// puedes ir al archivo post.js en helper para cambiar tanto el correo como el nombre para revisar tu email en carpeta no deseado.
const bcrypt = require("bcryptjs");
const write = require("./src/helper/post");
const escribir = require("./src/helper/solicitudes")
const pool = require("./src/dataBase/conexion");
const nodemailer = require("./src/helper/nodeMailer/nodeMailer");
const bienvenida = require("./src/helper/nodeMailer/bienvenidaCoder");
const contactar = require("./src/helper/nodeMailer/contactarCoder")
//const verificarLogin = require('./verificarLogin')

//const crearPerfil = async obj => {
// const personalInfo = Object.values(obj.personalInformation)
//  personalInfo[2] = bcrypt.hashSync(personalInfo[2])
//  const parameters = personalInfo.map((x, index) => `$${index + 1}`).join(', ')
//  const programmersCommand = `INSERT INTO programadores VALUES(DEFAULT, ${parameters}) RETURNING *;`
//  const programmersValues = personalInfo.map(x => x)
//  const { rows: result } = await pool.query(programmersCommand, programmersValues)
//  const {id, email, nombre}= result[0]
//  await nodemailer(bienvenida(email,nombre))

//  const skills = async (main_table, create_table, id) => {
//     const { rows: result } = await pool.query(`SELECT * FROM ${main_table}`)
//     const skill = result.filter(sk => obj[main_table].includes(sk.nombre))
//     const skillCommand = `INSERT INTO ${create_table} VALUES (DEFAULT, $1, $2)`
//    for (const index in skill) {
//       const value = [id, skill[index].id]
//       await pool.query(skillCommand, value)
//   }
// }
// await skills('lenguajes', 'programador_lenguaje', id)
// await skills('frameworks', 'framework_lenguaje', id)
// await skills('basedatos', 'programador_basedatos', id)
//}

//crearPerfil(write)


// vista login me quedo pendiente
//try {
  //  await verificarLogin('usuario@example.com', 'contraseña')
    // Si se llega aquí, el login fue exitoso
 // } catch (error) {
   // console.error(error)
  //}



// esto es vista contactar freecoder ok
// const MostrarProgramadores = async (email) => {
 // const command = "SELECT * FROM programadores WHERE email = $1";
 // const values = [email];
 // const { rows: programador } = await pool.query(command, values);

 // console.log(programador);
 // return programador;
//};

//MostrarProgramadores();


// vista contactar
//const ContactarSolicitud = async (nombre_cliente, apellido, email, titulo_proyecto, descripcion_proyecto, stack_1, stack_2, stack_3, stack_otros, boceto, presupuesto, programador_id) => {
  //  const comand = 'INSERT INTO solicitudes VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, DEFAULT)'
  //  const values = [nombre_cliente, apellido, email, titulo_proyecto, descripcion_proyecto, stack_1, stack_2, stack_3, stack_otros, boceto, presupuesto, programador_id]
  //  const solicitudes = await pool.query(comand, values)
  //  console.log(solicitudes)
//}

//ContactarSolicitud("cristobal","diaz", "cris@cris.cl", "bar", "hola","js","c","react","nose","nose",1111,1)



//vista crear propuesta ok
//const crearTablaSolicitudes = async (solicitud_id, titulo_propuesta, descripcion_propuesta, stack_1, stack_2, stack_3, stack_otros, alcance, cantidad_revisiones, horas_estimadas, valor_final) => {
  //  const llamado = async () => {
     //   const { rows: solicitudes } = await pool.query('SELECT * FROM solicitudes;')
   //     return solicitudes
 //   }
  //  await llamado()
  // const command = 'INSERT INTO propuesta_coder VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
 //  const values = [solicitud_id, titulo_propuesta, descripcion_propuesta, stack_1, stack_2, stack_3, stack_otros, alcance, cantidad_revisiones, horas_estimadas, valor_final]
 // const resultadoFinal = await pool.query(command, values)

  // console.log(llamado)
  // console.log(crearTablaSolicitudes)
  // return resultadoFinal
//}

//crearTablaSolicitudes(3,"ve","hola", "js", "react", "la", "ola", "nose", 3, 10, 1000);

//envio propuesta ok

//const mostrarPropuesta = async () => {
//  const comand = "SELECT * FROM propuesta_coder";

//  const propuesta = await pool.query(comand);

//  console.log(propuesta);

//  return propuesta;
//};

//mostrarPropuesta();


//const mostrarSolicitudes = async () => {
 //   const comand = 'SELECT * FROM  solicitudes'
 //   const propuesta = await pool.query(comand)

  //  console.log(propuesta)
  //  return propuesta

//}

//mostrarSolicitudes();


const crearTablaSeguimiento = async (nombre, apellido, email, telefono) => {
    const llamado = async () => {
        const { rows: solicitudes } = await pool.query('SELECT * FROM solicitudes;')
        return solicitudes
    }
    await llamado()
    const comand = 'INSERT INTO clientes VALUES (DEFAULT, $1, $2, $3, $4)'
    const values = [nombre, apellido, email, telefono ]
    const resultadoSeguimiento = await pool.query(comand, values)




   console.log(llamado)
   console.log(resultadoSeguimiento)
   return resultadoSeguimiento;
}

crearTablaSeguimiento("cris","diaz","bla@bla.cl",99999)
