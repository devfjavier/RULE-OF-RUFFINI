function renderizarNumerosDivisibles(divisiblesConSP, divisiblesConSN, lugarDivisiblesConSP, lugarDivisiblesConSN) {
    let index = 0
    while (index < divisiblesConSP.length) {
        const candidatoSP = document.createElement("span")
        const candidatoSN = document.createElement("span")
        candidatoSP.classList.add("candidato")
        candidatoSN.classList.add("candidato")

        candidatoSP.textContent = divisiblesConSP[index]
        candidatoSN.textContent = divisiblesConSN[index]
        
        lugarDivisiblesConSP.appendChild(candidatoSP)
        lugarDivisiblesConSN.appendChild(candidatoSN)
        index++
    }
}

export default renderizarNumerosDivisibles