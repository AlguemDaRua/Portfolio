// Variáveis globais para dados
let profileData = {};
let projectsData = [];
let skillsData = [];

// Função para carregar dados JSON
async function loadData() {
    try {
        // Carregar todos os dados em paralelo
        const [profile, projects, skills] = await Promise.all([
            fetch('assets/data/profile.json').then(r => r.json()),
            fetch('assets/data/projects.json').then(r => r.json()),
            fetch('assets/data/skills.json').then(r => r.json())
        ]);
        
        profileData = profile;
        projectsData = projects.projects;
        skillsData = skills.skills;
        
        // Renderizar os dados
        renderProfile();
        renderProjects();
        renderSkills();
        initializeEmailJS();
        
        return true;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return false;
    }
}

// Renderizar dados do perfil
function renderProfile() {
    // Logo
    const logoText = document.getElementById('logo-text');
    if (logoText) logoText.textContent = profileData.name;
    
    // Hero
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.textContent = profileData.heroTitle;
    
    const heroTagline = document.getElementById('hero-tagline');
    if (heroTagline) heroTagline.textContent = profileData.tagline;
    
    // Sobre
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.src = profileData.about.profileImage;
        profileImg.alt = `Foto de ${profileData.name}`;
    }
    
    const bioText = document.getElementById('bio-text');
    if (bioText) bioText.innerHTML = profileData.about.bio;
    
    // CVs
    const cvButtons = document.getElementById('cv-buttons');
    if (cvButtons && profileData.about.cvs) {
        cvButtons.innerHTML = profileData.about.cvs.map(cv => `
            <a href="${cv.file}" class="btn btn-cv" download="${cv.filename}">
                <svg class="icon-btn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-6 2h12v2H6v-2z"/>
                </svg>
                ${cv.label}
            </a>
        `).join('');
    }
    
    // Competências
    const competenciesList = document.getElementById('competencies-list');
    if (competenciesList && profileData.about.competencies) {
        competenciesList.innerHTML = profileData.about.competencies.map(comp => `
            <li>
                <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                ${comp}
            </li>
        `).join('');
    }
    
    // Links sociais
    const socialLinks = document.getElementById('social-links');
    if (socialLinks && profileData.social) {
        socialLinks.innerHTML = `
            <a href="${profileData.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src="assets/icons/facebook.svg" alt="Facebook" />
            </a>
            <a href="${profileData.social.twitter}" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <img src="assets/icons/twitter.svg" alt="Twitter" />
            </a>
            <a href="${profileData.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="assets/icons/linkedin.svg" alt="LinkedIn" />
            </a>
            <a href="${profileData.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src="assets/icons/github.svg" alt="GitHub" />
            </a>
        `;
    }
    
    // Footer
    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCopyright) {
        const year = new Date().getFullYear();
        footerCopyright.textContent = `© ${year} ${profileData.name}. Todos os direitos reservados.`;
    }
    
    // Título da página
    document.title = `${profileData.name} | ${profileData.title}`;
}

// Renderizar projetos
function renderProjects() {
    const projetosGrid = document.getElementById('projetos-grid');
    if (!projetosGrid) return;
    
    projetosGrid.innerHTML = projectsData.map(project => `
        <div class="projeto-card ${project.category}" data-aos="fade-up">
            <div class="projeto-imagem" style="background-image: url('${project.image}')"></div>
            <div class="projeto-info">
                <span class="categoria">${project.categoryLabel}</span>
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
                <div class="tecnologias">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="#" class="btn open-modal" data-id="${project.id}">Ver Detalhes</a>
            </div>
        </div>
    `).join('');
    
    // Re-anexar event listeners aos botões de modal
    attachModalListeners();
}

// Renderizar habilidades
function renderSkills() {
    const habilidadesGrid = document.getElementById('habilidades-grid');
    if (!habilidadesGrid) return;
    
    habilidadesGrid.innerHTML = skillsData.map(skill => `
        <a href="${skill.url}" target="_blank" rel="noopener noreferrer" class="habilidade-card">
            <img src="${skill.icon}" alt="Ícone ${skill.name}" loading="lazy" />
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            ${skill.level ? `
                <div class="skill-level">
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%"></div>
                    </div>
                    <span class="skill-percent">${skill.level}%</span>
                </div>
            ` : ''}
        </a>
    `).join('');
}

