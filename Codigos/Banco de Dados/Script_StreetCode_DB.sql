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

SELECT * FROM produtos;
SELECT * FROM vendas;

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
