let index = 0
let cartItens = []
const image = document.querySelectorAll('.img-carousel')

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('products-container');
        data.forEach(product => {
          const card = createCard(product);
          container.appendChild(card);
        });
      })
      .catch(error => console.error('Erro ao carregar produtos:', error));
  });
  


  



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