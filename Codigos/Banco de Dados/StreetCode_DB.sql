CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    tamanho VARCHAR(10),
    cor VARCHAR(50),
    estoque INTEGER NOT NULL,
    imagem_url TEXT
);

CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    data_pedido TIMESTAMP DEFAULT NOW(),
    valor_total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS itens_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id INTEGER REFERENCES produtos(id),
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL
);

