const produtos = [
    {
        nome: "Aventador",
        preco: 8200000.00,
        imagem: "imagens/aventador.jpeg"
    },
    {
        nome: "Impala 1967",
        preco: 600000.00,
        imagem: "imagens/impala.jpeg"
    },
    {
        nome: "Purosangue",
        preco: 5200000.00,
        imagem: "imagens/purosangue.jpeg"
    },
    {
        nome: "Urus",
        preco: 1800000.00,
        imagem: "imagens/urus.jpg"
    },
    {
        nome: "Kawasaki H2R",
        preco: 190000.00,
        imagem: "imagens/Kawasaki-H2R.jpg"
    },
    {
        nome: "CBR 1000rr-r",
        preco: 160000.00,
        imagem: "imagens/cbr-1000rr-r.png"
    }
];

let carrinho = [];

function adicionarAoCarrinho(index) {
    const produto = produtos[index];
    const existente = carrinho.find(item => item.nome === produto.nome);
    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("preco-total");
    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-carrinho';

        const img = document.createElement('img');
        img.src = item.imagem;

        const detalhesDiv = document.createElement('div');
        detalhesDiv.className = 'item-detalhes';

        const info = document.createElement('div');
        info.className = 'info-produto';

        const nome = document.createElement('span');
        nome.className = 'nome';
        nome.textContent = item.nome;

        const preco = document.createElement('span');
        preco.className = 'preco';
        preco.textContent = `R$ ${item.preco.toFixed(2)}`;

        info.appendChild(nome);
        info.appendChild(preco);

        const quantDiv = document.createElement('div');
        quantDiv.className = 'item-quantidade';

        const btnMenos = document.createElement('button');
        btnMenos.textContent = '-';
        btnMenos.onclick = () => alterarQuantidade(index, -1);

        const quantidade = document.createElement('span');
        quantidade.textContent = item.quantidade;

        const btnMais = document.createElement('button');
        btnMais.textContent = '+';
        btnMais.onclick = () => alterarQuantidade(index, 1);

        // adicona botões +- e quantidade
        quantDiv.appendChild(btnMenos);
        quantDiv.appendChild(quantidade);
        quantDiv.appendChild(btnMais);
    
        // adiciona detalhes do produto
        detalhesDiv.appendChild(info);
        detalhesDiv.appendChild(quantDiv);
        itemDiv.appendChild(img);
        itemDiv.appendChild(detalhesDiv);

        // adiciona item na lista do carrinho
        lista.appendChild(itemDiv);
    });

    totalSpan.textContent = total.toFixed(2);
}

function alterarQuantidade(index, valor) {
    carrinho[index].quantidade += valor;
    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }
    atualizarCarrinho();
}
