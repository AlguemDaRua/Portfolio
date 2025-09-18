document.addEventListener('DOMContentLoaded', () => {
  // Preloader SIMPLIFICADO (sem animações complexas)
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
  });

  // Aplica o tema salvo ao carregar a página
  applySavedTheme();

  // Botões de tema
  const toggleThemeButton = document.getElementById('toggle-theme');
  const mobileToggleThemeButton = document.getElementById('mobile-toggle-theme');
  toggleThemeButton.addEventListener('click', toggleTheme);
  mobileToggleThemeButton.addEventListener('click', toggleTheme);

  // Menu mobile
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
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
      behavior: 'smooth',
    });
  });

  // Filtro de projetos
  const filterButtons = document.querySelectorAll('.filtro-btn');
  const projetos = document.querySelectorAll('.projeto-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', e => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      const filter = e.target.dataset.filter;
      projetos.forEach(projeto => {
        const category = projeto.dataset.category;
        if (filter === 'all' || filter === category) {
          projeto.style.display = 'flex';
        } else {
          projeto.style.display = 'none';
        }
      });
    });
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

  // Efeito de máquina de escrever no hero
  const heroTitle = document.querySelector('.hero h1');
  const originalText = heroTitle.textContent;
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < originalText.length) {
      heroTitle.textContent = originalText.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWriter, 80);
    }
  }

  setTimeout(typeWriter, 1000);

  // Inicializar particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#00c6ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00c6ff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true,
        },
      },
    });
  }

  // --- NOVA FUNCIONALIDADE: MODAL DE DETALHES DO PROJETO ---
  const modal = document.getElementById('project-modal');
  const closeButton = document.querySelector('.close-modal');
  const projectButtons = document.querySelectorAll('.btn-detalhes');

  // Dados dos projetos (pode ser carregado de um JSON ou API)
  const projectsData = {
    1: {
      title: 'Loja de Compras Online',
      image: 'images/project1.jpg',
      description:
        'Plataforma de e-commerce completa, desenvolvida para fornecer uma experiência de compra fluida e segura. Possui um sistema de carrinho robusto, checkout simplificado, painel de gestão para produtos, pedidos e utilizadores, e um design responsivo. As funcionalidades incluem pesquisa avançada de produtos, filtros por categoria, avaliações de clientes e um sistema de pagamento integrado.',
      tags: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://ecommerce.example.com',
    },
    2: {
      title: 'Aplicação de Gestão de Tarefas',
      image: 'images/project2.jpg',
      description:
        'Uma aplicação móvel intuitiva e eficaz para ajudar utilizadores a organizar as suas tarefas diárias. Desenvolvida com Flutter, oferece uma interface de utilizador limpa e responsiva em dispositivos Android e iOS. Funcionalidades principais incluem criação de tarefas, definição de prazos, lembretes push, sincronização com a nuvem via Firebase e listas de tarefas personalizáveis.',
      tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
      link: 'https://tasks.example.com',
    },
    3: {
      title: 'Dashboard de Análise de Dados',
      image: 'images/project3.jpg',
      description:
        'Este painel interativo foi projetado para visualizar e analisar grandes conjuntos de dados de forma simples e intuitiva. Construído com React e Python, utiliza bibliotecas como D3.js para criar gráficos dinâmicos e painéis personalizáveis. Permite aos utilizadores fazer filtros, comparações e exportar relatórios, tornando a análise de dados acessível a não especialistas.',
      tags: ['React', 'Python', 'D3.js', 'Data Science'],
      link: 'https://dashboard.example.com',
    },
  };

  function openModal(projectId) {
    const project = projectsData[projectId];
    if (project) {
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-image').src = project.image;
      document.getElementById('modal-description').textContent = project.description;

      const tagsContainer = document.getElementById('modal-tags');
      tagsContainer.innerHTML = '';
      project.tags.forEach(tagText => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tagText;
        tagsContainer.appendChild(tagSpan);
      });

      document.getElementById('modal-link').href = project.link;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Evita o scroll no body
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  projectButtons.forEach(button => {
    button.addEventListener('click', e => {
      const projectId = e.target.dataset.projectId;
      openModal(projectId);
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
});

// A função toggleTheme está fora do listener DOMContentLoaded para que possa ser acedida globalmente
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

    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-mode');

    // Mudar o ícone do botão
    if (newTheme === 'dark') {
        button.querySelector('img').src = 'icons/sun.svg';
    } else {
        button.querySelector('img').src = 'icons/moon.svg';
    }

    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const otherButton = currentTheme === 'dark'
        ? document.getElementById('mobile-toggle-theme')
        : document.getElementById('toggle-theme');

    if (otherButton) {
        otherButton.querySelector('img').src = currentTheme === 'dark' ? 'icons/sun.svg' : 'icons/moon.svg';
    }
}