const bcrypt = require('bcryptjs')
const pool = require('../dataBase/conexion')
const filteringData = require('../helper/filter')
const nodemailer = require('../helper/nodeMailer/nodeMailer')
const bienvenida = require('../helper/nodeMailer/bienvenidaCoder')
const contactar = require('../helper/nodeMailer/contactarCoder')

const consultar = async () => {
    const { rows: coders } = await pool.query('SELECT * FROM programadores;')
    const { rows: lenguajes } = await pool.query('SELECT * FROM lenguajes;')
    const { rows: basedatos } = await pool.query('SELECT * FROM basedatos;')
    const { rows: frameworks } = await pool.query('SELECT * FROM frameworks;')
    const programadores = filteringData(coders)
    return { programadores, lenguajes, basedatos, frameworks }
}


const crearPerfil = async obj => {
    const personalInfo = Object.values(obj.personalInformation)
    personalInfo[2] = bcrypt.hashSync(personalInfo[2])
    const parameters = personalInfo.map((x, index) => `$${index + 1}`).join(', ')
    const programmersCommand = `INSERT INTO programadores VALUES(DEFAULT, ${parameters}) RETURNING *;`
    const programmersValues = personalInfo.map(x => x)
    const { rows: result } = await pool.query(programmersCommand, programmersValues)
    const {id, email, nombre}= result[0]
    await nodemailer(bienvenida(email, nombre))

    const skills = async (main_table, create_table, id) => {
        const { rows: result } = await pool.query(`SELECT * FROM ${main_table}`)
        const skill = result.filter(sk => obj[main_table].includes(sk.nombre))
        const skillCommand = `INSERT INTO ${create_table} VALUES (DEFAULT, $1, $2)`
        for (const index in skill) {
            const value = [id, skill[index].id]
            await pool.query(skillCommand, value)
        }
    }
    await skills('lenguajes', 'programador_lenguaje', id)
    await skills('frameworks', 'framework_lenguaje', id)
    await skills('basedatos', 'programador_basedatos', id) 
}

const perfilFreeCoder = async id => {
    const command =
    `SELECT p.id, p.nombre, p.apellido, p.foto_url, p.area, p.repositorio_url, p.resenha, p.portafolio, p.presupuesto, p.oferta_valor, p.valor_hora,
    (SELECT array_agg(l.nombre) FROM programador_lenguaje pl LEFT JOIN lenguajes l ON pl.lenguajes_id = l.id WHERE pl.programador_id = p.id) AS lenguajes,
    (SELECT array_agg(b.nombre) FROM programador_basedatos pb LEFT JOIN basedatos b ON pb.basedatos_id = b.id WHERE pb.programador_id = p.id) AS basedatos,
    (SELECT array_agg(f.nombre) FROM framework_lenguaje fl LEFT JOIN frameworks f ON fl.framework_id = f.id WHERE fl.programador_id = p.id ) AS frameworks
    FROM programadores p
    WHERE p.id = $1;`
    const value = [id]
    const { rows: data } = await pool.query(command, value)
    return data
}


// esto es vista contactar freecoder ok
const MostrarProgramadores = async (email) => {
    const command = 'SELECT * FROM programadores WHERE email = $1'
    const values = [email]
    const { rows: programador } = await pool.query(command, values)
    return programador
}


// vista login
const verificarLogin = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM programadores WHERE email = $1"
    const { rows: [programador], rowCount } = await pool.query(consulta, values)
    if (!programador) {
        throw { code: 404, message: 'No existe ese usuario...' }
    }

    const { password: passwordEncriptada } = programador
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta) {
        throw { code: 401, message: "Email o contraseña incorrecta" }
    }

    
    return true
}

