const pecas = [
    {
        id: 'b550m',
        tipo: 'placaMae',
        modelo: 'B550M',
        socket: 'AM4',
        ddr: 'DDR4',
        entradasSata: 4,
        consumoWatts: 20
    },
    
    {
        id: 'ryzen5-5600',
        tipo: 'processador',
        modelo: 'Ryzen 5 5600',
        socket: 'AM4',
        consumoWatts: 65
    },

    {
        id: 'corsair-8GB',
        tipo: 'ram',
        modelo: 'corsair',
        ddr: 'DDR4',
        capacidadeGB: 8,
        consumoWatts: 5
    },

    {
        id: 'gtx1660',
        tipo: 'placaDeVideo',
        modelo: 'GTX 1660',
        consumoWatts: 120
    },

    {
        id: 'kingston-a400',
        tipo: 'armazenamento',
        modelo: 'kingston A400',
        capacidadeGB: 480,
        consumoWatts: 5,
        sata: true
    },

    {
        id: 'corsair-550w',
        tipo: 'fonte',
        modelo: 'Corsair 550W',
        potenciaWatts: 550
    },

    {
        id: 'z490',
        tipo: 'placaMae',
        modelo: 'Z490',
        socket: 'LGA1200',
        ddr: 'DDR4',
        entradasSata: 6,
        consumoWatts: 25
    },

    {
        id: 'hd-1tb',
        tipo: 'armazenamento',
        modelo: 'HD1TB',
        capacidadeGB: 1000,
        consumoWatts: 5,
        sata: true
    }

]

function renderInventory() {
    const inventory = document.querySelector('#inventory');

    pecas.forEach(peca => {
        const element = document.createElement('div');
        element.textContent = peca.modelo;
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
 
renderInventory();
configureWorkTable();

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
                return;
            }
            computador.placaMae = peca;
            console.log(`Placa-mãe ${peca.modelo} instalada.`);
            break;
        case 'processador':
            if (computador.placaMae && computador.placaMae.socket === peca.socket) {
                computador.processador = peca;
                console.log(`Processador ${peca.modelo} instalado.`);
            } else {
                console.log('Processador não compatível com a placa-mãe.');
            }
            break;

        case 'ram':
            if (computador.placaMae && computador.placaMae.ddr === peca.ddr) {
                computador.ram = peca;
                console.log(`RAM ${peca.modelo} instalada.`);
            } else {
                console.log('RAM não compatível com a placa-mãe.');
            }
            break;

        case 'placaDeVideo':
            computador.placaDeVideo = peca;
            console.log(`Placa de vídeo ${peca.modelo} instalada.`);
            break;

        case 'armazenamento':
            if (computador.placaMae && computador.satasUsadas < computador.placaMae.entradasSata) {
                computador.armazenamentos.push(peca);
                computador.satasUsadas++;
                console.log(`Armazenamento ${peca.modelo} instalado.`);
            } else {
                console.log('Não há entradas SATA disponíveis na placa-mãe.');
            }
            break;

        case 'fonte':
            computador.fonte = peca;
            console.log(`Fonte ${peca.modelo} instalada.`);
            break;

        default:
            console.log('Tipo de peça desconhecido.');
    }
}
console.log(computador);