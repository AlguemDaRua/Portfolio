// Preloader com transição suave
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 500);

    // Verificar preferência do usuário
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        document.querySelector('#toggle-theme img').src = 'icons/sun.svg';
    }
});

// Alternar tema com animação
const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const themeIcon = toggleThemeButton.querySelector('img');
    
    // Animação suave de transição
    document.body.style.transition = 'background-color 0.8s ease, color 0.8s ease';
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = 'icons/sun.svg';
        themeIcon.alt = 'Alternar para modo claro';
    } else {
        themeIcon.src = 'icons/moon.svg';
        themeIcon.alt = 'Alternar para modo escuro';
    }
    
    // Resetar transição após animação
    setTimeout(() => {
        document.body.style.transition = '';
    }, 800);
});

// Botão voltar ao topo com animação
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    if (scrollPosition > 500) {
        backToTopButton.style.display = 'flex';
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
        setTimeout(() => {
            if (window.pageYOffset <= 500) {
                backToTopButton.style.display = 'none';
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

// Menu responsivo melhorado
const menuToggle = document.createElement('button');
menuToggle.classList.add('menu-toggle');
menuToggle.setAttribute('aria-label', 'Abrir menu');
menuToggle.innerHTML = '<span></span><span></span><span></span>';
document.body.appendChild(menuToggle);

const navUl = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav a');

menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (navUl.classList.contains('active') && 
        !e.target.closest('nav') && 
        !e.target.closest('.menu-toggle')) {
        navUl.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Scroll suave para todas as âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Fechar menu em dispositivos móveis
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});

// Filtro de Projetos aprimorado
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

// Inicializar EmailJS
(function(){
    emailjs.init('SEU_USER_ID');
})();

// Formulário de contato com validação
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validação básica
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

setTimeout(typeWriter, 1000);