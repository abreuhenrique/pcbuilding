const pecas = [
    {
        id: 'b550m',
        tipo: 'placaMae',
        modelo: 'Placa Mãe B550M',
        socket: 'AM4',
        ddr: 'DDR4',
        ramSlots: 4,
        entradasSata: 4,
        consumoWatts: 20,
        assetKey: 'placa-mae-b550m',

        imgInventory: '../assets/components/mb-b550m-encaixe.png',
        imgInstalled: '../assets/components/mb-b550m-encaixe.png'

    },

    {
        id: 'b660m',
        tipo: 'placaMae',
        modelo: 'Placa Mãe B660M',
        socket: 'LGA1700',
        ddr: 'DDR4',
        ramSlots: 4,
        entradasSata: 4,
        consumoWatts: 25,
        assetKey: 'placa-mae-b660m',

        imgInventory: '../assets/components/mb-b660m-encaixe.png',
        imgInstalled: '../assets/components/mb-b660m-encaixe.png'
    },

        {
        id: 'z490',
        tipo: 'placaMae',
        modelo: 'Placa Mãe Z490',
        socket: 'LGA1200',
        ddr: 'DDR4',
        ramSlots: 4,
        entradasSata: 6,
        consumoWatts: 25,
        assetKey: 'placa-mae-b550m',

        imgInventory: '../assets/components/mb-z490-encaixe.png',
        imgInstalled: '../assets/components/mb-z490-encaixe.png'
    },
    
    {
        id: 'ryzen5-5600',
        tipo: 'processador',
        modelo: 'Ryzen 5 5600',
        socket: 'AM4',
        consumoWatts: 65,
        assetKey: 'processador-ryzen-5600',

        imgInventory: '../assets/components/cpu-r5-5600-encaixe.png',
        imgInstalled: '../assets/components/cpu-r5-5600-encaixe.png'
    },

    {
        id: 'intel-i5-12400',
        tipo: 'processador',
        modelo: 'Intel Core i5-12400',
        socket: 'LGA1700',
        consumoWatts: 65,
        assetKey: 'processador-intel-i5',

        imgInventory: '../assets/components/cpu-i5-12400-encaixe.png',
        imgInstalled: '../assets/components/cpu-i5-12400-encaixe.png'
    },

    {
        id: 'corsair-8GB',
        tipo: 'ram',
        modelo: 'Memória Corsair 8GB',
        ddr: 'DDR4',
        capacidadeGB: 8,
        consumoWatts: 5,
        assetKey: 'memoria-ram-ddr3',

        imgInventory: '../assets/components/ram-ddr4-encaixe.png',
        imgInstalled: '../assets/components/ram-ddr4-encaixe.png'
    },

    {
        id: 'fury-ddr4-8gb',
        tipo: 'ram',
        modelo: 'Memória Fury DDR4 8GB',
        ddr: 'DDR4',
        capacidadeGB: 8,
        consumoWatts: 5,
        assetKey: 'memoria-ram-ddr4-fury',

        imgInventory: '../assets/components/ram-ddr5-encaixe.png',
        imgInstalled: '../assets/components/ram-ddr5-encaixe.png'
    },

    {
        id: 'gtx1660',
        tipo: 'placaDeVideo',
        modelo: 'GTX 1660',
        consumoWatts: 120,
        assetKey: 'placa-video-gtx1660',

        imgInventory: '../assets/components/gpu-gtx-1660-encaixe.png',
        imgInstalled: '../assets/components/gpu-gtx-1660-encaixe.png'
    },

    {
        id: 'rx580',
        tipo: 'placaDeVideo',
        modelo: 'Radeon RX 580',
        consumoWatts: 185,
        assetKey: 'placa-video-rx580',

        imgInventory: '../assets/components/gpu-rx580-encaixe.png',
        imgInstalled: '../assets/components/gpu-rx580-encaixe.png'
    },

    {
        id: 'kingston-a400',
        tipo: 'armazenamento',
        modelo: 'kingston A400',
        capacidadeGB: 480,
        consumoWatts: 5,
        sata: true,
        assetKey: 'ssd-a400',
        
        imgInventory: '../assets/components/ssd-a400-encaixe.png',
        imgInstalled: '../assets/components/ssd-a400-encaixe.png'
    },

    {
        id: 'corsair-550w',
        tipo: 'fonte',
        modelo: 'Corsair 550W',
        potenciaWatts: 550,
        assetKey: 'fonte-550w',

        imgInventory: '../assets/components/fonte-650w-encaixe.png',
        imgInstalled: '../assets/components/fonte-650w-encaixe.png'
    },

    {
        id: 'hd-1tb',
        tipo: 'armazenamento',
        modelo: 'HD1TB',
        capacidadeGB: 1000,
        consumoWatts: 5,
        sata: true,
        assetKey: 'hd-1tb',

        imgInventory: '../assets/components/hd-1tb-encaixe.png',
        imgInstalled: '../assets/components/hd-1tb-encaixe.png'
    }

]

