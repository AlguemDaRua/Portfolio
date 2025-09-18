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

    overlay.style.background = newTheme === 'dark' ? '#121212' : '#f8f9fa';
    overlay.style.setProperty('--pos-x', `${x}px`);
    overlay.style.setProperty('--pos-y', `${y}px`);
    overlay.classList.add('active');

    // Mudar o tema após a animação
    setTimeout(() => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', newTheme);

        const themeIcon = button.querySelector('img');
        themeIcon.src = newTheme === 'dark' ? 'icons/sun.svg' : 'icons/moon.svg';
        themeIcon.alt = newTheme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro';

        // Remover a classe active após a animação
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 100);
    }, 500);
}


// Dados dos projectos para o modal
const projectData = {
    'ecommerce': {
        title: 'Plataforma E-commerce',
        category: 'Desenvolvimento Web',
        description: 'Desenvolvimento de uma plataforma de comércio eletrónico de ponta. A aplicação apresenta uma interface de utilizador responsiva, um carrinho de compras funcional, gestão de produtos, integração de gateways de pagamento e um painel de administração para gestão de stock e pedidos. Construída com React para a interface do utilizador, Node.js e Express para o backend, e MongoDB para a base de dados, garantindo escalabilidade e desempenho.',
        techs: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
        image: '/images/projetos/web1.jpg',
        siteLink: '#',
        githubLink: '#'
    },
    'parkwise': {
        title: 'ParkWISE',
        category: 'Mobile',
        description: 'Aplicativo móvel para monitoramento e gestão de estacionamento em tempo real. O ParkWISE permite que os usuários encontrem vagas de estacionamento disponíveis, visualizem a ocupação em tempo real e paguem pelo estacionamento digitalmente. Utiliza Flutter para uma experiência fluida em iOS e Android e Firebase para autenticação de utilizadores, armazenamento de dados em tempo real e hospedagem.',
        techs: ['Flutter', 'Firebase', 'Dart', 'Google Maps API'],
        image: '/images/projetos/parkwise.png',
        siteLink: '#',
        githubLink: '#'
    },
    'auth-system': {
        title: 'Sistema de Autenticação',
        category: 'Backend',
        description: 'Criação de um sistema robusto e seguro para autenticação e autorização de utilizadores. O sistema lida com o registo, login, redefinição de palavra-passe e gestão de tokens de sessão. Projetado com Golang para alto desempenho e concorrência, utiliza JWT para segurança e armazena credenciais e dados de utilizadores em um banco de dados PostgreSQL.',
        techs: ['Golang', 'JWT', 'PostgreSQL', 'Docker', 'REST API'],
        image: '/images/projetos/backend1.jpg',
        siteLink: '#',
        githubLink: '#'
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();

    // Botão voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        if (scrollPosition > 500) {
            backToTopButton.style.display = 'flex';
            backToTopButton.style.opacity = '1';
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 500) {
                    backToTopButton.style.display = 'none';
                    backToTopButton.classList.remove('visible');
                }
            }, 300);
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');

    // Copiar o menu principal para o mobile
    const navList = document.querySelector('.nav-center ul').cloneNode(true);
    mobileMenu.appendChild(navList);

    // Adicionar botão de tema ao menu mobile
    const themeToggleContainer = document.createElement('div');
    themeToggleContainer.classList.add('mobile-theme-toggle');
    const themeButton = document.querySelector('#toggle-theme').cloneNode(true);
    themeButton.id = 'mobile-toggle-theme';
    themeToggleContainer.appendChild(themeButton);
    mobileMenu.appendChild(themeToggleContainer);

    document.body.appendChild(mobileMenu);

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Fechar menu ao clicar nos links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !e.target.closest('.mobile-menu') &&
            !e.target.closest('.menu-toggle')) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Filtro de Projetos
    const filtroBtns = document.querySelectorAll('.filtro-projetos .btn');
    const projetos = document.querySelectorAll('.projeto-card');
    const projetosGrid = document.querySelector('.projetos-grid');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filtro = btn.getAttribute('data-filter');
            projetosGrid.style.opacity = '0.5';

            setTimeout(() => {
                projetos.forEach(projeto => {
                    if (filtro === 'todos' || projeto.classList.contains(filtro)) {
                        projeto.style.display = 'block';
                        setTimeout(() => projeto.style.opacity = '1', 50);
                    } else {
                        projeto.style.display = 'none';
                    }
                });
                projetosGrid.style.opacity = '1';
            }, 300);
        });
    });

    // Botões de tema
    const toggleThemeButton = document.getElementById('toggle-theme');
    const mobileToggleThemeButton = document.getElementById('mobile-toggle-theme');

    toggleThemeButton.addEventListener('click', toggleTheme);
    mobileToggleThemeButton.addEventListener('click', toggleTheme);

    // Lógica do Modal de Projetos
    const projectModalOverlay = document.querySelector('.project-modal-overlay');
    const projectModal = document.querySelector('.project-modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButton = document.querySelector('.modal-close-btn');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = e.target.getAttribute('data-id');
            const project = projectData[projectId];

            if (project) {
                // Preencher o modal com os dados do projeto
                document.querySelector('.modal-image').src = project.image;
                document.querySelector('.modal-category').textContent = project.category;
                document.querySelector('.modal-title').textContent = project.title;
                document.querySelector('.modal-description').textContent = project.description;

                // Preencher tecnologias
                const techList = document.querySelector('.modal-tech-list');
                techList.innerHTML = '';
                project.techs.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    techList.appendChild(span);
                });

                // Atualizar links
                document.querySelector('.modal-btn-primary').href = project.siteLink;
                document.querySelector('.modal-btn-secondary').href = project.githubLink;

                // Mostrar o modal
                projectModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evita scroll no corpo
            }
        });
    });

    // Fechar modal
    const closeModal = () => {
        projectModalOverlay.classList.add('closing'); // Adiciona classe para a animação de fecho
        projectModalOverlay.addEventListener('transitionend', () => {
            projectModalOverlay.classList.remove('active', 'closing');
            document.body.style.overflow = '';
        }, { once: true }); // Garante que o evento só é executado uma vez
    };

    closeModalButton.addEventListener('click', closeModal);

    projectModalOverlay.addEventListener('click', (e) => {
        // Fechar o modal se o clique for no overlay e não no modal em si
        if (e.target === projectModalOverlay) {
            closeModal();
        }
    });

    // Inicializar EmailJS
    (function () {
        emailjs.init('SEU_PUBLIC_KEY');
    })();

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