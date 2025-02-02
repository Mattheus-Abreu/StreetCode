# StreetCode</>

## Visão Geral

O projeto Fullstack StreetCode é um e-commerce de roupas street wear com foco na aréa da tecnologia ou cursos de tecnologia, para que desenvolvedores e amantes da aréa consigam roupas e acessórios que se encaixem com o estilo deles.

## Tecnologias Utilizadas
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Banco de Dados: PostgreeSQL

## Endpoints utilizados
- ```/products:``` Retorna todos os produtos

    ```JSON
    {
    "id": 1,
    "nome": "ADS 2023 Preta",
    "preco": "129.99",
    "imagem_url": "Codigos/Front-End/Product-Repository/modelo-preto-01.png"
    }
    ```
<sub>Um dos produtos que estão disponíveis no banco de dados que é enviando para o site em formato de JSON</sub>

- ```/sales``` Que manda os pedidos para o banco de dados com a descrição do material, valor, tamanho e quantidade de cada camisa

    ```bash
    Requisição recebida: {
    cpf: '333',
    cep: '62823-000',
    descricao_pedido: 'Nome: ADS 2025.2 Preta, Tamanho: GG, Preço: R$ R$ 99.99',
    valor_total: '99.99'
    }
    Inserindo no banco: [
    '333',
    '62823-000',
    2025-02-02T20:12:07.109Z,
    'Nome: ADS 2025.2 Preta, Tamanho: GG, Preço: R$ R$ 99.99',
    '99.99'
    ]
    ```

<sub>Um exemplo de como o pedido é enviado para o banco de dados</sub>

## Banco de Dados
O banco de dados foi criado com o PostgreeSQL, com as seguintes tabelas

```SQL
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem_url TEXT
);

CREATE TABLE vendas (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    descricao_pedido TEXT NOT NULL,
    valor_total NUMERIC(10, 2) NOT NULL
);
```

O insert dos produtos para ser testado o site é o seguinte:

```SQL

INSERT INTO produtos (id, nome, preco, imagem_url) VALUES
(1, 'ADS 2023 Preta', 129.99, 'Codigos/Front-End/Product-Repository/modelo-preto-01.png'),
(2, 'ADS 2023 Branca', 129.99, 'Codigos/Front-End/Product-Repository/modelo-branco-01.png'),
(3, 'ADS 2025 Preta Oficial', 159.99, 'Codigos/Front-End/Product-Repository/modelo-preto-02.png'),
(4, 'ADS 2025 Branca Oficial', 159.99, 'Codigos/Front-End/Product-Repository/modelo-branco-02.png'),
(5, 'ADS 2023 Roxa', 149.99, 'Codigos/Front-End/Product-Repository/modelo-extra.png'),
(6, 'ADS 2025.2 Preta', 99.99, 'Codigos/Front-End/Product-Repository/modelo-preto-03.png'),
(7, 'ADS 2025.2 Branca', 99.99, 'Codigos/Front-End/Product-Repository/modelo-branco-03.png'),
(8, 'ADS 2025.3 Preta', 99.99, 'Codigos/Front-End/Product-Repository/modelo-preto-04.png'),
(9, 'ADS 2025.3 Branca', 99.99, 'Codigos/Front-End/Product-Repository/modelo-branco-04.png');

```