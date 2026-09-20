const defaultAvatar = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+CiAgPHJlY3QgZmlsbD0iI2UyZTJlMiIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiLz4KICA8dGV4dCBmaWxsPSIjNjY2NjY2IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjUwIiBmb250LXdlaWdodD0iYm9sZCIgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPmNvbGxhYm9yYXRvcjwvdGV4dD4KPC9zdmc+";

const collaboratorsData = [
  {
    name: "Heitor",
    job: "Desenvolvimento Web",
    resume: "Atua no desenvolvimento e construção do site em conjunto com Valdersson e Henrique. Responsável pelo desenvolvimento das páginas Home e About.",
    photo: defaultAvatar
  },
  {
    name: "Valdersson",
    job: "Desenvolvimento Web",
    resume: "Atua no desenvolvimento e construção do site em conjunto com Heitor e Henrique. Responsável pelo desenvolvimento da página Aprender.",
    photo: defaultAvatar
  },
  {
    name: "Henrique",
    job: "Desenvolvimento de Jogo",
    resume: "Responsável pelo Módulo do Jogo em sua totalidade, com apoio de Ricardo no design; também atua no desenvolvimento e construção do site.",
    photo: defaultAvatar
  },
  {
    name: "Ricardo",
    job: "Conteúdo & Design Home",
    resume: "Apoia Henrique no design do Módulo do Jogo, desenvolve o conteúdo da Home e participa da construção da apresentação do projeto.",
    photo: defaultAvatar
  },
  {
    name: "Héber",
    job: "Conteúdo do Tutorial",
    resume: "Responsável pelo desenvolvimento do conteúdo da seção de Tutorial, com base nos wireframes definidos pela equipe.",
    photo: defaultAvatar
  },
  {
    name: "André",
    job: "Conteúdo Página Sobre",
    resume: "Responsável pelo conteúdo da aba Sobre (textos, imagens e vídeos), com base nos wireframes do Trello; também integra a equipe de apresentação.",
    photo: defaultAvatar
  },
  {
    name: "Pedro Arthur",
    job: "Hardware & Compatibilidade",
    resume: "Responsável, junto com Carlos, pela definição das peças de hardware utilizadas no jogo, como placas de vídeo e demais componentes de PC.",
    photo: defaultAvatar
  },
  {
    name: "Carlos",
    job: "Hardware & Compatibilidade",
    resume: "Responsável, junto com Pedro Arthur, pela definição das peças de hardware utilizadas no jogo, como placas de vídeo e demais componentes de PC.",
    photo: defaultAvatar
  },
  {
    name: "Yan",
    job: "Apresentação",
    resume: "Responsável, junto com Ricardo e André, pela construção da apresentação do projeto para o público e para os professores da disciplina.",
    photo: defaultAvatar
  }
];

// Função para renderizar usando o <template>
function renderCollaborators() {
  const container = document.getElementById('collaborators-container');
  const template = document.getElementById('collaborator-template');


  collaboratorsData
  .sort((a,b)=> a.name.localeCompare(b.name)) // order alfabetically
  .forEach(person => {
    // Clona a estrutura do template
    const clone = template.content.cloneNode(true);

    // Preenche as informações no nó clonado
    const img = clone.querySelector('.collaborator-profile-picture');
    img.src = person.photo;
    img.alt = `Foto de perfil de ${person.name}`;

    clone.querySelector('.collaborator-name').textContent = person.name;
    clone.querySelector('.collaborator-job').textContent = person.job;
    clone.querySelector('.collaborator-resume').textContent = person.resume;

    // Adiciona o elemento preenchido à página
    container.appendChild(clone);
  });
}

// Executa a função após carregar o DOM
document.addEventListener('DOMContentLoaded', renderCollaborators);