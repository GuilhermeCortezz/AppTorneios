// Função para salvar os participantes no localStorage
function salvarParticipantes(participantes) {
    localStorage.setItem('participantes', JSON.stringify(participantes));
}

// Função para carregar os participantes do localStorage
function carregarParticipantes() {
    const participantesJSON = localStorage.getItem('participantes');
    return participantesJSON ? JSON.parse(participantesJSON) : [];
}

// Função para salvar os resultados das partidas no localStorage
function salvarResultadosPartidas(resultadosPartidas) {
    localStorage.setItem('resultadosPartidas', JSON.stringify(resultadosPartidas));
}

// Função para carregar os resultados das partidas do localStorage
function carregarResultadosPartidas() {
    const resultadosPartidasJSON = localStorage.getItem('resultadosPartidas');
    return resultadosPartidasJSON ? JSON.parse(resultadosPartidasJSON) : [];
}

// Função para contabilizar os pontos de cada jogador
function contabilizarPontos() {
    const resultadosPartidas = carregarResultadosPartidas();
    const pontos = {};

    resultadosPartidas.forEach((resultado) => {
        if (resultado.pontuacaoCasa > resultado.pontuacaoVisitante) {
            pontos[resultado.timeCasa] = (pontos[resultado.timeCasa] || 0) + 3;
        } else if (resultado.pontuacaoVisitante > resultado.pontuacaoCasa) {
            pontos[resultado.timeVisitante] = (pontos[resultado.timeVisitante] || 0) + 3;
        } else {
            pontos[resultado.timeCasa] = (pontos[resultado.timeCasa] || 0) + 1;
            pontos[resultado.timeVisitante] = (pontos[resultado.timeVisitante] || 0) + 1;
        }
    });

    return pontos;
}

// Função para mostrar os pontos de cada jogador em ordem crescente de pontuação
function mostrarPontuacao() {
    const pontos = contabilizarPontos();
    const listaPontuacao = document.getElementById('listaPontuacao');
    listaPontuacao.innerHTML = '';

    const jogadoresOrdenados = Object.entries(pontos).sort((a, b) => b[1] - a[1]);

    jogadoresOrdenados.forEach(([jogador, pontuacao], index) => {
        const itemPontuacao = document.createElement('li');
        itemPontuacao.textContent = `${index + 1}. ${jogador}: ${pontuacao} pontos`;

        if (index === 0) {
            itemPontuacao.style.fontWeight = 'bold';
        }

        listaPontuacao.appendChild(itemPontuacao);
    });
}

// Função para registrar um novo participante
function registrarParticipante() {
    const nomeParticipanteInput = document.getElementById('nomeParticipante');
    const nomeParticipante = nomeParticipanteInput.value.trim();

    if (nomeParticipante === '') {
        alert('Por favor, insira um nome válido.');
        return;
    }

    const participantes = carregarParticipantes();

    if (participantes.length >= 20) {
        alert('O número máximo de participantes foi atingido (20).');
        return;
    }

    participantes.push(nomeParticipante);
    salvarParticipantes(participantes);
    nomeParticipanteInput.value = '';

    atualizarListaParticipantes();
}

// Função para gerar partidas com base nos participantes
function gerarPartidas(participantes) {
    const partidas = [];

    for (let i = 0; i < participantes.length; i++) {
        for (let j = i + 1; j < participantes.length; j++) {
            const partida = {
                casa: participantes[i],
                visitante: participantes[j],
            };
            partidas.push(partida);
        }
    }

    return partidas;
}

// Função para exibir as partidas de Quadribol
function exibirPartidasQuadribol(partidas) {
    const listaPartidas = document.getElementById('listaPartidas');
    const resultadosPartidas = carregarResultadosPartidas();

    partidas.forEach((partida, index) => {
        const cartaoPartida = document.createElement('div');
        cartaoPartida.classList.add('cartaoPartida');

        const infoPartida = document.createElement('p');
        infoPartida.textContent = `Partida de Quadribol ${index + 1}: ${partida.casa} vs ${partida.visitante}`;

        cartaoPartida.appendChild(infoPartida);
        listaPartidas.appendChild(cartaoPartida);
    });
}

function registrarTodosResultados(partidas) {
    const resultadosPartidas = [];

    partidas.forEach((partida, index) => {
        const pontuacaoCasaInput = document.getElementById(`pontuacaoCasa${index}`);
        const pontuacaoVisitanteInput = document.getElementById(`pontuacaoVisitante${index}`);

        const pontuacaoCasa = pontuacaoCasaInput.value;
        const pontuacaoVisitante = pontuacaoVisitanteInput.value;

        if (pontuacaoCasa === '' || pontuacaoVisitante === '') {
            alert('Por favor, insira as pontuações corretamente.');
            return;
        }

        const resultado = {
            timeCasa: partida.casa,
            timeVisitante: partida.visitante,
            pontuacaoCasa,
            pontuacaoVisitante,
        };

        resultadosPartidas.push(resultado);
    });

    salvarResultadosPartidas(resultadosPartidas);

    mostrarPontuacao(); // Atualizar a exibição da pontuação

}

// Função para exibir as partidas de Quadribol com campos de pontuação
function exibirPartidasQuadribolComPontuacao(partidas) {
    const listaPartidas = document.getElementById('listaPartidas');
    listaPartidas.innerHTML = '';

    partidas.forEach((partida, index) => {
        const cartaoPartida = document.createElement('div');
        cartaoPartida.classList.add('cartaoPartida');

        const infoPartida = document.createElement('p');
        infoPartida.textContent = `Partida de Quadribol ${index + 1}: ${partida.casa} vs ${partida.visitante}`;

        const pontuacaoCasaInput = document.createElement('input');
        pontuacaoCasaInput.type = 'number';
        pontuacaoCasaInput.placeholder = 'A';
        pontuacaoCasaInput.id = `pontuacaoCasa${index}`;

        const pontuacaoVisitanteInput = document.createElement('input');
        pontuacaoVisitanteInput.type = 'number';
        pontuacaoVisitanteInput.placeholder = 'B';
        pontuacaoVisitanteInput.id = `pontuacaoVisitante${index}`;

        cartaoPartida.appendChild(infoPartida);
        cartaoPartida.appendChild(pontuacaoCasaInput);
        cartaoPartida.appendChild(pontuacaoVisitanteInput);

        listaPartidas.appendChild(cartaoPartida);
    });
    const botaoRegistrarTodos = document.createElement('button');
    botaoRegistrarTodos.textContent = 'Registrar Todos os Resultados';
    botaoRegistrarTodos.addEventListener('click', () => {
        registrarTodosResultados(partidas);
    });

    listaPartidas.appendChild(botaoRegistrarTodos);

}

// Função para atualizar a lista de participantes
function atualizarListaParticipantes() {
    const listaParticipantes = document.getElementById('nomesParticipantes');
    const participantes = carregarParticipantes();
    listaParticipantes.innerHTML = '';

    for (const nome of participantes) {
        const itemLista = document.createElement('li');
        itemLista.textContent = nome;
        listaParticipantes.appendChild(itemLista);
    }
}

// Função para gerar e exibir as partidas de Quadribol
function gerarEExibirPartidas() {
    const participantes = carregarParticipantes();
    const partidas = gerarPartidas(participantes);
    exibirPartidasQuadribolComPontuacao(partidas);
}

// Função para apagar todos os dados do localStorage
function limparLocalStorage() {
    localStorage.clear();
    window.location.reload();
}

// Carregar o localStorage:
const participantes = carregarParticipantes();
atualizarListaParticipantes();
gerarEExibirPartidas();
mostrarPontuacao();
