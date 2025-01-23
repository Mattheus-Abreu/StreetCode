let index = 0
let cartItens = []
const image = document.querySelectorAll('.img-carousel')

document.addEventListener("DOMContentLoaded", () => {
    buscarProdutos();
});

async function buscarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/products'); // URL do servidor
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
        }

        const produtos = await response.json();
        console.log("Produtos recebidos do servidor:", produtos);

        mostrarProdutos(produtos);
    } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        alert("Não foi possível carregar os produtos. Tente novamente mais tarde.");
    }
}

function mostrarProdutos(produtos) {
    const todosProdutosDiv = document.querySelector(".products-container"); // Certifique-se de que existe essa classe no HTML
    if (!todosProdutosDiv) {
        console.error("Contêiner de produtos não encontrado! Verifique se a classe '.produtos-container' existe no HTML.");
        return;
    }

    todosProdutosDiv.innerHTML = ""; // Limpa o conteúdo antes de adicionar novos cards

    for (let produto of produtos) {
        console.log(produto.nome); // Exibe o nome do produto no console

        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("cardProduct");

        produtoDiv.innerHTML = `
            <img width="200" src="${produto.imagem_url}" alt="${produto.nome}" />
            <div class="infoProduct">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco}</p>
            </div>
        `;

        todosProdutosDiv.appendChild(produtoDiv);
    }
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


function openModal(name, image, size){
    const modal = document.getElementById('productModal')
    document.getElementById('productTitle').textContent = name
    document.getElementById('modalImage').src = image
    const sizesContainer = document.getElementById('productSizes')
    sizesContainer.innerHTML = ''
    size.forEach(size => {
        const button = document.createElement('button')
        button.textContent = size
        button.onclick = () => selectedSize = size
        sizesContainer.appendChild(button)
    });

    modal.style.display = 'flex'
}

function closeModal(){
    document.getElementById('productModal').style.display = 'none'
}

function selectedSize(size){
    alert(`Tamanho selecionado: ${size}`)
}

function addToCart(){
    alert('Produto adicionado ao carrinho!')
}

function openCart(){
    document.getElementById('sideBarCart').style.right = '0'
}

function closeSideBar(){
    document.getElementById('sideBarCart').style.right = '-100%'
}

function addToCart(name, value, size){
    cartItens.push({name, value, size})
    updateCart()
}

function updateCart(){
    const cartContainer = document.getElementById('cartItens')
    const totalValue = document.getElementById('valueTotal')
    cartContainer.innerHTML = ''

    let total = 0 

    cartItens.forEach(item => {
        total += item.value
        itemDiv.classList.add('cartItens')
        itemDiv.innerHTML = `
            <p>${item.itemName} - Tamanho: ${item.sizes.join(', ')}</p>
            <p>Preço: R$ ${item.itemPrice.toFixed(2)}</p>
        `
        totalValue.textContent = `R$ ${total.toFixed(2)}`
    })
}

function purchase(){
    const cpf = document.getElementById('cpf').value
    const cep = document.getElementById('cep').value

    if(cpf && cep){
        alert('Compra realizada com sucesso!')
        cartItens = []
        updateCart()
        closeCart()
    }else{
        alert('Preencha os campos necessários!')
    }
}

function finalizePurchase() {
    const cpf = document.querySelector('#cpf').value;
    const cep = document.querySelector('#cep').value;
    const items = getCartItems();
    const total = calculateTotal();

    if (!cpf || !cep) {
        alert('Por favor, insira o CPF e o CEP.');
        return;
    }

    fetch('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpf, cep, items, total })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        clearCart();
    })
    .catch(error => console.error('Erro ao finalizar compra:', error));
}