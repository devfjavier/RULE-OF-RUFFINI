"use strict";
addEventListener("DOMContentLoaded", cargarJS)

function cargarJS() {
    const botonesCambiarSigno = Array.from(document.querySelectorAll(".ejercicio .boton-cambiar-signo"))
    const coeficientes = Array.from(document.querySelectorAll(".ejercicio .numero"))
    const resolver_limpiar = document.getElementById("resolver-limpiar")
    const signos = Array.from(document.querySelectorAll(".ejercicio .boton-cambiar-signo"))
    const lugarSoluciones = document.getElementById("contenedorSoluciones")
    const lugarDivisiblesConSP = document.getElementById("contenedorCandidatosConSP")
    const lugarDivisiblesConSN = document.getElementById("contenedorCandidatosConSN")
    let numeroGrado3,
        numeroGrado2,
        numeroGrado1,
        numeroSinGrado
    let soluciones = []
    let divisiblesConSP = [] // SP significa Signo Positivo
    let divisiblesConSN = [] // SN significa Signo Negativo
    // cuando se hace click en el boton, cambiar de signo de + o signo de -
    botonesCambiarSigno.forEach(boton => {
        boton.addEventListener("click", () => {
            if (boton.textContent === "+") {
                boton.textContent = "-"
            }
            else if (boton.textContent === "-") {
                boton.textContent = "+"
            }
        })
    })
    
    for (const numero of coeficientes) {
        numero.addEventListener("input", e => validarGrado(e.target))
    }
    
    function validarGrado(input) {
        if (input.classList.contains("grado-3")) {
            numeroGrado3 = Number(input.value)
        }
        else if (input.classList.contains("grado-2")) {
            numeroGrado2 = Number(input.value)
        }
        else if (input.classList.contains("grado-1")) {
            numeroGrado1 = Number(input.value)
        }
        else if (input.classList.contains("sin-grado")) {
            numeroSinGrado = Number(input.value)
        }
    }
    
    resolver_limpiar.addEventListener("click", () => {
        //comprobar si hay numeros divisibles y soluciones existentes antes de renderizarlos
        if (soluciones.length > 0 || divisiblesConSP.length > 0 && divisiblesConSN.length > 0) {
            eliminarSoluciones()
            eliminarNumerosDivisibles()
        }
        aplicarMetodoRuffini()
    })
    
    /* 
    
    FUNCIONES
    
    */
    function aplicarMetodoRuffini() {
        sacarNumerosDivisibles()
    }
    
    // al terminar de sacar los numeros divislbes los renderiza
    // y continua con sacar la soluciones
    function sacarNumerosDivisibles() {
        for (let candidato = numeroSinGrado; candidato > 0; candidato--) {
            if (numeroSinGrado % candidato === 0) {
                divisiblesConSP.push(candidato)
                divisiblesConSN.push(candidato * -1)
            }
        }
        renderizarCantidatos()
        sacarSoluciones(divisiblesConSP, divisiblesConSN)
    }
    
    // al terminar de sacar las soluciones las renderiza soluciones
    // SP representa al grupo de candidatos con Signo Positivo
    // SN representa al grupo de candidatos con Signo Negativo
    function sacarSoluciones(SP, SN) {
        let candidato = 0
        let contadorSigno = 0
        let signoActual = signos[contadorSigno].textContent
        while (candidato < SP.length) {
            // este bucle ejecuta los pasos del metodo ruffini a todos los candidatos
            contadorSigno = 0
            signoActual = signos[contadorSigno].textContent
            let pruebaNumG3 = SP[candidato] * Number(signoActual + numeroGrado3)
            let prueba2NumG3 = SN[candidato] * Number(signoActual + numeroGrado3)

            contadorSigno++
            signoActual = signos[contadorSigno].textContent
            let pruebaNumG2 = pruebaNumG3 + Number(signoActual + numeroGrado2)
            let prueba2NumG2 = prueba2NumG3 + Number(signoActual + numeroGrado2)

            let pruebaNumG2_1 = SP[candidato] * pruebaNumG2
            let prueba2NumG2_1 = SN[candidato] * prueba2NumG2

            contadorSigno++
            signoActual = signos[contadorSigno].textContent
            let pruebaNumG1 = pruebaNumG2_1 + Number(signoActual + numeroGrado1)
            let prueba2NumG1 = prueba2NumG2_1 + Number(signoActual + numeroGrado1)
            
            let pruebaNumG1_1 = SP[candidato] * pruebaNumG1
            let prueba2NumG1_1 = SN[candidato] * prueba2NumG1

            contadorSigno++
            signoActual = signos[contadorSigno].textContent
            let pruebaFinalSP = pruebaNumG1_1 + Number(signoActual + numeroSinGrado)
            let pruebaFinalSN = prueba2NumG1_1 + Number(signoActual + numeroSinGrado)

            if (pruebaFinalSP == 0) {
                soluciones.push(SP[candidato])
            }

            if (pruebaFinalSN == 0) {
                soluciones.push(SN[candidato])
            }
            candidato++
        }

        renderizarSoluciones()
    }

    // agregar al HTML los posibles candidatos a solucion
    function renderizarCantidatos() {
        let index = 0
        while (index < divisiblesConSP.length) {
            const candidatoSP = document.createElement("span")
            const candidatoSN = document.createElement("span")
            candidatoSP.classList.add("candidato")
            candidatoSN.classList.add("candidato")

            candidatoSP.textContent = divisiblesConSP[index]
            lugarDivisiblesConSP.appendChild(candidatoSP)
            
            candidatoSN.textContent = divisiblesConSN[index]
            lugarDivisiblesConSN.appendChild(candidatoSN)
            index++
        }
    }

    // agregar al HTML las soluciones 
    function renderizarSoluciones() {
        for (let index = 0; index < soluciones.length; index++) {
            const solucion = document.createElement("span")
            solucion.classList.add("solucion")
            solucion.textContent = soluciones[index]
            lugarSoluciones.appendChild(solucion)
        }
    }

    // eliminar soluciones
    function eliminarSoluciones() {
        let elementoSolucion = Array.from(document.querySelectorAll(".ejercicio .soluciones .contenedor .solucion"))
        let solucionesRestantes = soluciones.length
        while (solucionesRestantes > 0) {
            lugarSoluciones.removeChild(elementoSolucion[solucionesRestantes - 1])
            soluciones.pop()           
            solucionesRestantes--
        }
    } 

    // eliminar divisibles
    function eliminarNumerosDivisibles() {
        let elementoDivisibleSP = Array.from(document.querySelectorAll(".ejercicio .divisibles .candidatosConSP .candidato"))
        let elementoDivisibleSN = Array.from(document.querySelectorAll(".ejercicio .divisibles .candidatosConSN .candidato"))
        // se usa solo candidatosConSP.length para los candidatos con signo positivo y negativo 
        // ya que la cantitad de datos siempre es igual en ambos
        let divisiblesRestantes = divisiblesConSP.length
        while (divisiblesRestantes > 0) {
            lugarDivisiblesConSP.removeChild(elementoDivisibleSP[divisiblesRestantes - 1])
            lugarDivisiblesConSN.removeChild(elementoDivisibleSN[divisiblesRestantes - 1])
            divisiblesConSP.pop()
            divisiblesConSN.pop()          
            divisiblesRestantes--
        }
    } 
        
}