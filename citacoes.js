// VARIÁVEIS

// "fonte" recebe todo o input de id "fonte"
const fonte = document.getElementById("fonte");
const valorFonte = document.getElementById("valor-fonte");
const noturno = document.getElementById("noturno");
const contraste = document.getElementById("contraste");
const botaoNovaCitacao = document.getElementById("nova-citacao");
// "botoesExcluir" recebe todos os elementos que encontrar no documento html com a classe "apagar-cartao"
const botoesExcluir = document.querySelectorAll(".apagar-cartao");

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

function adicionarCitacao(){
    // "prompt" abre uma janelinha no navegador, exibindo o conteúdo entre parênteses e criando um campo para inserção de dados
    // o que for digitado no campo do "prompt" sera armazenado na variável "citacao"
    const citacao = prompt("Digite a citação:");
    // se a variável "citacao" não existir ou estiver vazia, encerra a função ali mesmo
    if (!citacao){
        return;
    }

    const autor = prompt("Digite o autor e obra:");

    // VALIDAÇÃO DA CITAÇÃO

    // avalia se a variável "citacao" possui mais do que 300 carecteres. Se sim, sentra no laço
    if (citacao.length > 270){
        // "alert" abre uma janelinha no navegador, exibindo o conteúdo entre parênteses
        alert("A citação não pode ultrapassar 270 caracteres.");
        // encerra a função
        return;
    }

    // VALIDAÇÃO DO AUTOR
    if (autor.length > 43) {
        alert("O nome do autor não pode ultrapassar 43 caracteres.");
        return;
    }

    // CRIAÇÃO DO CARD
    
    // cria um elemento "<div>" e guarda dentro da variável "cartao", mas não faz nada além disso. É como se fosse um "pendrive bootável"
    const cartao = document.createElement("div");
    // acessa a lista de classes atribuídas a variável "cartao" e adiciona a classe "cartao"
    cartao.classList.add("cartao");

    const p = document.createElement("p");
    const i = document.createElement("i");
    // acessa o conteúdo de texto presente em "i" e coloca lá dentro o conteudo entre crases como uma string
    // o nome de uma variável entre "${}", especificamente quando entre crases, permite que seu valor também seja exibido ou armazenado
    // crase, nesse sentido, indica que o conteúdo é uma string onde pode ou não existir a presença de uma variável
    i.textContent = `"${citacao}"`;

    const span = document.createElement("span");
    span.textContent = `~ ${autor}`;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("apagar-cartao");
    botaoExcluir.textContent = "×";
    botaoExcluir.addEventListener("click", excluirCartao)



    // coloca dentro da variável "p", a variável entre parênteses como último filho. Isso é DOM por definição
    p.appendChild(i);
    cartao.appendChild(botaoExcluir);
    cartao.appendChild(p);
    cartao.appendChild(span);

    // procura dentro do documento html um elemento com o id "expositor-citacoes" e dentro dele, coloca como último filho a variável "cartao"
    document.getElementById("expositor-citacoes").appendChild(cartao);
}

function excluirCartao(cartaoExcluido){
    // "confirm" abre uma janelinha no navegador que exibe a mensagem entre parênteses e te deixa reponder "sim" ou "nao" e armazena na variável um valor booleano
    const confirmar = confirm("Tem certeza que deseja excluir esta citação?");

    if(confirmar){
        // "target" procura exatamente o elemento que foi clicado em "cartaoExcluido"
        // "closest", nesse caso, sobe na arvore a partir do target até encontrar o objeto mais próximo com a classe "cartao"
        // "remove" dá o golpe de misericódia e exclui o elemento que "closest" encontrou
        cartaoExcluido.target.closest(".cartao").remove();
    }
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

if(localStorage.contraste === "true"){
    contraste.checked = true;
    document.body.classList.add("alto-contraste");
}

// EVENTOS QUE DISPARAM FUNÇÕES

// se "fonte" receber um novo valor, chama a função
fonte.addEventListener("input", aumentarFonte);
// se alguma mudança ocorrer em "noturno", chama a função
noturno.addEventListener("change", modoNoturno);
contraste.addEventListener("change", altoContraste);
// se o botao presente em "botaoNovaCitacao" for clicado, chama a função
botaoNovaCitacao.addEventListener("click", adicionarCitacao);

// para cada elemento presente em "botoesExcluir", um de cada vez, roda a função
// nomeia o elemento que disparou a função de "botao", e adiciona a botao um observador que dispara a função sempre que "botao" é clicado
botoesExcluir.forEach(observadorBotao);
function observadorBotao(botao){
    botao.addEventListener("click", excluirCartao);
}