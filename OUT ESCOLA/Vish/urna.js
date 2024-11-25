var SomConfirma = new Audio("/OUT ESCOLA/Vish/midias/confirma-urna.mp3");
var ClickSom = new Audio("/OUT ESCOLA/Vish/midias/minecraft-click-cropped.mp3");

const LocalTexto = document.querySelector('.textarea');
const botoes = document.querySelectorAll('.botoes-nmr .nmr');
const botaoCorrige = document.querySelector('.botao.corrige');
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

// Inicializa os votos no localStorage, se ainda não estiverem definidos
if (!localStorage.getItem('votos')) {
    const votosIniciais = {};
    for (let num in candidatos) {
        votosIniciais[num] = 0; // Define os votos iniciais para cada candidato
    }
    localStorage.setItem('votos', JSON.stringify(votosIniciais));
}

if (!localStorage.getItem('votosRegentes')) {
    const votosRegentesIniciais = {};
    for (let num in regentes) {
        votosRegentesIniciais[num] = 0; // Define os votos iniciais para cada regente
    }
    localStorage.setItem('votosRegentes', JSON.stringify(votosRegentesIniciais));
}

botoes.forEach(nmr => {
    nmr.addEventListener('click', () => {
        LocalTexto.value += nmr.innerText;
        ClickSom.play();
    });
});

// Limpa o campo de texto ao clicar no botão CORRIGE
botaoCorrige.addEventListener('click', () => {
    LocalTexto.value = '';
    mensagemDiv.innerHTML = ''; // Limpa a mensagem ao corrigir
});

// Função para confirmar o voto e exibir a mensagem
function confirmarVoto() {
    const numero = LocalTexto.value.trim();
    if (candidatos[numero]) {
        mensagemDiv.innerHTML = `<p>VOTO CONFIRMADO EM:</p><p>${candidatos[numero]}</p>`;
        SomConfirma.play(); // Toca o som de confirmação
        registrarVoto(numero, 'candidato'); // Armazena o voto no grupo de candidatos
    } else if (regentes[numero]) {
        mensagemDiv.innerHTML = `<p>VOTO CONFIRMADO EM:</p><p>${regentes[numero]}</p>`;
        SomConfirma.play(); // Toca o som de confirmação
        registrarVoto(numero, 'regente'); // Armazena o voto no grupo de regentes
    } else {
        mensagemDiv.innerHTML = "<p>Número inválido. Tente novamente.</p>";
    }
}

// Função para registrar o voto no localStorage
function registrarVoto(numero, tipo) {
    if (tipo === 'candidato') {
        const votos = JSON.parse(localStorage.getItem('votos'));
        votos[numero] += 1;
        localStorage.setItem('votos', JSON.stringify(votos));
    } else if (tipo === 'regente') {
        const votosRegentes = JSON.parse(localStorage.getItem('votosRegentes'));
        votosRegentes[numero] += 1;
        localStorage.setItem('votosRegentes', JSON.stringify(votosRegentes));
    }
}