// Inicializar EmailJS
function initializeEmailJS() {
    if (profileData.contact && profileData.contact.emailjs) {
        emailjs.init(profileData.contact.emailjs.publicKey);
    }
}

// Preloader
window.addEventListener('load', async () => {
    // Carregar dados primeiro
    await loadData();
    
    // Esconder preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 500);
});

// Verificar e aplicar tema salvo
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const toggleThemeButton = document.getElementById('toggle-theme');

    if (!savedTheme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            toggleThemeButton.querySelector('img').src = 'assets/icons/sun.svg';
        }
        return;
    }

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleThemeButton.querySelector('img').src = 'assets/icons/sun.svg';
    } else {
        document.body.classList.remove('dark-mode');
        toggleThemeButton.querySelector('img').src = 'assets/icons/moon.svg';
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

    setTimeout(() => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', newTheme);

        const themeIcon = button.querySelector('img');
        themeIcon.src = newTheme === 'dark' ? 'assets/icons/sun.svg' : 'assets/icons/moon.svg';

        setTimeout(() => {
            overlay.classList.remove('active');
        }, 100);
    }, 500);
}

// Função para anexar listeners aos modais
function attachModalListeners() {
    const openModalButtons = document.querySelectorAll('.open-modal');
    
    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-id');
            const project = projectsData.find(p => p.id === projectId);

            if (project) {
                openProjectModal(project);
            }
        });
    });
}

// Abrir modal de projeto
function openProjectModal(project) {
    const modalOverlay = document.querySelector('.project-modal-overlay');
    
    // Preencher dados do modal
    document.querySelector('.modal-image').src = project.image;
    document.querySelector('.modal-image').alt = project.title;
    document.querySelector('.modal-category').textContent = project.categoryLabel;
    document.querySelector('.modal-title').textContent = project.title;
    document.querySelector('.modal-description').textContent = project.fullDescription;

    // Tecnologias
    const techList = document.querySelector('.modal-tech-list');
    techList.innerHTML = project.technologies.map(tech => `<span>${tech}</span>`).join('');

    // Botões
    const primaryBtn = document.querySelector('.modal-btn-primary');
    const secondaryBtn = document.querySelector('.modal-btn-secondary');
    
    if (project.liveUrl) {
        primaryBtn.style.display = 'inline-flex';
        primaryBtn.href = project.liveUrl;
    } else {
        primaryBtn.style.display = 'none';
    }
    
    if (project.githubUrl) {
        secondaryBtn.style.display = 'inline-flex';
        secondaryBtn.href = project.githubUrl;
    } else {
        secondaryBtn.style.display = 'none';
    }

    // Mostrar modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();

    // Botão voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        if (scrollPosition > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');

    // Copiar menu para mobile
    const navList = document.querySelector('.nav-center ul').cloneNode(true);
    mobileMenu.appendChild(navList);

    // Adicionar botão de tema
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
    });

    // Fechar menu ao clicar nos links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Filtro de Projetos
    const filtroBtns = document.querySelectorAll('.filtro-projetos .btn');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filtro = btn.getAttribute('data-filter');
            const projetos = document.querySelectorAll('.projeto-card');

            projetos.forEach(projeto => {
                if (filtro === 'todos' || projeto.classList.contains(filtro)) {
                    projeto.style.display = 'block';
                } else {
                    projeto.style.display = 'none';
                }
            });
        });
    });

    // Botões de tema
    const toggleThemeButton = document.getElementById('toggle-theme');
    const mobileToggleThemeButton = document.getElementById('mobile-toggle-theme');

    toggleThemeButton.addEventListener('click', toggleTheme);
    mobileToggleThemeButton.addEventListener('click', toggleTheme);

    // Modal de projetos
    const modalOverlay = document.querySelector('.project-modal-overlay');
    const closeModalButton = document.querySelector('.modal-close-btn');

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeModalButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // ESC para fechar modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
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

            const templateParams = {
                from_name: nome,
                from_email: email,
                message: mensagem,
                to_name: profileData.name
            };

            emailjs.send(
                profileData.contact.emailjs.serviceId, 
                profileData.contact.emailjs.templateId, 
                templateParams
            ).then(() => {
                alert('Mensagem enviada com sucesso!');
                this.reset();
            }, (error) => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao enviar a mensagem.');
            }).finally(() => {
                btnSubmit.disabled = false;
                btnSubmit.textContent = 'Enviar Mensagem';
            });
        });
    }
});