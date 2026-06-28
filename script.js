// ! TAMANHO DA FONTE !

// Obtém os elementos responsáveis pelo tamanho da fonte no HTML e os armazena em variáveis.
const fonte = document.getElementById("fonte");
const fonteAtual = document.getElementById("fonte-atual");

// Altera o tamanho da fonte da página.
function tamanhoFonte() {
    document.documentElement.style.fontSize = fonte.value + "px";
    fonteAtual.textContent = fonte.value;

    // Armazena o valor da fonte no localStorage.
    localStorage.setItem("fonte", fonte.value)
}

// Verifica se existe um item chamado "fonte" no localStorage.
// Se existir, aplica as configurações salvas.
if(localStorage.getItem("fonte")) {
    document.documentElement.style.fontSize = localStorage.getItem("fonte") + "px";
    fonte.value = localStorage.getItem("fonte");
    fonteAtual.textContent = localStorage.getItem("fonte");
}

// Chama a função sempre que o valor do range é alterado.
fonte.addEventListener("input", tamanhoFonte);



// ! MODO NOTURNO !

const noturno = document.getElementById("noturno");

// Alterna a classe "modo-noturno" no body.
function modoNoturno() {
    // Se o alto contraste estiver ativo, desabilita-o
    // e desfaz todas as suas alterações.
    if(contraste.checked) {
        contraste.checked = false;
        document.body.classList.remove("alto-contraste");
        localStorage.setItem("contraste", false);
    }

    document.body.classList.toggle("modo-noturno");
    // Registra no localStorage se a opção está ativa ou não.
    localStorage.setItem("noturno", noturno.checked);
}

// Verifica se existe um item chamado "noturno" no localStorage
// com valor igual a "true". Se existir, aplica as alterações.
if(localStorage.getItem("noturno") == "true") {
    noturno.checked = true;
    document.body.classList.add("modo-noturno")
}

// Chama a função sempre que o estado do checkbox é alterado.
noturno.addEventListener("change", modoNoturno);



// ! ALTO CONTRASTE !

// Funciona da mesma forma que o modo noturno.
const contraste = document.getElementById("contraste");

function altoContraste() {
    if(noturno.checked) {
        noturno.checked = false
        document.body.classList.remove("modo-noturno");
        localStorage.setItem("noturno", false)
    }

    document.body.classList.toggle("alto-contraste");
    localStorage.setItem("contraste", contraste.checked);
}

if(localStorage.getItem("contraste") == "true") {
    contraste.checked = true;
    document.body.classList.add("alto-contraste");
}

contraste.addEventListener("change", altoContraste);



// ! ADICIONAR CARTÃO !

const botaoCriar = document.getElementById("criar-cartao");

// Cria um novo cartão de citação.
function criarCartao() {
    // Solicita a citação ao usuário e a armazena na variável.
    const citacao = prompt("Digite a citação:");

    // Cancela a criação caso nenhum texto tenha sido informado.
    if(!citacao) {
        return;
    }

    // Limita o tamanho da citação.
    if(citacao.length > 270) {
        alert("A citação não pode ultrapassar 270 caracteres.");
        return;
    }

    // Solicita o autor e a obra ao usuário e os armazena em uma variável.
    const autor = prompt("Digite o autor e obra:");

    // Limita o tamanho da identificação.
    if (autor.length > 43) {
        alert("O nome do autor não pode ultrapassar 43 caracteres.");
        return;
    }

    // Cria a estrutura HTML do cartão.
    const cartao = document.createElement("div");
    cartao.classList.add("cartao");

    const p = document.createElement("p");
    const i = document.createElement("i");
    i.textContent = `"${citacao}"`;

    const span = document.createElement("span");
    span.textContent = `~ ${autor}`;

    // Botão responsável por excluir o cartão.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("excluir")
    botaoExcluir.addEventListener("click", excluirCartao)
    botaoExcluir.textContent = "×";

    // Monta o cartão e o adiciona à página.
    p.appendChild(i);
    cartao.appendChild(botaoExcluir);
    cartao.appendChild(p);
    cartao.appendChild(span);
    document.getElementById("principal").appendChild(cartao);
}

