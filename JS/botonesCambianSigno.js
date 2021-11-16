function botonesCambianSigno(botones) {
    for (const boton of botones) {
        boton.addEventListener("click", () => cambiarSigno(boton))
    }

    function cambiarSigno(boton) {
        if (boton.textContent === "+") {
            boton.textContent = "-"
        }
        else if (boton.textContent === "-") {
            boton.textContent = "+"
        }  
    }
}

export default botonesCambianSigno