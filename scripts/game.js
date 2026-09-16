const pecas = [
    {
        id: 'b550m',
        tipo: 'placaMae',
        modelo: 'Placa Mãe B550M',
        socket: 'AM4',
        ddr: 'DDR4',
        entradasSata: 4,
        consumoWatts: 20,

        imgInventory: '../assets/components/motherboard-default.png',
        imgInstalled: '../assets/components/motherboard-default.png'

    },
    
    {
        id: 'ryzen5-5600',
        tipo: 'processador',
        modelo: 'Ryzen 5 5600',
        socket: 'AM4',
        consumoWatts: 65,

        imgInventory: '../assets/components/cpu-default.png',
        imgInstalled: '../assets/components/cpu-default.png'
    },

    {
        id: 'corsair-8GB',
        tipo: 'ram',
        modelo: 'Memória Corsair 8GB',
        ddr: 'DDR4',
        capacidadeGB: 8,
        consumoWatts: 5,

        imgInventory: '../assets/components/ram-default.png',
        imgInstalled: '../assets/components/ram-default.png'
    },

    {
        id: 'gtx1660',
        tipo: 'placaDeVideo',
        modelo: 'GTX 1660',
        consumoWatts: 120,

        imgInventory: '../assets/components/gpu-default.png',
        imgInstalled: '../assets/components/gpu-default.png'
    },

    {
        id: 'kingston-a400',
        tipo: 'armazenamento',
        modelo: 'kingston A400',
        capacidadeGB: 480,
        consumoWatts: 5,
        sata: true,
        
        imgInventory: '../assets/components/ssd-default.png',
        imgInstalled: '../assets/components/ssd-default.png'
    },

    {
        id: 'corsair-550w',
        tipo: 'fonte',
        modelo: 'Corsair 550W',
        potenciaWatts: 550,

        imgInventory: '../assets/components/psu-default.png',
        imgInstalled: '../assets/components/psu-default.png'
    },

    {
        id: 'z490',
        tipo: 'placaMae',
        modelo: 'Z490',
        socket: 'LGA1200',
        ddr: 'DDR4',
        entradasSata: 6,
        consumoWatts: 25,

        imgInventory: '../assets/components/motherboard-default.png',
        imgInstalled: '../assets/components/motherboard-default.png'
    },

    {
        id: 'hd-1tb',
        tipo: 'armazenamento',
        modelo: 'HD1TB',
        capacidadeGB: 1000,
        consumoWatts: 5,
        sata: true,

        imgInventory: '../assets/components/hd-default.png',
        imgInstalled: '../assets/components/hd-default.png'
    }

]

function renderInventory() {
    const inventory = document.querySelector('#inventory');

    pecas.forEach(peca => {
        const element = document.createElement('div');
        const img = document.createElement('img');
        img.src = peca.imgInventory;
        img.alt = peca.modelo;

        img.classList.add("inventory-img");
        element.appendChild(img);
        const name = document.createElement('span');
        name.textContent = peca.modelo;
        name.classList.add("inventory-name");
        element.appendChild(name);
        element.dataset.id = peca.id;

        element.classList.add("inventory-item");

        element.draggable = true;
        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text/plain", element.dataset.id);
        })

        inventory.appendChild(element);
    });

}

function configureWorkTable() {
    const workTable = document.querySelector('#work-table');

    workTable.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    workTable.addEventListener('drop', (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("text/plain");
        const peca = buscarPecaPorId(id);
        if (peca) {
            instalarPeca(peca);
        }
    });
}

function configureDropZones() {
    const dropZones = document.querySelectorAll('.drop-zone');

    dropZones.forEach(dropZone => {
        dropZone.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        dropZone.addEventListener('drop', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const id = event.dataTransfer.getData("text/plain");
            const peca = buscarPecaPorId(id);
            const tipoAceito = dropZone.dataset.accept;
            if (peca && peca.tipo === tipoAceito) {
                const sucesso = instalarPeca(peca);
                if (sucesso) {
                    const element = document.createElement('div');

                    const img = document.createElement('img');

                    img.classList.add("installed-img");
                    img.src = peca.imgInstalled;
                    img.alt = peca.modelo;
                    element.classList.add("installed-item");

                    element.appendChild(img);
                    dropZone.appendChild(element);
                    showFeedback(`Peça ${peca.modelo} instalada com sucesso!`, 'success');
                } else {
                    showFeedback(`Falha ao instalar a peça ${peca.modelo}.`, 'error');
                }
            } else if(peca &&peca.tipo !== tipoAceito) {
                showFeedback(`Peça ${peca.modelo} não pode ser instalada nesta zona.`, 'error');
            }
        });
    })
}

