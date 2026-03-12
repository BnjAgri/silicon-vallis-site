(() => {
  // Met a jour automatiquement l'annee dans le footer.
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Pré-remplissage du formulaire de contact via query params.
  // Exemple : /contact/?activity=g%C3%AEte&message=Je%20veux%20un%20devis
  const contactForm = document.querySelector("form[data-contact-form]");

  if (contactForm) {
    const params = new URLSearchParams(window.location.search);

    const prefill = (name) => {
      const value = params.get(name);
      if (!value) return;

      const field = contactForm.querySelector(`[name='${name}']`);
      if (!field) return;

      // On ne remplit pas un champ deja saisi a la main.
      if (field.value && field.value.trim().length > 0) return;

      field.value = value;
    };

    prefill("name");
    prefill("email");
    prefill("activity");
    prefill("message");
  }

  // Active l'etat "scroll" de la navbar sticky.
  // Le but n'est pas de la transformer radicalement, juste de la rendre
  // un peu plus nette et elegante quand on descend dans la page.
  const siteHeader = document.querySelector(".js-site-header");

  if (siteHeader) {
    const updateHeaderState = () => {
      const isScrolled = window.scrollY > 12;
      siteHeader.classList.toggle("is-scrolled", isScrolled);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  // Hero reveal :
  // au chargement, on ajoute la classe "visible" aux elements du hero.
  // requestAnimationFrame permet de laisser le navigateur peindre l'etat
  // initial avant d'appliquer la classe finale et donc la transition CSS.
  const heroItems = document.querySelectorAll(".sv-reveal--hero");

  if (heroItems.length > 0) {
    window.requestAnimationFrame(() => {
      heroItems.forEach((item) => item.classList.add("sv-is-visible"));
    });
  }

  // Reveal on scroll :
  // on utilise IntersectionObserver pour detecter quand un bloc entre
  // dans le viewport. C'est plus performant qu'un calcul manuel a chaque scroll.
  const revealItems = document.querySelectorAll(".sv-reveal-on-scroll");

  if ("IntersectionObserver" in window && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // Tant que l'element n'est pas suffisamment visible, on ne fait rien.
          if (!entry.isIntersecting) return;

          entry.target.classList.add("sv-is-visible");

          // Une fois revele, on arrete de l'observer pour ne pas refaire
          // inutilement le meme travail.
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    // Fallback simple si IntersectionObserver n'est pas disponible.
    revealItems.forEach((item) => item.classList.add("sv-is-visible"));
  }

  // CTA sticky mobile :
  // sur la homepage, on affiche un bouton fixe apres un peu de scroll.
  // On le masque a l'approche du footer pour eviter qu'il chevauche la fin de page.
  const mobileCta = document.querySelector(".sv-mobile-cta");
  const footer = document.querySelector(".footer");

  if (mobileCta && footer) {
    const updateMobileCta = () => {
      const scrolledEnough = window.scrollY > 320;
      const footerRect = footer.getBoundingClientRect();
      const footerIsClose = footerRect.top < window.innerHeight - 80;

      const shouldShow = scrolledEnough && !footerIsClose;
      mobileCta.classList.toggle("is-visible", shouldShow);
    };

    updateMobileCta();
    window.addEventListener("scroll", updateMobileCta, { passive: true });
    window.addEventListener("resize", updateMobileCta);
  }
})();
