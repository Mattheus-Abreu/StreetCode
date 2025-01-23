const express = require('express')
const cors = require('cors')
const path = require('path')
const{ Pool }= require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StreetCode_DB',
  password: '1234',
  port: 5432
})

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'Front-End/Product-Repository')))

app.get('/products', async (req, res) => {
  const { id } = req.query;

  try{
    if ( id ){
      const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id])

      if (result.rows.length === 0){
        return res.status(404).send('Nenhum dado encontrado com o ID fornecido')
      }

      res.json(result.rows[0])

    } else {
      const result = await pool.query('SELECT * FROM produtos')
      res.json(result.rows)
    }
  } catch ( err ) {
    res.status(500).send('Erro ao buscar dados: ' + err.message)
  }

})

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