const inputValor = document.getElementById("valor")
const botao = document.getElementById("btn")

const valueReal = document.getElementById("valueReal")
const resultado = document.getElementById("resultado")

const currencySelect = document.querySelector(".currency-select")
const currencyFlag = document.getElementById("currency-flag")
const currencyName = document.getElementById("currency-name")

let dolarHoje = 0
let euroHoje = 0
let cotacaoCarregada = false
// Busca as cotações atualizadas na API
async function buscarCotacoes() {
    try {
        const resposta = await fetch(
            "https://api.frankfurter.dev/v1/latest?base=BRL&symbols=USD,EUR"
        )

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar as cotações.")
        }

              const dados = await resposta.json()
        cotacaoCarregada = true

const dataCotacao = document.getElementById("data-cotacao")

dataCotacao.innerText = `Cotação referente a: ${new Date(dados.date + "T12:00:00").toLocaleDateString("pt-BR")}`
        dolarHoje = 1 / dados.rates.USD
        euroHoje = 1 / dados.rates.EUR

        convertValues()
} catch (erro) {
    cotacaoCarregada = false
    dolarHoje = 0
    euroHoje = 0

    console.error("Erro ao buscar cotações:", erro)
    resultado.innerText = "Cotação indisponível"
}
}

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

   if (!cotacaoCarregada) {
    resultado.innerText = "Cotação indisponível"
    return
}

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
// Carrega as cotações ao abrir a página
buscarCotacoes()


