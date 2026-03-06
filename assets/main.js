(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const disabledSubmit = document.querySelector('[data-no-submit]');
  disabledSubmit?.addEventListener('click', (e) => {
    e.preventDefault();
  });
})();
