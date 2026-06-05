document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // MOBILE MENU TOGGLE
  // ==========================================================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // HEADER SCROLL EFEITO
  // ==========================================================================
  const header = document.querySelector('.header');
  const backToTopBtn = document.querySelector('.back-to-top');

  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      if (backToTopBtn) backToTopBtn.classList.add('active');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('active');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Executar uma vez ao carregar

  // Back to Top Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // PORTFOLIO FILTER
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover active dos outros botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
          item.classList.add('show');
        } else {
          item.classList.remove('show');
          item.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================================================
  // TESTIMONIALS SLIDER
  // ==========================================================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0) {
    // Criar dots dinamicamente
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    const updateSlider = () => {
      slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        dots[idx].classList.remove('active');
      });

      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    };

    const goToSlide = (index) => {
      currentSlide = index;
      updateSlider();
      resetInterval();
    };

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });

      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });
    }

    const startInterval = () => {
      slideInterval = setInterval(nextSlide, 6000);
    };

    const resetInterval = () => {
      clearInterval(slideInterval);
      startInterval();
    };

    // Inicializar o slider auto-play
    startInterval();
  }

  // ==========================================================================
  // CONTACT FORM SIMULATION & WHATSAPP REDIRECT
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Pegar os valores
      const name = document.getElementById('formName').value.trim();
      const project = document.getElementById('formProject').value;
      const message = document.getElementById('formMessage').value.trim();

      // Validação básica
      if (!name || !message) {
        showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      // Envio Simulado (Feedback Visual)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      setTimeout(() => {
        // Restaurar botão
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Feedback positivo
        showFeedback(`Olá ${name}! Recebemos a sua mensagem. Entraremos em contato em breve para conversar sobre o seu projeto de <strong>${project}</strong>!`, 'success');
        contactForm.reset();

        // Enviar os dados formatados para o WhatsApp após 2 segundos para facilitar o contato direto
        setTimeout(() => {
          const formattedMessage = `Olá Renovalar! Meu nome é ${name}. Gostaria de solicitar um orçamento para *${project}*.\n\n*Detalhes:* ${message}`;
          const whatsappUrl = `https://wa.me/5554996930114?text=${encodeURIComponent(formattedMessage)}`;
          window.open(whatsappUrl, '_blank');
        }, 2000);

      }, 1500);
    });
  }

  const showFeedback = (msg, type) => {
    if (formFeedback) {
      formFeedback.innerHTML = msg;
      formFeedback.className = `form-feedback ${type}`;
      formFeedback.style.display = 'block';

      // Rolar levemente até o feedback
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // ==========================================================================
  // SCROLL REVEAL (FADE-IN EFFECT ON SCROLL)
  // ==========================================================================
  const fadeElements = document.querySelectorAll('.fade-in');

  const revealOnScroll = () => {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const elemTop = rect.top;
      const elemBottom = rect.bottom;
      
      // Mostrar elemento quando ele entra na viewport
      const isVisible = (elemTop < window.innerHeight - 50);
      if (isVisible) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Executar uma vez no início caso o usuário já comece no meio da página
  setTimeout(revealOnScroll, 100);

  // ==========================================================================
  // SCROLL ACTIVE MENU LINK (SCROLL SPY)
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');

  const scrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const menuLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (menuLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          menuLink.classList.add('active');
        } else {
          menuLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
});
