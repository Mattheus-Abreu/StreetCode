const express = require('express')
const cors = require('cors')
const path = require('path')
const db = require('./db')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'Front-End/Product-Repository')))

app.get('/products', (req, res) => {
  res.json([
    {
      id: 1,
      nome: 'ADS 2023 Preta',
      preco: '129.99',
      imagem_url: 'images/modelo-preto-01.png'
    },
    {
      id: 2,
      nome: 'ADS 2023 Branca',
      preco: '139.99',
      imagem_url: 'images/modelo-branco-01.png'
    }
  ]);
});

app.post('/orders', async (req, res) => {
  const { CPF, CEP, itens, total } = req.body

  if (!CPF || !CEP) {
    return res.status(400).json({ error: 'Preencha todos os campos!' })
  }

  try {
    const description = itens.map(item => `${item.name} (${item.size})`).join(', ')
    const queryText = 'INSERT INTO sales (cpf, cep, descricao, valor_total) VALUES ($1, $2, $3, $4)'
    await db.query(queryText, [CPF, CEP, description, total])
    res.status(201).json({ message: 'Pedido realizado com sucesso!' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erro ao criar pedido')
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
