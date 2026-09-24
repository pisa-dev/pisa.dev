# pisa.dev

Sito statico in italiano per la community degli sviluppatori pisani. È generato con [Hugo](https://gohugo.io/); il sito pubblicato contiene solo HTML, CSS, immagini e file statici, senza JavaScript o database.

## Sviluppo locale

Installa Hugo extended 0.166.0 o successivo, poi esegui:

```sh
hugo server
```

Apri <http://localhost:1313>. Per verificare la build:

```sh
hugo --minify
python3 scripts/check_static.py public
```

Hugo scrive il sito generato in `public/` (non committare questa directory).

## Contenuti

- Eventi: `content/events/`, un file Markdown per evento. Il nome `slug` mantiene l'URL `/event/<slug>/`. Il campo `unlisted` mantiene l'evento accessibile al suo URL ma lo esclude dalle liste pubbliche.
- Offerte archiviate: `content/jobs/`, un file Markdown per offerta. Le nuove offerte si aggiungono solo tramite pull request; l'archivio è in sola lettura.
- Pagine: `content/`. Immagini e altri file statici sono in `static/`.

Proponi le modifiche ai contenuti tramite pull request. Non aggiungere form o endpoint dinamici al sito.

## CI

Le pull request compilano Hugo, controllano l'output privo di JavaScript e verificano l'immagine del server statico. I push a `main` fanno gli stessi controlli e pubblicano il sito su GitHub Pages.