// vista contactar
//const ContactarSolicitud = async (nombre_cliente, apellido, email, titulo_proyecto, descripcion_proyecto, stack_1, stack_2, stack_3, stack_otros, boceto, presupuesto, programador_id, fecha_solicitud) => {
  //  const comand = 'INSERT INTO solicitudes VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, DEFAULT)RETURNING*'
  

  //  const values = [nombre_cliente, apellido, email, titulo_proyecto, descripcion_proyecto, stack_1, stack_2, stack_3, stack_otros, boceto, presupuesto, programador_id, fecha_solicitud]
  //  const {rows: solicitudes} = await pool.query(comand, values)
  //  const {nombre_cliente, email, programador_id} = solicitudes[0]
  //  const seleccionar = "select email, nombre FROM programadores WHERE  id = $1"
  //  const valor = [programador_id]
  //  const {rows: dato } = await pool.query(seleccionar,valor)
  //  const {email: correo, nombre} = dato[0]
  //  await nodemailer(contactar(email, nombre_cliente))
  //  await nodemailer(contactar(correo, nombre))
//}

// esta bien no me funciona nodemailer - vista contactar
const ContactarSolicitud = async (nombre_cliente, apellido, email, titulo_proyecto, descripcion_proyecto, stack_1, stack_2, stack_3, stack_otros, boceto, presupuesto, programador_id) => {
    const comand = 'INSERT INTO solicitudes VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, DEFAULT)'
    const values = [nombre_cliente, apellido, email, titulo_proyecto, descripcion_proyecto, stack_1, stack_2, stack_3, stack_otros, boceto, presupuesto, programador_id]
    const solicitudes = await pool.query(comand, values)
    console.log(solicitudes)
}

//vista crear propuesta ok
const crearTablaSolicitudes = async (solicitud_id, titulo_propuesta, descripcion_propuesta, stack_1, stack_2, stack_3, stack_otros, alcance, cantidad_revisiones, horas_estimadas, valor_final) => {
    const llamado = async () => {
        const { rows: solicitudes } = await pool.query('SELECT * FROM solicitudes;')
        return solicitudes
    }
    await llamado()
   const command = 'INSERT INTO propuesta_coder VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
   const values = [solicitud_id, titulo_propuesta, descripcion_propuesta, stack_1, stack_2, stack_3, stack_otros, alcance, cantidad_revisiones, horas_estimadas, valor_final]
   const resultadoFinal = await pool.query(command, values)
   return resultadoFinal;
}

//orden en proceso 

const MostrarOrdenEnProceso = async () =>
{
    const comand = 'SELECT * FROM  propuesta_coder'
    
}

//seguimiento - habria que a la tabla cliente crear una seccion de comentarios

const crearTablaSeguimiento = async (nombre, apellido, email, telefono) => {
    const llamado = async () => {
        const { rows: solicitudes } = await pool.query('SELECT * FROM solicitudes;')
        return solicitudes
    }
    await llamado()
    const comand = 'INSERT INTO clientes VALUES (DEFAULT, $1, $2, $3, $4)'
    const values = [nombre, apellido, email, telefono ]
    const resultadoSeguimiento = await pool.query(comand, values)

   return resultadoSeguimiento;
}

const valuesCLientes = async (nombre, apellido, email, telefono ) => {
    const comand = 'INSERT INTO clientes VALUES (DEFAULT, $1, $2, $3, $4)'
    const values = [nombre, apellido, email, telefono ]
    await pool.query(comand, values)
}



//envio propuesta ok
const mostrarPropuesta = async () => {
    const comand = 'SELECT * FROM  propuesta_coder'
    const propuesta = await pool.query(comand)
    return propuesta
}

//mis solicitudes- faltaria ver como hacer el check

const mostrarSolicitudes = async () => {
    const comand = 'SELECT * FROM  solicitudes'
    const propuesta = await pool.query(comand)
    return propuesta
}



module.exports = { consultar, crearPerfil, perfilFreeCoder, verificarLogin, MostrarProgramadores, mostrarPropuesta, ContactarSolicitud, crearTablaSolicitudes, mostrarSolicitudes, crearTablaSeguimiento }












