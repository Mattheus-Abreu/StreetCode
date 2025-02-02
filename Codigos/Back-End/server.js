const express = require('express')
const cors = require('cors')
const path = require('path')
const{ Pool }= require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StreetCode_DB',
  password: '123',
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

app.post('/sales', async (req, res) => {
  try {
      console.log('Requisição recebida:', req.body) // Log para verificar os dados recebidos
      
      const { cpf, cep, descricao_pedido, valor_total } = req.body
      if (!cpf || !cep || !descricao_pedido || !valor_total) {
          return res.status(400).json({ error: 'Dados incompletos' })
      }

      const data_pedido = new Date()
      const query = `
          INSERT INTO vendas (cpf, cep, data_pedido, descricao_pedido, valor_total) 
          VALUES ($1, $2, $3, $4, $5)
      `
      const values = [cpf, cep, data_pedido, descricao_pedido, valor_total]

      console.log('Inserindo no banco:', values) // Log para verificar os dados antes do insert

      await pool.query(query, values)

      res.status(201).json({ message: 'Venda registrada com sucesso' })
  } catch (error) {
      console.error('Erro no endpoint /sales:', error) // Log do erro
      res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})