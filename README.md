# Silicon Vallis — site vitrine (statique)

Site vitrine / portfolio statique (HTML/CSS/JS) pour présenter Silicon Vallis et promouvoir Loc Vallis.

Choix (V1) : multi-pages “simples” + Bootstrap (pas de framework, pas de build).

## Démarrer en local

Option 1 (simple) : ouvrir `index.html` dans ton navigateur.

Option 2 (recommandé) : lancer un mini serveur local (évite certains soucis de cache / chemins)

```bash
python3 -m http.server 5173
```

Puis ouvrir http://localhost:5173

## Structure

- `index.html` (Home)
- `loc-vallis/index.html`
- `realisations/index.html`
- `qui-sommes-nous/index.html`
- `contact/index.html`
- `assets/styles.css` (surcouches Bootstrap légères)
- `assets/main.js` (année + pré-remplissage du formulaire)

## Déploiement

Comme c’est statique, tu peux déployer sur GitHub Pages, Netlify, Vercel (mode static), ou n’importe quel serveur web.
