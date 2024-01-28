/*1.- Definiendo Variables*/
const amount = document.getElementById("monto");    // Llama a la función que actualiza el texto. es necesario aca?
const selectCurrency = document.getElementById("seleccion");
const searchButton = document.getElementById("buscar");
let result = document.getElementById("texto")

/*2.-Función Resultado*/
async function Result() {

    const inputAmount = parseFloat(amount.value); //Toma el número ingresado en input
    const currency = selectCurrency.value; //Toma la opción seleccionada por el usuario

    try { /*Sentencia Try*/

        const currencyValue = await calculateResult(currency); //Llamando a la función para obtener el valor

        const calculation = (inputAmount / currencyValue).toFixed(3);
        result.innerText = `Resultado: $${calculation} ${currency}`; //Actualiza el texto del DOM

        await createChart(currency); // Crea la gráfica con los datos históricos de la moneda seleccionada


    } catch {/*Sentencia Catch*/

        console.error(error);
        result.innerText = `Error al obtener el cálculo`; //Actualiza el texto del DOM
    }
}

/*3.- Agregando Event Listener que llama a la función Resultado en cuanto el usuario hace click en el botón*/
searchButton.addEventListener("click", Result);

/*4.- Función Asíncrona para obtener datos consultando la API*/
async function calculateResult(currency) {

    const res = await fetch("https://mindicador.cl/api/") /*busca y obtiene información de la URL mediante la API)*/
    const data = await res.json() /*transforma la información a formato .json()*/

    if (currency === "usd") {
        return data.dolar.valor;/*Retorna el valor (llave) de la propiedad "valor"*/

    } else { /*Euro en este caso*/
        return data.euro.valor;
    }
}
