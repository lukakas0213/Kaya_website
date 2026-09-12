# Kaya Lee — Portfolio

A single-page portfolio site for Kaya Lee, an art therapy undergraduate.
Built as a static site with no dependencies or build step.

## Layout system

The site is a faithful reproduction of a Photoshop design (`images/wev.psd`),
which is laid out as fixed **1366 × 768** artboards — the ME page being taller
at 1366 × 1626 so it scrolls.

Rather than approximating that design with a flow layout, every element is
absolutely positioned at its exact artboard coordinate, and the whole stage is
scaled to fit the viewport:

```
scale = min(viewportWidth / 1366, viewportHeight / 768)
```

This keeps the composition identical to the design at any window size. Each
element renders pixel-identical to its source asset.

Because the design has no mobile artboard, narrow screens show the same
composition scaled down rather than a reflowed layout.

## Structure

```
index.html                  All four pages; elements carry their artboard coordinates
css/style.css               Stage scaling, page switching, navigation
js/script.js                Page routing, viewport scaling, navigation asset swapping
images/
  home/                     Word-search graphic, headline, nav labels
  me/artwork/               14 artwork photographs
  info/                     Banner image, body copy
  contact/                  Contact details, portrait
  wev.psd                   Design source of record
```

Navigation labels are images rather than live text, since the active state for
Info and Contact is hand-drawn chalk lettering. Each page has its own label set
in which only the current page's label is highlighted.

## Running locally

The site is plain HTML, CSS and JavaScript — no install or build required.

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly also works,
but serving it over HTTP matches how the site is deployed.

## Credits

Artwork, photography and design by Kaya Lee. All artwork in this repository is
the artist's own work and is not licensed for reuse.
