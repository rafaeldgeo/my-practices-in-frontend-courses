"use strict";

const PRODUTOS = [
    {
        id:0,
        nome:"Combo Whopper",
        preco: 32.90,
        image: "combo_whopper.png"
    },
    {
        id:1,
        nome:"Bk Chicken",
        preco: 16.90,
        image: "bk_chicken.png"
    },
    {
        id:2,
        nome:"Sorvete",
        preco: 9.80,
        image: "sorvete.png"
    },
    {
        id:3,
        nome:"Cheddar Duplo",
        preco: 13.90,
        image: "cheddar_duplo.png"
    },
    {
        id:4,
        nome:"Combo Whopper Rodeio",
        preco: 38.90,
        image: "whopper_rodeio.png"
    },
    {
        id:5,
        nome:"Onion Rings",
        preco: 11.90,
        image: "onion_rings.png"
    },
    {
        id:6,
        nome:"Bk Mix Ovomaltine",
        preco: 13.90,
        image: "bk_mix.png"
    },
    {
        id:7,
        nome:"Cheddar",
        preco: 11.90,
        image: "cheddar.png"
    },
    {
        id:8,
        nome:"Shake Brownie",
        preco: 11.35,
        image: "shake.png"
    },
    {
        id:10,
        nome:"Combo Whopper Rodeio",
        preco: 38.90,
        image: "whopper_rodeio.png"
    },
];

const DIV_VITRINE = document.getElementById("vitrine");
const BTN_CANCELAR = document.getElementById("btncancelar");
const BTN_FINALIZAR = document.getElementById("btnfinalizar");
const DIV_SACOLA_VAZIA = document.getElementById("sacolavazia");
const UL_SACOLA = document.getElementById("sacola");
const SACOLA = [];

// cria os cards com produtos
(() => {
  for (let produto of PRODUTOS) {
    DIV_VITRINE.innerHTML += `<div class="col mb-3">
                                <div class="card text-center border-warning h-100">
                                  <img src="imagens/${produto.image}" class="card-img-top alt="">
                                  <div class="card-body">
                                    <h3 class="card-title fs-5 fw-bold d-block h-75 text-danger">${produto.nome}</h3>
                                    <span class="card-text fs-5 fw-bold d-block">R$${produto.preco.toFixed(2)}</span>
                                  </div>
                                <div class="card-footer bg-body border-0 mb-3">
                                  <button class="btn btn-warning" id="${produto.id}">Adicionar</button>
                                </div>
                              </div>
                            </div>`;
  }
})();

DIV_VITRINE.addEventListener("click", adicionarProdutoSacola);

// adiciona produto na sacola
function adicionarProdutoSacola(evento){
  const ELEMENTO = evento.target;
  if (ELEMENTO.tagName == "BUTTON") {
    const ID_PRODUTO = ELEMENTO.id;
    const PRODUTO_SELECIONADO = PRODUTOS.find((produto) => produto.id == ID_PRODUTO);
    SACOLA.push(PRODUTO_SELECIONADO);
    listarProdutosSacola();
  }
}

// lista os produtos na minha sacola
function listarProdutosSacola() {
  UL_SACOLA.innerHTML = "";
  for (let produto of SACOLA) {
    UL_SACOLA.innerHTML += ` <li class="list-group-item">
                                <div class="d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row justify-content-center align-items-center bg-warning-subtle rounded-4 mb-2">
                                    <div class="col-12 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center align-items-center">
                                        <img src="imagens/${produto.image}" alt="" class="">
                                    </div>
                                    <div class="col-12 col-md-3 col-lg-3 col-xl-6 d-flex justify-content-center justify-content-sm-center justify-content-start justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                        <h4 class="text-sm-start text-center fs-5 fw-semibold text-danger">${produto.nome}</h4>
                                    </div>
                                    <div class="col-12 col-md-3 col-lg-3 col-xl-2 d-flex justify-content-center">
                                        <h4 class="fw-semibold">R$ ${produto.preco.toFixed(2)}</h4>
                                    </div>
                                    <div class="col-12 col-md-2 col-lg-3 col-xl-2 d-flex justify-content-center ">
                                        <button type="button" class="btn btn-lg btn-light mb-2" onclick="removerProdutoSacola(${produto.id})" id="btnremover">
                                          <img src="imagens/lixo.png" alt="remover item da sacola de compras">
                                        </button>
                                    </div>
                                </div> 
                              </li>`
  }
  habilitarDesabilitarSacolaVazia();
  somarProdutos();
}

// remove produto da sacola
function removerProdutoSacola(id_produto) {
  const INDEX_SACOLA = SACOLA.findIndex((produto) => produto.id == id_produto);
  SACOLA.splice(INDEX_SACOLA, 1);
  listarProdutosSacola();
}

// soma os produtos na sacola
function somarProdutos() {
  let total = 0
  if (SACOLA.length !== 0) {
    const VALOR_INICIAL = 0;
    total = SACOLA.reduce(
      (acumulador, valor_atual) => acumulador + valor_atual.preco
      , VALOR_INICIAL).toFixed(2); 
  } else {
    total = "0.00";
  }
  document.getElementById("totalsacola").innerText = `Total R$ ${total}` ;
}


// se sacola vazia, botões desabilitados e div sacola vazia exibida. se sacola contém produto, botões habilitados e div sacola "none"
function habilitarDesabilitarSacolaVazia() { 
  if (SACOLA.length !== 0) {
    BTN_CANCELAR.classList = "btn btn-lg btn-danger mb-2 d-block";
    BTN_FINALIZAR.classList = "btn btn-lg btn-outline-danger mb-2 d-block";
    DIV_SACOLA_VAZIA.style.display = "none";
  } else {
    BTN_CANCELAR.classList = "btn btn-lg btn-danger mb-2 d-none";
    BTN_FINALIZAR.classList = "btn btn-lg btn-outline-danger mb-2 d-none";
    DIV_SACOLA_VAZIA.style.display = "block";
  }
}

BTN_CANCELAR.addEventListener("click", cancelarPedido, false);

function cancelarPedido() {
  while (SACOLA.length != 0) {
    SACOLA.pop();
  }
  somarProdutos();
  listarProdutosSacola();
}







