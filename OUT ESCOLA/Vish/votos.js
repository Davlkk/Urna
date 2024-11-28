const candidatos = {
    "1212": "Líder: Andriel Ligeirinho; Vice: Rafaustão",
    "5141": "Líder: André Schuh Passeios; Vice: Leite",
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

function exibirResultados() {
    const resultadosDiv = document.getElementById('resultados');
    const votos = JSON.parse(localStorage.getItem('votos')) || {};
    const votosRegentes = JSON.parse(localStorage.getItem('votosRegentes')) || {};
    const votosNulos = JSON.parse(localStorage.getItem('votosNulos')) || 0;

    let resultadosHTML = '<h2>Candidatos</h2>';
    for (let numero in candidatos) {
        resultadosHTML += `<p><strong>${candidatos[numero]}</strong> - Número: ${numero} - Votos: ${votos[numero] || 0}</p>`;
    }

    resultadosHTML += '<h2>Regentes</h2>';
    for (let numero in regentes) {
        resultadosHTML += `<p><strong>${regentes[numero]}</strong> - Código: ${numero} - Votos: ${votosRegentes[numero] || 0}</p>`;
    }

    resultadosHTML += '<h2>Votos Nulos</h2>';
    resultadosHTML += `<p><strong>Votos Nulos:</strong> ${votosNulos}</p>`;

    resultadosDiv.innerHTML = resultadosHTML;
}

function resetarVotos() { // Remove os votos
    localStorage.removeItem('votos');
    localStorage.removeItem('votosRegentes');
    localStorage.removeItem('votosNulos'); // Remove votos nulos

    // Atualiza a exibição
    exibirResultados();
}

document.addEventListener('DOMContentLoaded', () => {
    exibirResultados();

    const resetButton = document.querySelector('.reset');
    if (resetButton) {
        resetButton.addEventListener('click', resetarVotos);
    }
});
