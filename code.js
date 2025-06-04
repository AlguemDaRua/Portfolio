// Preloader com transição suave
window.addEventListener('load', () => {
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

// Transição de tema com efeito de cortina
function toggleTheme(e) {
    const button = e.currentTarget;
    const themeOverlay = document.querySelector('.theme-transition-overlay');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Configurar overlay com a cor do tema atual
    themeOverlay.style.background = isDarkMode ? '#f8f9fa' : '#121212';
    themeOverlay.style.opacity = '0';
    
    // Ativar overlay
    themeOverlay.classList.add('active');
    
    // Aumentar gradualmente a opacidade (fechar cortina)
    setTimeout(() => {
        themeOverlay.style.opacity = '1';
    }, 10);
    
    // Após 600ms (metade da animação), mudar o tema
    setTimeout(() => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Atualizar ícone do botão
        const themeIcon = button.querySelector('img');
        if (theme === 'dark') {
            themeIcon.src = 'icons/sun.svg';
            themeIcon.alt = 'Alternar para modo claro';
        } else {
            themeIcon.src = 'icons/moon.svg';
            themeIcon.alt = 'Alternar para modo escuro';
        }
        
        // Mudar a cor do overlay para o novo tema
        themeOverlay.style.background = theme === 'dark' ? '#121212' : '#f8f9fa';
        
        // Diminuir gradualmente a opacidade (abrir cortina)
        setTimeout(() => {
            themeOverlay.style.opacity = '0';
            setTimeout(() => {
                themeOverlay.classList.remove('active');
            }, 600);
        }, 600);
    }, 600);
}

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
    const navCenter = document.querySelector('.nav-center').cloneNode(true);
    mobileMenu.appendChild(navCenter);
    
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
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
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
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Filtro de Projetos
    const filtroBtns = document.querySelectorAll('.filtro-projetos .btn');
    const projetos = document.querySelectorAll('.projeto-card');
    const projetosGrid = document.querySelector('.projetos-grid');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Atualizar botão ativo
            filtroBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filtro = btn.getAttribute('data-filter');
            
            // Animação de fade
            projetosGrid.style.opacity = '0.5';
            
            setTimeout(() => {
                projetos.forEach(projeto => {
                    if (filtro === 'todos' || projeto.classList.contains(filtro)) {
                        projeto.style.display = 'block';
                        projeto.style.opacity = '0';
                        setTimeout(() => {
                            projeto.style.opacity = '1';
                        }, 50);
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

    // Inicializar EmailJS
    (function(){
        emailjs.init('SEU_USER_ID');
    })();

    // Formulário de contato
    document.getElementById('contact-form').addEventListener('submit', function(event) {
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
        
        emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', this)
            .then(() => {
                alert('Mensagem enviada com sucesso!');
                this.reset();
            }, function(error) {
                alert('Ocorreu um erro ao enviar a mensagem: ' + JSON.stringify(error));
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

    // Iniciar após 1 segundo
    setTimeout(typeWriter, 1000);
});