function createComponentArt(peca, installed = false) {
    const art = document.createElement('div');
    const img = document.createElement('img');
    const src = installed ? peca.imgInstalled : peca.imgInventory;

    art.className = 'component-art';
    art.dataset.asset = peca.assetKey || src.split('/').pop().replace('.png', '');
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

function getPieceDetails(peca) {
    switch (peca.tipo) {
        case 'placaMae':
            return [
                `Socket: ${peca.socket}`,
                `Memória: ${peca.ddr}`,
                `Slots de RAM: ${peca.ramSlots}`,
                `Portas SATA: ${peca.entradasSata}`,
                `Consumo: ${peca.consumoWatts} W`
            ];
        case 'processador':
            return [
                `Socket: ${peca.socket}`,
                `Consumo: ${peca.consumoWatts} W`
            ];
        case 'ram':
            return [
                `Tipo: ${peca.ddr}`,
                `Capacidade: ${peca.capacidadeGB} GB`,
                `Consumo: ${peca.consumoWatts} W`
            ];
        case 'placaDeVideo':
            return [`Consumo: ${peca.consumoWatts} W`];
        case 'armazenamento':
            return [
                `Capacidade: ${peca.capacidadeGB} GB`,
                `Interface: ${peca.sata ? 'SATA' : '—'}`,
                `Consumo: ${peca.consumoWatts} W`
            ];
        case 'fonte':
            return [`Potência: ${peca.potenciaWatts} W`];
        default:
            return [];
    }
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

        const tooltip = document.createElement('div');
        const tooltipTitle = document.createElement('strong');
        const tooltipDetails = document.createElement('span');
        tooltip.classList.add('inventory-tooltip');
        tooltipTitle.textContent = peca.modelo;
        tooltipDetails.textContent = getPieceDetails(peca).join('\n');
        tooltip.appendChild(tooltipTitle);
        tooltip.appendChild(tooltipDetails);
        element.appendChild(tooltip);

        element.dataset.id = peca.id;

        element.classList.add("inventory-item");

        element.draggable = true;
        element.addEventListener('dragstart', (event) => {
            element.classList.add('is-dragging');
            event.dataTransfer.setData("text/plain", element.dataset.id);
            event.dataTransfer.effectAllowed = 'copy';
            event.dataTransfer.setDragImage(
                preview,
                preview.offsetWidth / 2,
                preview.offsetHeight / 2
            );
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.toggle(
                    'is-available',
                    zone.dataset.accept === peca.tipo && !zone.classList.contains('is-disabled')
                );
            });
        });
        element.addEventListener('dragend', () => {
            element.classList.remove('is-dragging');
            clearDropHighlights();
        });

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
            const slotOcupado = dropZone.classList.contains('ram-zone') && dropZone.querySelector('.installed-item');
            if (slotOcupado) {
                showFeedback('Este slot de memória já está ocupado.', 'error');
            } else if (peca && peca.tipo === tipoAceito && !dropZone.classList.contains('is-disabled')) {
                const sucesso = instalarPeca(peca);
                if (sucesso) {
                    const element = document.createElement('div');

                    element.classList.add("installed-item");
                    element.dataset.id = peca.id;
                    element.appendChild(createComponentArt(peca, true));
                    dropZone.appendChild(element);
                    if (peca.tipo === 'placaMae') {
                        document.querySelector('.motherboard-zone').dataset.board = peca.id;
                        updateRamSlots();
                    }
                    showFeedback(`Peça ${peca.modelo} instalada com sucesso!`, 'success');
                } else {
                    showFeedback(`Falha ao instalar a peça ${peca.modelo}.`, 'error');
                }
            } else if (peca && peca.tipo === tipoAceito && dropZone.classList.contains('is-disabled')) {
                showFeedback('Não há slots de RAM disponíveis nesta placa-mãe.', 'error');
            } else if (peca && peca.tipo !== tipoAceito) {
                showFeedback(`Peça ${peca.modelo} não pode ser instalada nesta zona.`, 'error');
            }
        });
    })
}