function calcConsumption() {
    let consumption = 0;
    if (computador.placaMae) consumption += computador.placaMae.consumoWatts;
    if (computador.processador) consumption += computador.processador.consumoWatts;
    if (computador.ram) consumption += computador.ram.consumoWatts;
    if (computador.placaDeVideo) consumption += computador.placaDeVideo.consumoWatts;
    computador.armazenamentos.forEach(armazenamento => {
        consumption += armazenamento.consumoWatts;
    });
    return consumption;
}

function checkAssembly() {
    return computador.placaMae && computador.processador && computador.ram && computador.placaDeVideo && computador.fonte && computador.armazenamentos.length > 0;
}

function turnOnComputer() {
    if (!checkAssembly()) {
        showFeedback("Montagem incompleta.", 'error');
        return false;
    } else if (calcConsumption() > computador.fonte.potenciaWatts) {
            showFeedback("Fonte insuficiente.", 'error');
            return false;
        } else {
            showFeedback("Computador ligado com sucesso!", 'success');
            return true;
        }
    } 

const turnOnButton = document.querySelector('#turn-on');

turnOnButton.addEventListener('click', () => {
    console.log("Consumo do PC: " + calcConsumption());
    console.log("PC Montado Corretamente: " + checkAssembly());
    turnOnComputer();

});

function showFeedback(text, type = 'info') {
    const feedbackMessage = document.querySelector('#feedback');
    feedbackMessage.textContent = text;
    feedbackMessage.classList.remove('feedback-success', 'feedback-error', 'feedback-info');
    feedbackMessage.classList.add(`feedback-${type}`);
}

function resetComputer() {
    computador.placaMae = null;
    computador.processador = null;
    computador.ram = null;
    computador.placaDeVideo = null;
    computador.armazenamentos = [];
    computador.fonte = null;
    computador.satasUsadas = 0;

    const installedItems = document.querySelectorAll('.installed-item');
    installedItems.forEach(item => {
        item.remove();
    });

    showFeedback("Computador reiniciado.", 'info');
}

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => {
    resetComputer();
});

const computador = {
    placaMae: null,
    processador: null,
    ram: null,
    placaDeVideo: null,
    armazenamentos: [],
    fonte: null,

    satasUsadas: 0
}

function buscarPecaPorId(id) {
    return pecas.find(peca => peca.id === id);
}

function instalarPeca(peca) {
    if (!peca) {
        console.log('Peça não encontrada.');
        return;
    }

    switch (peca.tipo) {
        case 'placaMae':
            if (computador.placaMae) {
                console.log('Já existe uma placa-mãe instalada.');
                return false;
            }
            console.log('Placa-mãe instalada com sucesso.');
            computador.placaMae = peca;
            return true;

        case 'processador':
            if(computador.processador !== null) {
                console.log('Já existe um processador instalado.');
                return false;
            }
            if(computador.placaMae && computador.placaMae.socket === peca.socket) {
                computador.processador = peca;
                console.log('Processador instalado com sucesso.');
                return true;
            } else {
                console.log('O processador não é compatível com a placa-mãe.');
                return false;
            }

        case 'ram':
            if(computador.ram !== null) {
                console.log('Já existe uma RAM instalada.');
                return false;
            }
            if (computador.placaMae && computador.placaMae.ddr === peca.ddr) {
                computador.ram = peca;
                console.log('RAM instalada com sucesso.');
                return true;
            } else {
                console.log('A RAM não é compatível com a placa-mãe.');
                return false;
            }

        case 'placaDeVideo':
            if (!computador.placaDeVideo) {
                computador.placaDeVideo = peca;
                console.log('Placa de vídeo instalada com sucesso.');
                return true;
            } else {
                console.log('Já existe uma placa de vídeo instalada.');
                return false;
            }

        case 'armazenamento':
            if (computador.placaMae && computador.satasUsadas < computador.placaMae.entradasSata) {
                computador.armazenamentos.push(peca);
                computador.satasUsadas++;
                console.log('Dispositivo de armazenamento instalado com sucesso.');
                return true;
            } else {
                console.log('Não há entradas SATA disponíveis na placa-mãe.');
                return false;
            }

        case 'fonte':
            if (computador.fonte === null) {
                computador.fonte = peca;
                console.log('Fonte instalada com sucesso.');
                return true;
            } else {
                console.log('Já existe uma fonte instalada.');
                return false;
            }

        default:
            console.log('Tipo de peça desconhecido.');
            return false;
    }
}

renderInventory();
configureDropZones();