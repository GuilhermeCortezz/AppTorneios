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

        const pontuacaoCasaInput = document.createElement('input');
        pontuacaoCasaInput.type = 'number';
        pontuacaoCasaInput.placeholder = 'A';

        const pontuacaoVisitanteInput = document.createElement('input');
        pontuacaoVisitanteInput.type = 'number';
        pontuacaoVisitanteInput.placeholder = 'B';

        const botaoRegistrarResultado = document.createElement('button');
        botaoRegistrarResultado.textContent = 'Registrar Resultado';
        botaoRegistrarResultado.addEventListener('click', () => {
            const pontuacaoCasa = pontuacaoCasaInput.value;
            const pontuacaoVisitante = pontuacaoVisitanteInput.value;

            const resultado = {
                timeCasa: partida.casa,
                timeVisitante: partida.visitante,
                pontuacaoCasa,
                pontuacaoVisitante,
            };

            resultadosPartidas.push(resultado);
            salvarResultadosPartidas(resultadosPartidas);

            alert(`Resultado da Partida de Quadribol ${index + 1}: ${partida.casa} ${pontuacaoCasa} - ${pontuacaoVisitante} ${partida.visitante}`);
        });

        cartaoPartida.appendChild(infoPartida);
        cartaoPartida.appendChild(pontuacaoCasaInput);
        cartaoPartida.appendChild(pontuacaoVisitanteInput);
        cartaoPartida.appendChild(botaoRegistrarResultado);

        listaPartidas.appendChild(cartaoPartida);
    });
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
    exibirPartidasQuadribol(partidas);
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
