const updatesList = document.getElementById('updates-list');
const updateModal = document.getElementById('update-modal');
const updateModalImage = document.getElementById('update-modal-img');
const updateModalTitle = document.getElementById('update-modal-title');
const updateModalDescription = document.getElementById('update-modal-description');
const updateModalContent = document.getElementById('update-modal-content');

function isUpdate(post) {
    return post
        && typeof post.title === 'string'
        && typeof post.description === 'string'
        && typeof post.content === 'string'
        && typeof post.image === 'string'
        && typeof post.imageAlt === 'string';
}

function createUpdateCard(post) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'update_template';

    const image = document.createElement('img');
    image.src = post.image;
    image.alt = post.imageAlt;
    image.draggable = false;
    image.className = 'update_template_img';

    const title = document.createElement('span');
    title.className = 'update_template_header';
    title.textContent = post.title;

    const description = document.createElement('span');
    description.className = 'update_template_paragraph';
    description.textContent = post.description;

    card.append(image, title, description);
    card.addEventListener('click', () => {
        updateModalImage.src = post.image;
        updateModalImage.alt = post.imageAlt;
        updateModalTitle.textContent = post.title;
        // updateModalDescription.textContent = post.description;
        updateModalContent.textContent = post.content;
        updateModal.showModal();
    });

    return card;
}

async function loadUpdates() {
    try {
        const response = await fetch('/data/updates.json');
        if (!response.ok) {
            throw new Error(`Falha ao carregar updates.json: HTTP ${response.status}`);
        }

        const posts = await response.json();
        if (!Array.isArray(posts) || !posts.every(isUpdate)) {
            throw new Error('O arquivo updates.json deve conter uma lista de posts válidos.');
        }

        if (posts.length === 0) {
            const status = document.createElement('p');
            status.className = 'updates-status';
            status.textContent = 'Nenhuma atualização disponível.';
            updatesList.replaceChildren(status);
            return;
        }

        updatesList.replaceChildren(...posts.map(createUpdateCard));
    } catch (error) {
        console.error('Não foi possível carregar as atualizações.', error);
        const status = document.createElement('p');
        status.className = 'updates-status';
        status.textContent = 'Não foi possível carregar as atualizações.';
        updatesList.replaceChildren(status);
    }
}

document.getElementById('update-modal-close').addEventListener('click', () => {
    updateModal.close();
});

updateModal.addEventListener('click', (event) => {
    if (event.target === updateModal) {
        updateModal.close();
    }
});

loadUpdates();
