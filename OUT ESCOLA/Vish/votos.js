const candidatos = {
    "1212": "Líder: Andriel Ligeirinho; Vice: Rafaustão",
    "5141": "Líder: André Shuh Passeios; Vice: Leite",
    "2469": "Líder: Heipac; Vice: Davi Bizkit",
    "2344": "Líder: Wellinton Bochecha; Vice: Sapo Paulo",
    "3141": "Líder: Pagé Tabajara; Vice: O Ganado",
    "1945": "Líder: Vitor Alemon Potato; Vice: Argentino"
};


function exibirResultados() {
    const resultadosDiv = document.getElementById('resultados');
    const votos = JSON.parse(localStorage.getItem('votos'));


    let resultadosHTML = '';
    for (let numero in candidatos) {
        resultadosHTML += `<br><strong>${candidatos[numero]}</strong> - Número: ${numero} - Votos: ${votos[numero]}</li>`;
    }
    resultadosHTML += '</ul>';

    resultadosDiv.innerHTML = resultadosHTML;
}


document.addEventListener('DOMContentLoaded', exibirResultados);