function calcConsumption() {
    let consumption = 0;
    if (computador.placaMae) consumption += computador.placaMae.consumoWatts;
    if (computador.processador) consumption += computador.processador.consumoWatts;
    computador.ram.forEach(memoria => {
        consumption += memoria.consumoWatts;
    });
    if (computador.placaDeVideo) consumption += computador.placaDeVideo.consumoWatts;
    computador.armazenamentos.forEach(armazenamento => {
        consumption += armazenamento.consumoWatts;
    });
    return consumption;
}

function checkAssembly() {
    return computador.placaMae && computador.processador && computador.ram.length > 0 && computador.placaDeVideo && computador.fonte && computador.armazenamentos.length > 0;
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
const completionScreen = document.querySelector('#completion-screen');
const completionVideo = document.querySelector('#completion-video');
const closeCompletionButton = document.querySelector('#close-completion');

function showCompletionVideo() {
    completionScreen.hidden = false;
    completionScreen.setAttribute('aria-hidden', 'false');
    document.body.classList.add('completion-open');
    completionVideo.currentTime = 0;
    completionVideo.play().catch(() => {
        showFeedback("Montagem concluída! Pressione reproduzir para assistir ao vídeo.", 'success');
    });
    closeCompletionButton.focus();
}

function hideCompletionVideo() {
    completionVideo.pause();
    completionScreen.hidden = true;
    completionScreen.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('completion-open');
    turnOnButton.focus();
}

turnOnButton.addEventListener('click', () => {
    console.log("Consumo do PC: " + calcConsumption());
    console.log("PC Montado Corretamente: " + checkAssembly());
    if (turnOnComputer()) {
        showCompletionVideo();
    }

});

closeCompletionButton.addEventListener('click', hideCompletionVideo);

completionVideo.addEventListener('ended', () => {
    completionVideo.pause();
});

function showFeedback(text, type = 'info') {
    const feedbackMessage = document.querySelector('#feedback');
    feedbackMessage.textContent = text;
    feedbackMessage.classList.remove('feedback-success', 'feedback-error', 'feedback-info');
    feedbackMessage.classList.add(`feedback-${type}`);
}

function resetComputer() {
    clearDropHighlights();
    if (!completionScreen.hidden) {
        hideCompletionVideo();
    }
    computador.placaMae = null;
    computador.processador = null;
    computador.ram = [];
    computador.placaDeVideo = null;
    computador.armazenamentos = [];
    computador.fonte = null;
    computador.satasUsadas = 0;
    const motherboardZone = document.querySelector('.motherboard-zone');
    delete motherboardZone.dataset.board;
    updateRamSlots();

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
    ram: [],
    placaDeVideo: null,
    armazenamentos: [],
    fonte: null,

    satasUsadas: 0
}

function buscarPecaPorId(id) {
    return pecas.find(peca => peca.id === id);
}

function updateRamSlots() {
    const motherboardZone = document.querySelector('.motherboard-zone');
    const ramSlots = document.querySelectorAll('.ram-zone');
    const limite = computador.placaMae?.ramSlots ?? 0;

    ramSlots.forEach((slot, index) => {
        const disabled = index >= limite;
        slot.classList.toggle('is-disabled', disabled);
        slot.setAttribute('aria-hidden', disabled ? 'true' : 'false');
    });

    if (!computador.placaMae) {
        motherboardZone.removeAttribute('data-board');
    }
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
            updateRamSlots();
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
            if (!computador.placaMae) {
                console.log('Instale uma placa-mãe antes da memória RAM.');
                return false;
            }
            if (computador.placaMae.ddr !== peca.ddr) {
                console.log('A RAM não é compatível com a placa-mãe.');
                return false;
            }
            if (computador.ram.length >= computador.placaMae.ramSlots) {
                console.log('Não há slots de RAM disponíveis na placa-mãe.');
                return false;
            }
            if (computador.placaMae && computador.placaMae.ddr === peca.ddr) {
                computador.ram.push(peca);
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

updateRamSlots();
renderInventory();
configureDropZones();
