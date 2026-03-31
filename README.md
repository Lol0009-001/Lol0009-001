# Global News Globe

Interactive 3D Earth visualization for world news discovery.

## Features

- Renders a 3D Earth model in the browser.
- Loads country polygons for countries around the world from a GeoJSON dataset.
- Click a country on the globe to select it.
- Search a country by name and focus your news lookup.
- Open a Google News search query for the selected country.

## Run locally

Because the app fetches GeoJSON data over HTTP, run it from a local server:

```bash
python3 -m http.server 8080
```

Then open:

- <http://localhost:8080>

## Files

- `index.html` — UI shell and script loading.
- `styles.css` — layout and visual design.
- `app.js` — 3D globe rendering + country selection/search behavior.
