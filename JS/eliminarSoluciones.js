function eliminarSoluciones(soluciones, lugarSoluciones) {
    let solucionesRestantes = soluciones.length
    while (solucionesRestantes > 0) {
        soluciones.pop()           
        solucionesRestantes--
    }
    lugarSoluciones.innerHTML = null
}

export default eliminarSoluciones