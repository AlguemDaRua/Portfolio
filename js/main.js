// Preloader com transição suave
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 500,
        fill: 'forwards'
    }).onfinish = () => {
        preloader.style.display = 'none';
    };
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

// Transição de tema com efeito de onda (0.5 segundos)
function toggleTheme(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
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
    }, 500); // Reduzido para 500ms (0.5 segundos)
}

// Obter localização do usuário
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('location-text').textContent = 
                            `${data.city || 'Localização'}, ${data.countryName || 'Desconhecido'}`;
                    })
                    .catch(() => {
                        document.getElementById('location-text').textContent = 'Maputo, MZ';
                    });
            },
            error => {
                console.error('Erro ao obter localização:', error);
                document.getElementById('location-text').textContent = 'Maputo, MZ';
            }
        );
    } else {
        document.getElementById('location-text').textContent = 'Maputo, MZ';
    }
}

// Inicializar
// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    getLocation();
    
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
    
    // Adicionar localização ao menu mobile
    const locationContainer = document.createElement('div');
    locationContainer.classList.add('location-info', 'mobile');
    locationContainer.innerHTML = `
        <img src="icons/location.svg" alt="Localização">
        <span id="mobile-location-text">Carregando...</span>
    `;
    mobileMenu.appendChild(locationContainer);
    
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
        
        // Atualizar localização no menu mobile
        document.getElementById('mobile-location-text').textContent = 
            document.getElementById('location-text').textContent;
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
        anchor.addEventListener('click', function(e) {
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
    
    [toggleThemeButton, mobileToggleThemeButton].forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

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
});