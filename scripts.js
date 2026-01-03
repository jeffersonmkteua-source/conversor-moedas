const inputValor = document.getElementById("valor")
const botao = document.getElementById("btn")

const valueReal = document.getElementById("valueReal")
const resultado = document.getElementById("resultado")

const currencySelect = document.querySelector(".currency-select")
const currencyFlag = document.getElementById("currency-flag")
const currencyName = document.getElementById("currency-name")

const dolarHoje = 5.2
const euroHoje = 5.6

// Atualiza valor em real enquanto digita
inputValor.addEventListener("input", () => {
    const valor = Number(inputValor.value)

    valueReal.innerText = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    convertValues()
})

// Botão converter
botao.addEventListener("click", convertValues)

// Troca moeda (select)
currencySelect.addEventListener("change", changeCurrency)

// Função principal de conversão
function convertValues() {
    const valorReal = Number(inputValor.value)

    if (!valorReal) {
        resultado.innerText = "—"
        return
    }

    if (currencySelect.value === "usd") {
        const convertido = valorReal / dolarHoje

        resultado.innerText = convertido.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    if (currencySelect.value === "eur") {
        const convertido = valorReal / euroHoje

        resultado.innerText = convertido.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR"
        })
    }
}

// Troca bandeira e nome
function changeCurrency() {
    if (currencySelect.value === "usd") {
        currencyFlag.src = "assets/estados-unidos (1) 1.png"
        currencyName.innerText = "Dólar"
    }

    if (currencySelect.value === "eur") {
        currencyFlag.src = "assets/euro.png"
        currencyName.innerText = "Euro"
    }

    convertValues()
}


