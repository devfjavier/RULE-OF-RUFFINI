function sacarNumerosDivisibles(numeroSinGrado, divisiblesConSP, divisiblesConSN) {
    for (let candidato = numeroSinGrado; candidato > 0; candidato--) {
        if (numeroSinGrado % candidato === 0) {
            divisiblesConSP.push(candidato)
            divisiblesConSN.push(candidato * -1)
        }
    }
}

export default sacarNumerosDivisibles