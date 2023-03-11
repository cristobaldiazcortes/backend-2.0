const filteringData = table => {
   return table.map(coder => ({
        nombre: coder.nombre, 
        apellido: coder.apellido,
        foto_url: coder.foto_url, 
        area: coder.area, 
        repositorio_url: coder.repositorio_url,
        linkedin: coder.linkedin, 
        resenha: coder.resenha, 
        portafolio: coder.portafolio, 
        presupuesto: coder.presupuesto, 
        oferta_valor: coder.oferta_valor,
        valor_hora: coder.valor_hora
    }))
}

module.exports = filteringData