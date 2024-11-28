var SomConfirma = new Audio("midias/confirma-urna.mp3");
var ClickSom = new Audio("midias/minecraft-click-cropped.mp3");

const LocalTexto = document.querySelector('.textarea');
const botoes = document.querySelectorAll('.botoes-nmr .nmr');
const botaoCorrige = document.querySelector('.botao.corrige');
const botaoBranco = document.querySelector('.botao.branco');
const mensagemDiv = document.getElementById('mensagem');

const candidatos = {
    "1212": "Líder: Andriel Ligeirinho; Vice: Rafaustão",
    "5141": "Líder: André Shuh Passeios; Vice: Leite",
    "2469": "Líder: Heipac; Vice: Davi Bizkit",
    "2344": "Líder: Wellinton Bochecha; Vice: Sapo Paulo",
    "3141": "Líder: Pagé Tabajara; Vice: O Ganado",
    "1945": "Líder: Vitor Alemon Potato; Vice: Argentino"
};

const regentes = {
    "010": "Regente: Helder",
    "192": "Regente: Cândido",
    "246": "Regente: Cabral Joga",
    "666": "Regente: Kingnaldo",
    "212": "Regente: Mago Davy Jones",
    "269": "Regente: Painato"
};

if (!localStorage.getItem('votos')) {
    const votosIniciais = {};
    for (let num in candidatos) {
        votosIniciais[num] = 0; // Define os votos iniciais
    }
    localStorage.setItem('votos', JSON.stringify(votosIniciais));
}

if (!localStorage.getItem('votosRegentes')) {
    const votosRegentesIniciais = {};
    for (let num in regentes) {
        votosRegentesIniciais[num] = 0;
    }
    localStorage.setItem('votosRegentes', JSON.stringify(votosRegentesIniciais));
}

if (!localStorage.getItem('votosNulos')) {
    localStorage.setItem('votosNulos', '0'); // Inicializa os votos nulos
}

botoes.forEach(nmr => {
    nmr.addEventListener('click', () => {
        if (LocalTexto) {
            LocalTexto.value += nmr.innerText;
        }
        ClickSom.play();
    });
});

// limpa a tela (botão "corrige")
botaoCorrige?.addEventListener('click', () => {
    if (LocalTexto) {
        LocalTexto.value = '';
    }
    if (mensagemDiv) {
        mensagemDiv.innerHTML = ''; // Limpa a mensagem ao corrigir
    }
});

// Função para confirmar o voto
function confirmarVoto() {
    if (!LocalTexto || !mensagemDiv) return;

    const numero = LocalTexto.value.trim();
    if (candidatos[numero]) {
        mensagemDiv.innerHTML = `<p>VOTO CONFIRMADO EM:</p><p>${candidatos[numero]}</p>`;
        SomConfirma.play(); // Toca o som "piriririririri"
        registrarVoto(numero, 'candidato'); // Armazena o voto em "candidatos"
    } else if (regentes[numero]) {
        mensagemDiv.innerHTML = `<p>VOTO CONFIRMADO EM:</p><p>${regentes[numero]}</p>`;
        SomConfirma.play(); // Toca o som de confirmação
        registrarVoto(numero, 'regente'); // Armazena o voto em "regentes"
    } else {
        mensagemDiv.innerHTML = "<p>Número inválido. Tente novamente.</p>";
    }
}

// Função para registrar o voto no localStorage
function registrarVoto(numero, tipo) {
    if (tipo === 'candidato') {
        const votos = JSON.parse(localStorage.getItem('votos')) || {};
        votos[numero] = (votos[numero] || 0) + 1;
        localStorage.setItem('votos', JSON.stringify(votos));
    } else if (tipo === 'regente') {
        const votosRegentes = JSON.parse(localStorage.getItem('votosRegentes')) || {};
        votosRegentes[numero] = (votosRegentes[numero] || 0) + 1;
        localStorage.setItem('votosRegentes', JSON.stringify(votosRegentes));
    }
}

// Função para registrar voto nulo
function registrarVotoNulo() {
    let votosNulos = parseInt(localStorage.getItem('votosNulos'), 10) || 0;
    votosNulos += 1;
    localStorage.setItem('votosNulos', votosNulos.toString());
    if (mensagemDiv) {
        mensagemDiv.innerHTML = `<p>VOTO NULO REGISTRADO.</p>`;
    }
    SomConfirma.play(); // Toca o som de confirmação
}

// Adiciona o evento ao botão "branco"
botaoBranco?.addEventListener('click', registrarVotoNulo);
