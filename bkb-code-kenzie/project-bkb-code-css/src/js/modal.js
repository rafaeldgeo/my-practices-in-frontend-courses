let modal = document.querySelector(".modal");
let btn = document.querySelector(".btn-cancelar");
//let span = document.getElementsByClassName("close")[0]; // obter o "X"
let btn_nao = document.querySelector(".btn-nao")

btn.onclick = function(){
    modal.style.display = "block";
}

btn_nao.onclick = function(){
    modal.style.display = "none";
}


// clicar no "X" para fechar
/* span.onclick = function(){
    modal.style.display = "none";
} */

// clicar fora do modal para fecha
/* window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = "none";
    }
}
 */


