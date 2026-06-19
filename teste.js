// VARIÁVEIS

// "fonte" recebe todo o input de id "fonte"
const fonte = document.getElementById("fonte");
// "valorFonte" recebe todo o span de id "valor-fonte"
const valorFonte = document.getElementById("valor-fonte");
// "noturno" recebe todo o input de id "noturno"
const noturno = document.getElementById("noturno");
// "contraste" recebe todo o input de id "contraste"
const contraste = document.getElementById("contraste");

// FUNÇÕES
function aumentarFonte(){
    document.documentElement.style.fontSize = fonte.value + "px";
    valorFonte.textContent = fonte.value;

    // salva o valor da fonte no localSorage
    localStorage.setItem("fonte", fonte.value);
}

function modoNoturno(){
    // verifica de a checkbox do contraste retorna true. Se sim, desabilita e desfaz todas as suas alterações
    if(contraste.checked){
        contraste.checked = false;
        document.body.classList.remove("alto-contraste");
        localStorage.setItem("contraste", false);
    }

    // se a classe "modo-notunro" existir em body, retira, e vice-versa
    document.body.classList.toggle("modo-noturno");
    // armazena no localStorage apenas o valor booleano da checkbox
    localStorage.setItem("noturno", noturno.checked);
}

function altoContraste(){
    // verifica se a checkbox do modo noturno returna true. Se sim, desabilita e desfaz todas as suas alterações
    if(noturno.checked){
        noturno.checked = false;
        document.body.classList.remove("modo-noturno");
        localStorage.setItem("noturno", false);
    }

    // se a classe "alto-contraste" existir em body, retira, e vice-versa
    document.body.classList.toggle("alto-contraste")
    // armazena no localStorage apenas o valor booleano da checkbox
    localStorage.setItem("contraste", contraste.checked);
}

// APLICAR DADOS SALVOS

// se existir "fonte" no localStorage, aplica as alterações encontradas
if(localStorage.fonte){
    document.documentElement.style.fontSize = localStorage.fonte + "px";
    fonte.value = localStorage.getItem("fonte");
    valorFonte.textContent = localStorage.getItem("fonte");
}

// se existir "noturno" no localStorage e nele tiver uma string "true", aplica as alterações do modo
if(localStorage.noturno === "true"){
    noturno.checked = true;
    document.body.classList.add("modo-noturno");
}

// se existir "contraste" no localStorage e nele tiver uma string "true", aplica as alterações do modo
if(localStorage.contraste === "true"){
    contraste.checked = true;
    document.body.classList.add("alto-contraste");
}

// EVENTOS QUE DISPARAM FUNÇÕES

// se "fonte" receber um novo valor, chama a função
fonte.addEventListener("input", aumentarFonte);
// se alguma mudança ocorrer em "noturno", chama a função
noturno.addEventListener("change", modoNoturno);
// se alguma mudança ocorrer em "contraste", chama a função
contraste.addEventListener("change", altoContraste);