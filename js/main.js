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

// Função para inicializar as partículas
function initParticlesWithRetry(attempt = 0) {
    if (attempt > 3) return;

    if (typeof particlesJS === 'function') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 100 },
                color: { value: "#ff4d94" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00c6ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            }
        });
    } else {
        setTimeout(() => initParticlesWithRetry(attempt + 1), 200);
    }
}

// DOMContentLoaded para garantir que o DOM está pronto
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar o tema
    applySavedTheme();

    // Event listener para alternar tema
    const toggleThemeButton = document.getElementById('toggle-theme');
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', toggleTheme);
    }

    // Lógica do menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                document.body.classList.toggle('modal-open');
            }
        });
    }

    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // Botão Voltar ao Topo
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
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
    }

    // Filtro de Projetos
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const projectCards = document.querySelectorAll('.projeto-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
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

        // Os IDs são os que você criou no EmailJS
        const serviceID = 'myomg';
        const templateID = 'template';

        emailjs.sendForm(serviceID, templateID, this)
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
    initParticlesWithRetry();

    // Lógica do Modal de Projetos
    const projectDetails = {
        '1': {
            title: 'Sistema de Gestão de Conteúdo',
            image: '/images/pro-1.jpg',
            description: 'Uma plataforma web completa para criação, edição e publicação de conteúdo digital. Construída com um backend robusto em Python (Django) e uma interface de usuário moderna com React. Oferece controle de acesso, agendamento de publicações e um editor WYSIWYG intuitivo.',
            techs: ['Python', 'Django', 'React', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
            liveLink: 'https://exemplo-cms.com',
            githubLink: 'https://github.com/AzamUsman/cms-project'
        },
        '2': {
            title: 'App de Produtividade',
            image: '/images/pro-2.jpg',
            description: 'Aplicação móvel de produtividade para gerenciar tarefas e hábitos diários. Desenvolvida em Flutter, a aplicação oferece uma interface limpa, notificações push para lembretes e sincronização em tempo real com a nuvem.',
            techs: ['Flutter', 'Dart', 'Firebase', 'Mobile Development'],
            liveLink: 'https://play.google.com/store/apps/produtividade',
            githubLink: 'https://github.com/AzamUsman/productivity-app'
        },
        '3': {
            title: 'E-commerce para Pequenas Empresas',
            image: '/images/pro-3.jpg',
            description: 'Uma solução de comércio eletrónico personalizável, construída com Java e Spring Boot para o backend e um frontend em Vue.js. Inclui carrinho de compras, processamento de pagamentos seguro e um painel de administração para gestão de produtos e pedidos.',
            techs: ['Java', 'Spring Boot', 'Vue.js', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
            liveLink: 'https://exemplo-loja.com',
            githubLink: 'https://github.com/AzamUsman/e-commerce-project'
        },
        '4': {
            title: 'App de Saúde e Fitness',
            image: '/images/pro-4.jpg',
            description: 'App mobile com funcionalidades de acompanhamento de exercícios, nutrição e definição de metas. Desenvolvida em Flutter, permite que os utilizadores registem os seus treinos, controlem a ingestão calórica e visualizem o progresso através de gráficos interativos.',
            techs: ['Flutter', 'Dart', 'Firebase', 'API REST'],
            liveLink: 'https://play.google.com/store/apps/fitness',
            githubLink: 'https://github.com/AzamUsman/fitness-app'
        },
        '5': {
            title: 'Dashboard de Análise de Dados',
            image: '/images/pro-5.jpg',
            description: 'Uma ferramenta web para visualização e análise de dados de negócios. Criada com Python (Flask) e bibliotecas como Pandas e Chart.js, a dashboard permite aos utilizadores carregar os seus dados e gerar relatórios visuais dinâmicos.',
            techs: ['Python', 'Flask', 'Pandas', 'Chart.js', 'HTML', 'CSS', 'JavaScript'],
            liveLink: 'https://exemplo-dashboard.com',
            githubLink: 'https://github.com/AzamUsman/data-dashboard'
        },
        '6': {
            title: 'Blog Pessoal Moderno',
            image: '/images/pro-6.jpg',
            description: 'Um blog pessoal elegante e responsivo, construído com Golang no backend para alto desempenho e uma interface de usuário minimalista. Apresenta um sistema de comentários integrado e é otimizado para SEO.',
            techs: ['Golang', 'HTML', 'CSS', 'JavaScript', 'Database SQL'],
            liveLink: 'https://exemplo-blog.com',
            githubLink: 'https://github.com/AzamUsman/personal-blog'
        }
    };

    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalTechList = document.querySelector('.modal-tech-list');
    const modalLiveLink = document.getElementById('modal-live-link');
    const modalGithubLink = document.getElementById('modal-github-link');
    const projectDetailButtons = document.querySelectorAll('.btn-detalhes');

    function openModal(projectId) {
        const project = projectDetails[projectId];
        if (project) {
            // Preenche o conteúdo do modal
            modalImage.src = project.image;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;

            // Limpa e preenche a lista de tecnologias
            modalTechList.innerHTML = '';
            project.techs.forEach(tech => {
                const li = document.createElement('li');
                li.textContent = tech;
                modalTechList.appendChild(li);
            });

            // Atualiza os links
            modalLiveLink.href = project.liveLink;
            modalGithubLink.href = project.githubLink;

            // Mostra o modal e desabilita o scroll da página
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Adiciona event listeners aos botões
    projectDetailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.dataset.projectId;
            openModal(projectId);
        });
    });

    // Adiciona event listeners para fechar o modal
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});