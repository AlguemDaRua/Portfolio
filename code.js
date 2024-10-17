// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';

    // Verificar preferência do usuário ao carregar a página
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        toggleThemeButton.querySelector('img').src = 'icons/sun.svg';
    }
});

// Alternar entre modo claro e escuro com transição suave
const toggleThemeButton = document.getElementById('toggle-theme');

toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const themeIcon = toggleThemeButton.querySelector('img');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = 'icons/sun.svg';
    } else {
        themeIcon.src = 'icons/moon.svg';
    }
});

// Botão voltar ao topo
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.style.display = 'block';
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

// Menu responsivo
const menuToggle = document.createElement('div');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '<div></div><div></div><div></div>';
document.body.appendChild(menuToggle);

const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
});

// Scroll suave ao clicar nos links do menu
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        document.querySelector(href).scrollIntoView({
            behavior: 'smooth'
        });

        // Fechar o menu em dispositivos móveis após clicar
        if (navUl.classList.contains('active')) {
            navUl.classList.remove('active');
        }
    });
});

// Scroll suave para o botão "Ver Projetos"
const btnVerProjetos = document.querySelector('.hero .btn');

btnVerProjetos.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#projetos').scrollIntoView({
        behavior: 'smooth'
    });
});

// Filtro de Projetos
const filtroBtns = document.querySelectorAll('.filtro-projetos .btn');
const projetos = document.querySelectorAll('.projeto-card');

filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover classe 'active' de todos os botões
        filtroBtns.forEach(b => b.classList.remove('active'));
        // Adicionar classe 'active' ao botão clicado
        btn.classList.add('active');

        const filtro = btn.getAttribute('data-filter');
        projetos.forEach(projeto => {
            if (filtro === 'todos' || projeto.classList.contains(filtro)) {
                projeto.style.display = 'block';
            } else {
                projeto.style.display = 'none';
            }
        });
    });
});

// Inicializar EmailJS
(function(){
    emailjs.init('SEU_USER_ID');
})();

// Manipular o envio do formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', this)
        .then(function() {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contact-form').reset();
        }, function(error) {
            alert('Ocorreu um erro ao enviar a mensagem.');
        });
});
