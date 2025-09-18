// Preloader SIMPLIFICADO (sem animações complexas)
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  // Esconde o preloader imediatamente
  preloader.style.display = 'none';
});

// Verificar e aplicar tema salvo
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const toggleThemeButton = document.getElementById('toggle-theme');

  if (!savedTheme) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
      toggleThemeButton.querySelector('img').src = 'icons/sun.svg';
    }
    return;
  }

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleThemeButton.querySelector('img').src = 'icons/sun.svg';
  } else {
    document.body.classList.remove('dark-mode');
    toggleThemeButton.querySelector('img').src = 'icons/moon.svg';
  }
}

// Transição de tema com efeito de onda
function toggleTheme(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const overlay = document.querySelector('.theme-wave-overlay');

  const isDarkMode = document.body.classList.contains('dark-mode');
  const newTheme = isDarkMode ? 'light' : 'dark';

  document.documentElement.style.setProperty('--pos-x', `${x}px`);
  document.documentElement.style.setProperty('--pos-y', `${y}px`);
  overlay.classList.add('active');

  setTimeout(() => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', newTheme);
    const themeIcon = document.getElementById('toggle-theme').querySelector('img');
    themeIcon.src = `icons/${newTheme === 'dark' ? 'sun' : 'moon'}.svg`;

    setTimeout(() => {
      overlay.classList.remove('active');
    }, 300);
  }, 500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();

  const toggleThemeButton = document.getElementById('toggle-theme');
  const mobileToggleThemeButton = document.getElementById('mobile-toggle-theme');

  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', toggleTheme);
  }

  if (mobileToggleThemeButton) {
    mobileToggleThemeButton.addEventListener('click', toggleTheme);
  }

  // Menu Hamburguer
  const menuToggle = document.querySelector('.menu-toggle');
  const navCenter = document.querySelector('.nav-center');
  const body = document.body;

  menuToggle.addEventListener('click', () => {
    navCenter.classList.toggle('active');
    menuToggle.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll('.nav-center a').forEach(link => {
    link.addEventListener('click', () => {
      navCenter.classList.remove('active');
      menuToggle.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Botão voltar ao topo
  const backToTopButton = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Filtro de Projetos
  const filtroBtns = document.querySelectorAll('.filtro-btn');
  const projetoCards = document.querySelectorAll('.projeto-card');

  filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filtro-btn.active').classList.remove('active');
      btn.classList.add('active');
      const filtro = btn.dataset.filter;
      projetoCards.forEach(card => {
        if (filtro === 'all' || card.dataset.category === filtro) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Dados para o modal (exemplo)
  const projetosData = [{
      id: 1,
      titulo: 'Sistema de Gestão de Conteúdo',
      imagem: '/images/pro-1.jpg',
      descricao: 'Plataforma web robusta para a criação e gestão de conteúdo dinâmico. Permite a publicação em tempo real, agendamento de posts e análise de tráfego. Desenvolvido para ser escalável e fácil de usar.',
      tecnologias: ['HTML', 'CSS', 'JavaScript', 'Python', 'Django'],
      linkLive: 'https://exemplo-cms.com',
      linkGitHub: 'https://github.com/AzamUsman/cms-project'
    },
    {
      id: 2,
      titulo: 'App de Produtividade',
      imagem: '/images/pro-2.jpg',
      descricao: 'Aplicação mobile inovadora para organização pessoal e profissional. Inclui gestão de tarefas, calendário integrado e um sistema de lembretes personalizáveis para ajudar a manter o foco.',
      tecnologias: ['Flutter', 'Dart', 'Firebase', 'APIs REST'],
      linkLive: 'https://exemplo-app.com',
      linkGitHub: 'https://github.com/AzamUsman/app-produtividade'
    },
    {
      id: 3,
      titulo: 'E-commerce para Pequenas Empresas',
      imagem: '/images/pro-3.jpg',
      descricao: 'Solução completa de loja online, do catálogo de produtos ao processamento de pagamentos seguro. Foco em uma experiência de usuário simples e um painel de administração intuitivo.',
      tecnologias: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
      linkLive: 'https://exemplo-ecommerce.com',
      linkGitHub: 'https://github.com/AzamUsman/ecommerce-solution'
    },
    {
      id: 4,
      titulo: 'App de Saúde e Fitness',
      imagem: '/images/pro-4.jpg',
      descricao: 'Aplicação mobile para acompanhar exercícios e nutrição. Permite criar metas personalizadas, registrar o progresso e receber dicas de bem-estar. Design moderno e funcional.',
      tecnologias: ['Flutter', 'Dart', 'APIs de Saúde', 'SQLite'],
      linkLive: 'https://exemplo-fitness.com',
      linkGitHub: 'https://github.com/AzamUsman/fitness-app'
    },
    {
      id: 5,
      titulo: 'Dashboard de Análise de Dados',
      imagem: '/images/pro-5.jpg',
      descricao: 'Ferramenta interativa para visualização de dados em tempo real. Permite analisar métricas complexas através de gráficos e painéis personalizados, ideal para tomada de decisões.',
      tecnologias: ['React', 'D3.js', 'Python', 'Flask'],
      linkLive: 'https://exemplo-dashboard.com',
      linkGitHub: 'https://github.com/AzamUsman/data-dashboard'
    },
    {
      id: 6,
      titulo: 'Blog Pessoal Moderno',
      imagem: '/images/pro-6.jpg',
      descricao: 'Blog minimalista e responsivo com sistema de comentários integrado. Desenvolvido para ser rápido e otimizado para SEO, oferecendo uma ótima experiência de leitura.',
      tecnologias: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express'],
      linkLive: 'https://exemplo-blog.com',
      linkGitHub: 'https://github.com/AzamUsman/modern-blog'
    },
  ];

  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  document.querySelectorAll('.btn-detalhes').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = parseInt(btn.dataset.projectId);
      const projeto = projetosData.find(p => p.id === projectId);
      if (projeto) {
        document.querySelector('.modal-image').src = projeto.imagem;
        document.querySelector('.modal-title').textContent = projeto.titulo;
        document.querySelector('.modal-description').textContent = projeto.descricao;
        const techList = document.querySelector('.modal-tech-list');
        techList.innerHTML = '';
        projeto.tecnologias.forEach(tech => {
          const li = document.createElement('li');
          li.textContent = tech;
          techList.appendChild(li);
        });
        document.getElementById('modal-live-link').href = projeto.linkLive;
        document.getElementById('modal-github-link').href = projeto.linkGitHub;
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  });

  // Formulário de contato
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = this.nome.value.trim();
    const email = this.email.value.trim();
    const mensagem = this.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const btnSubmit = this.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';

    emailjs.sendForm('myomg', 'template', this)
      .then(() => {
        alert('Mensagem enviada com sucesso!');
        this.reset();
      }, (error) => {
        alert('Ocorreu um erro ao enviar a mensagem: ' + error.text);
      })
      .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar Mensagem';
      });
  });

});