function eliminarNumerosDivisibles(lugarDivisiblesConSP, lugarDivisiblesConSN, divisiblesConSP, divisiblesConSN) {
    // se usa solo candidatosConSP.length para los candidatos con signo positivo y negativo 
    // ya que la cantitad de datos siempre es igual en ambos
    let divisiblesRestantes = divisiblesConSP.length
    while (divisiblesRestantes > 0) {
        divisiblesConSP.pop()
        divisiblesConSN.pop()          
        divisiblesRestantes--
    }
    lugarDivisiblesConSP.innerHTML = null
    lugarDivisiblesConSN.innerHTML = null
}

export default eliminarNumerosDivisibles