let index = 0
let cartItens = []
const image = document.querySelectorAll('.img-carousel')

document.addEventListener("DOMContentLoaded", () => {
    buscarProdutos()
})

async function buscarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/products')
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.statusText}`)
        }

        const produtos = await response.json()
        console.log("Produtos recebidos do servidor:", produtos)

        mostrarProdutos(produtos);
    } catch (error) {
        console.error("Erro ao buscar os produtos:", error)
        alert("Não foi possível carregar os produtos. Tente novamente mais tarde.")
    }
}

function mostrarProdutos(produtos) {
    const todosProdutosDiv = document.querySelector(".products-container")
    if (!todosProdutosDiv) return

    todosProdutosDiv.innerHTML = ""

    const modal = document.querySelector(".modalRequest")
    const botaoFechar = document.querySelector(".closeButton button")
    const modalImagem = document.querySelector(".modalImageShirt")
    const modalNome = document.querySelector(".modalInfoShirt h1")
    const modalPreco = document.querySelector(".modalInfoShirt .shirtValue h3")
    const botoesTamanho = document.querySelectorAll(".shirtSizes button")
    const botaoAdicionarCarrinho = document.querySelector("#add-carrinho")
    const cartContainer = document.getElementById("cartItens")
    const totalValue = document.getElementById("total")

    let tamanhoSelecionado = "P"
    let total = 0


    function selecionarTamanho(botaoSelecionado) {
        botoesTamanho.forEach((botao) => (botao.style.border = "none"))
        botaoSelecionado.style.border = "1px solid black"
        tamanhoSelecionado = botaoSelecionado.textContent
    }

    function adicionarAoCarrinho(nome, imagem, preco, tamanho) {
        const precoNumerico = parseFloat(preco.replace("R$", "").replace(",", "."))
        total += precoNumerico

        const itemDiv = document.createElement("div")
        itemDiv.classList.add("itemEscolhido")

        itemDiv.innerHTML = `
            <h3>${nome}</h3>
            <p>Tamanho: <b>${tamanho}</b></p>
            <p>R$ ${preco}</p>
        `

        cartContainer.appendChild(itemDiv)

        totalValue.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`
    }

    for (let produto of produtos) {
        const produtoDiv = document.createElement("div")
        produtoDiv.classList.add("cardProduct")

        produtoDiv.innerHTML = `
            <img width="200" src="${produto.imagem_url}" alt="${produto.nome}" />
            <div class="infoProduct">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco}</p>
            </div>
        `

        produtoDiv.onclick = () => {
            modal.style.display = "flex"
            modalImagem.style.backgroundImage = `url(${produto.imagem_url})`
            modalNome.textContent = produto.nome
            modalPreco.textContent = `R$ ${produto.preco}`
            selecionarTamanho(botoesTamanho[0])
        };

        todosProdutosDiv.appendChild(produtoDiv)
    }

    botoesTamanho.forEach((botao) => {
        botao.onclick = () => selecionarTamanho(botao)
    });

    botaoAdicionarCarrinho.onclick = () => {
        const nome = modalNome.textContent;
        const imagem = modalImagem.style.backgroundImage.replace('url("', '').replace('")', '')
        const preco = modalPreco.textContent
        const tamanho = tamanhoSelecionado

        adicionarAoCarrinho(nome, imagem, preco, tamanho)

        alert("Produto adicionado ao carrinho")
        modal.style.display = "none"
    };

    botaoFechar.onclick = () => (modal.style.display = "none")
}


function featuredImage(index) {
    image.forEach((img,i) => {
        img.classList.remove('active')
        if (i === index) {
            img.classList.add('active')
        }
    })
}

function nextImage(){
    index = (index + 1) % image.length
    featuredImage(index)
}
setInterval(nextImage, 3000)
featuredImage(index)


function openCart(){
    document.getElementById('sideBarCart').style.right = '0'
}

function closeSideBar(){
    document.getElementById('sideBarCart').style.right = '-100%'
}


function purchase() {
    const cpf = document.getElementById('cpf').value
    const cep = document.getElementById('cep').value
    const cartContainer = document.getElementById('cartItens')
    const totalValue = document.getElementById('total')

    if (cpf && cep) {
        const itens = Array.from(cartContainer.querySelectorAll(".itemEscolhido")).map(item => {
            const nome = item.querySelector("h3").textContent
            const tamanho = item.querySelector("p b").textContent
            const preco = item.querySelector("p:nth-child(3)").textContent
            return { nome, tamanho, preco }
        })

        const pedidosDetalhes = itens.map(item => 
            `Nome: ${item.nome}, Tamanho: ${item.tamanho}, Preço: ${item.preco}`
        ).join("\n")

        const total = totalValue.textContent

        const payload = {
            cpf,
            cep,
            descricao_pedido: pedidosDetalhes,
            valor_total: total.replace('R$', '').trim().replace(',', '.')
        }

        console.log('Enviando para o backend:', payload)

        fetch('http://localhost:3000/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data)
            if (data.error) throw new Error(data.error)
            alert('Compra realizada com sucesso!')
        })
        .catch(error => {
            console.error('Erro ao registrar venda:', error.message)
            alert('Erro ao registrar venda')
        })

        cartContainer.innerHTML = ""
        totalValue.textContent = "R$ 0,00"
        document.getElementById('cpf').value = ""
        document.getElementById('cep').value = ""
    } else {
        alert('Preencha os campos necessários!')
    }
}

