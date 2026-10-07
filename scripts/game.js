const pecas = [
    {
        id: 'b550m',
        tipo: 'placaMae',
        modelo: 'Placa Mãe B550M',
        socket: 'AM4',
        ddr: 'DDR4',
        entradasSata: 4,
        consumoWatts: 20,
        assetKey: 'placa-mae-b550m',

        imgInventory: '../assets/components/placa_mãe_encaixe_pixelart B550M.png',
        imgInstalled: '../assets/components/placa_mãe_encaixe_pixelart B550M.png'

    },

    {
        id: 'b660m',
        tipo: 'placaMae',
        modelo: 'Placa Mãe B660M',
        socket: 'LGA1700',
        ddr: 'DDR4',
        entradasSata: 4,
        consumoWatts: 25,
        assetKey: 'placa-mae-b660m',

        imgInventory: '../assets/components/Placa_mãe_encaixe_B660M.png',
        imgInstalled: '../assets/components/Placa_mãe_encaixe_B660M.png'
    },
    
    {
        id: 'ryzen5-5600',
        tipo: 'processador',
        modelo: 'Ryzen 5 5600',
        socket: 'AM4',
        consumoWatts: 65,

        imgInventory: '../assets/components/processador.png',
        imgInstalled: '../assets/components/processador.png'
    },

    {
        id: 'corsair-8GB',
        tipo: 'ram',
        modelo: 'Memória Corsair 8GB',
        ddr: 'DDR4',
        capacidadeGB: 8,
        consumoWatts: 5,
        assetKey: 'memoria-ram-ddr3',

        imgInventory: '../assets/components/memória_ram_encaixe_pixelart DDR3.png',
        imgInstalled: '../assets/components/memória_ram_encaixe_pixelart DDR3.png'
    },

    {
        id: 'fury-ddr4-8gb',
        tipo: 'ram',
        modelo: 'Memória Fury DDR4 8GB',
        ddr: 'DDR4',
        capacidadeGB: 8,
        consumoWatts: 5,
        assetKey: 'memoria-ram-ddr4-fury',

        imgInventory: '../assets/components/memória_ram_encaixe_DDR4_Fury.png',
        imgInstalled: '../assets/components/memória_ram_encaixe_DDR4_Fury.png'
    },

    {
        id: 'gtx1660',
        tipo: 'placaDeVideo',
        modelo: 'GTX 1660',
        consumoWatts: 120,
        assetKey: 'placa-video-gtx1660',

        imgInventory: '../assets/components/Placa_vídeo_encaixe_pixelart GTX 1660.png',
        imgInstalled: '../assets/components/Placa_vídeo_encaixe_pixelart GTX 1660.png'
    },

    {
        id: 'rx580',
        tipo: 'placaDeVideo',
        modelo: 'Radeon RX 580',
        consumoWatts: 185,
        assetKey: 'placa-video-rx580',

        imgInventory: '../assets/components/placa_vídeo_encaixe_iRX580.png',
        imgInstalled: '../assets/components/placa_vídeo_encaixe_iRX580.png'
    },

    {
        id: 'kingston-a400',
        tipo: 'armazenamento',
        modelo: 'kingston A400',
        capacidadeGB: 480,
        consumoWatts: 5,
        sata: true,
        assetKey: 'ssd-a400',
        
        imgInventory: '../assets/components/SSD_encaixe_pixelart A400.png',
        imgInstalled: '../assets/components/SSD_encaixe_pixelart A400.png'
    },

    {
        id: 'corsair-550w',
        tipo: 'fonte',
        modelo: 'Corsair 550W',
        potenciaWatts: 550,
        assetKey: 'fonte-550w',

        imgInventory: '../assets/components/fonte_encaixe_pixelart 550W.png',
        imgInstalled: '../assets/components/fonte_encaixe_pixelart 550W.png'
    },

    {
        id: 'z490',
        tipo: 'placaMae',
        modelo: 'Z490',
        socket: 'LGA1200',
        ddr: 'DDR4',
        entradasSata: 6,
        consumoWatts: 25,
        assetKey: 'placa-mae-b550m',

        imgInventory: '../assets/components/placa_mãe_encaixe_pixelart B550M.png',
        imgInstalled: '../assets/components/placa_mãe_encaixe_pixelart B550M.png'
    },

    {
        id: 'hd-1tb',
        tipo: 'armazenamento',
        modelo: 'HD1TB',
        capacidadeGB: 1000,
        consumoWatts: 5,
        sata: true,
        assetKey: 'hd-1tb',

        imgInventory: '../assets/components/HD_encaixe_pixelart 1TB.png',
        imgInstalled: '../assets/components/HD_encaixe_pixelart 1TB.png'
    }

]

function createComponentArt(peca, installed = false) {
    const art = document.createElement('div');
    const img = document.createElement('img');
    const src = installed ? peca.imgInstalled : peca.imgInventory;

    art.className = 'component-art';
    art.dataset.asset = src.split('/').pop().replace('.png', '');
    img.src = src;
    img.alt = peca.modelo;
    img.draggable = false;
    img.className = installed ? 'installed-img' : 'inventory-img';
    art.appendChild(img);
    return art;
}

function clearDropHighlights() {
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('is-available', 'is-over');
    });
}

function renderInventory() {
    const inventory = document.querySelector('#inventory');

    pecas.forEach(peca => {
        const element = document.createElement('div');
        const preview = document.createElement('div');
        preview.className = 'inventory-preview';
        preview.appendChild(createComponentArt(peca));
        element.appendChild(preview);
        const name = document.createElement('span');
        name.textContent = peca.modelo;
        name.classList.add("inventory-name");
        element.appendChild(name);
        element.dataset.id = peca.id;

        element.classList.add("inventory-item");

        element.draggable = true;
        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text/plain", element.dataset.id);
            event.dataTransfer.effectAllowed = 'copy';
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.toggle('is-available', zone.dataset.accept === peca.tipo);
            });
        });
        element.addEventListener('dragend', clearDropHighlights);

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
            event.stopPropagation();
            dropZone.classList.toggle('is-over', dropZone.classList.contains('is-available'));
        });

        dropZone.addEventListener('dragleave', (event) => {
            if (!dropZone.contains(event.relatedTarget)) {
                dropZone.classList.remove('is-over');
            }
        });

        dropZone.addEventListener('drop', (event) => {
            event.preventDefault();
            event.stopPropagation();
            clearDropHighlights();
            const id = event.dataTransfer.getData("text/plain");
            const peca = buscarPecaPorId(id);
            const tipoAceito = dropZone.dataset.accept;
            if (peca && peca.tipo === tipoAceito) {
                const sucesso = instalarPeca(peca);
                if (sucesso) {
                    const element = document.createElement('div');

                    element.classList.add("installed-item");
                    element.dataset.id = peca.id;
                    element.appendChild(createComponentArt(peca, true));
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
    clearDropHighlights();
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
