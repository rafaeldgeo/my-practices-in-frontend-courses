const produtosLista = document.querySelector(".lista-produtos");
const listaProdutos = document.querySelector(".item-sacola");

// construção dos cards
function criarcardProduto(produto){
    const tagLi = document.createElement("li");
    tagLi.classList.add("produto");
    tagLi.innerHTML = `
                    <img src=${produto.image} alt="${produto.nome}" width="150" height="119.47">
                    <h2 class="nome-produto">${produto.nome}</h2>
                    <p class="preco-produto">R$ ${produto.preco.toFixed(2)}</p>
                    <button class="btn-adicionar fonte-nunito" type="button" id="${produto.id}">Adicionar</button>    
    `
    return tagLi;
}

// listando os cards
function listarProdutos(produtos){
    for (const produto of produtos){
        const cardMontado = criarcardProduto(produto);
        produtosLista.appendChild(cardMontado);
    }
}

listarProdutos(produtos);

//carrinho de compras
const carrinho = [];

// obter evento de clique na lista de produtos
produtosLista.addEventListener("click", adicionarProdutoCarrinho);

function adicionarProdutoCarrinho(event){
    const botao = event.target;

    // de todas os elementos obtidos, verificar aquele que tem a tagname "button"
    if (botao.tagName == "BUTTON"){
        const idProduto = botao.id; // pegando o id do produto 
        const produtoFiltrado = produtos.find((produto) => produto.id == idProduto);  //verificar se o produto existe quando clicado no botao

        //adicionar produto no carrinho
        carrinho.push(produtoFiltrado);

        //adicionar na tela produtos selecionados
        listarProdutosCarrinho();

        //atualizar total
        atualizar();
    }
}

//listar produtos do carrinho
function listarProdutosCarrinho(){

    listaProdutos.innerHTML = ""; // não existe produto no carrinho

    // percorrer carrinho listando produtos
    for (let prodAdicionado of carrinho){
        const tagLi = document.createElement("li");
        tagLi.classList.add("produto-carrinho");

        tagLi.innerHTML = `
                            <div class="produto-sacola adicionado-sacola">
                              <div><img src=${prodAdicionado.image} alt="${prodAdicionado.nome}" width="150" height="119.47"></div>
                              <div style="flex-grow:10">
                                 <h2 class="nome-produto-sacola">${prodAdicionado.nome}</h2>
                              </div>
                              <div style="flex-grow:1">
                                 <h2 class="preco-produto-sacola">R$ ${prodAdicionado.preco.toFixed(2)}</h2>
                              </div>
                              <div style="flex-grow:1">
                                 <button type="button" class="btn-remover" id="${prodAdicionado.id}">
                                   <img src="src/assets/lixo.png" "alt="remover produto da sacola" width="14" height="20">
                                 </button>
                              </div>
                            </div>
        `
        listaProdutos.appendChild(tagLi);
    }
}

// remover produto do carrinho

const listaProdutosCarrinho = document.querySelector(".item-sacola");
listaProdutosCarrinho.addEventListener("click", removerProdutoCarrinho);  //obter evento de click na lista de produtos do carrinho

function removerProdutoCarrinho(event){

    const botaoRemover = event.target;

    if (botaoRemover.tagName == "BUTTON"){
        // remover a lista de produtos do html
        botaoRemover.closest("li").remove();

        const idProduto = botaoRemover.id;
        const produtoFiltrado = produtos.find((produto) => produto.id == idProduto);
        let posicao = carrinho.indexOf(produtoFiltrado); // procura o id do produto clicado
        carrinho.splice(posicao,1); // retira o produto da lista
        atualizar();
    }
}

//atualizar total do carrinho
function atualizar(){
    const infopreco = document.querySelector(".total-sacola");
    let total = 0;
    for (const produto of carrinho){
        total += produto.preco;
    }
    infopreco.innerText = `Total: R$ ${total.toFixed(2)}`
}


