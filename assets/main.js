(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Pré-remplissage du formulaire de contact via query params.
  // Exemple : /contact/?activity=g%C3%AEte&message=Je%20veux%20un%20devis
  const contactForm = document.querySelector("form[data-contact-form]");
  if (!contactForm) return;

  const params = new URLSearchParams(window.location.search);
  const prefill = (name) => {
    const value = params.get(name);
    if (!value) return;
    const field = contactForm.querySelector(`[name='${name}']`);
    if (!field) return;
    if (field.value && field.value.trim().length > 0) return;
    field.value = value;
  };

  prefill("name");
  prefill("email");
  prefill("activity");
  prefill("message");
})();