botaoCriar.addEventListener("click", criarCartao);



// ! APAGAR CARTÃO !

// Armazena em uma variável todos os botões de exclusão existentes inicialmente.
const botoesExcluir = document.querySelectorAll(".excluir");

// Remove o cartão após a confirmação do usuário.
function excluirCartao(cartaoExcluido) {
    const confirmar = confirm("Tem certeza que deseja excluir esta citação?");

    if(confirmar) {
        // Remove o cartão que disparou a função.
        cartaoExcluido.target.closest(".cartao").remove()
    }
}

// Associa o evento de exclusão aos cartões existentes.
botoesExcluir.forEach(percorrer);
function percorrer(enesimoBotao) {
    enesimoBotao.addEventListener("click", excluirCartao);
}



// ! SALVAR ESTADO ATUAL DA PÁGINA!

// Obtém do HTML o botão responsável por salvar o estado da página e o armazena em uma variável.
const botaoSalvar = document.getElementById("salvar");

// Salva todas as citações presentes na página.
function salvarEstado() {
    const confirmar = confirm("Deseja salvar o estado atual da página?");

    if(!confirmar) {
        return;
    }

    const cartoes = document.querySelectorAll(".cartao");
    const citacoes = [];

    // Percorre todos os cartões e armazena seus dados em um array.
    cartoes.forEach(pushArray);
    function pushArray(cartaoSalvo) {
        const citacao = cartaoSalvo.querySelector("p i").textContent;
        const autor = cartaoSalvo.querySelector("span").textContent;

        citacoes.push({citacao, autor});
    }

    // Converte o array para JSON antes de salvá-lo.
    localStorage.setItem("citacoes", JSON.stringify(citacoes));
    alert("Alterações salvas com sucesso!");
}

botaoSalvar.addEventListener("click", salvarEstado);



// ! RECUPERAR ESTADO SALVO !

// Reconstrói todos os cartões salvos anteriormente.
function restaurarCartoes() {
    const cartoesSalvos = localStorage.getItem("citacoes");

    // Remove todo o conteúdo da tag <main>.
    document.getElementById("principal").innerHTML = "";

    // Recria o título da página.
    const h1 = document.createElement("h1");
    h1.textContent = "Citações Literárias";

    document.getElementById("principal").appendChild(h1);

    // Converte a string JSON novamente para um array.
    const citacoes = JSON.parse(cartoesSalvos);


    // Recria os cartões salvos, um por um.
    citacoes.forEach(verificarArray);
    function verificarArray(item){
        restaurarCartao(item.citacao, item.autor);
    }
}

// Cria um cartão utilizando os dados recuperados do localStorage.
function restaurarCartao(citacao, autor) {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao");

    const p = document.createElement("p");
    const i = document.createElement("i");
    i.textContent = citacao;

    const span = document.createElement("span");
    span.textContent = autor;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("excluir");
    botaoExcluir.textContent = "×";
    // Garante que o botão de exclusão continuará funcionando.
    botaoExcluir.addEventListener("click", excluirCartao);

    p.appendChild(i);
    cartao.appendChild(botaoExcluir);
    cartao.appendChild(p);
    cartao.appendChild(span);
    document.getElementById("principal").appendChild(cartao);
}

// Verifica se existem dados salvos e os restaura automaticamente.
if(localStorage.getItem("citacoes")) {
    restaurarCartoes();
}



// ! RESTAURAR ESTADO ORIGINAL DA PÁGINA !

const botaoRestaurar = document.getElementById("restaurar");


// Exclui as alterações salvas e recarrega a página.
function restaurarEstado() {
    const confirmar = confirm("Tem certeza que deseja restaurar o estado original? Todas as alterações serão perdidas.");

    if(!confirmar) {
        return;
    }

    // Remove completamente o item "citacoes" do localStorage.
    // Não apenas esvazia o conteúdo: é um hard delete.
    localStorage.removeItem("citacoes");
    // Recarrega a página.
    location.reload();
}

botaoRestaurar.addEventListener("click", restaurarEstado);