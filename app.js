const globeContainer = document.getElementById('globe');
const selectedCountryEl = document.getElementById('selectedCountry');
const openNewsBtn = document.getElementById('openNewsBtn');
const countrySearchInput = document.getElementById('countrySearch');
const searchBtn = document.getElementById('searchBtn');

const countriesGeoJsonUrl =
  'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

let selectedCountryName = '';
let countries = [];

const world = Globe()(globeContainer)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .showAtmosphere(true)
  .atmosphereColor('#66e0ff')
  .atmosphereAltitude(0.19)
  .polygonCapColor((feature) =>
    feature.properties.name === selectedCountryName
      ? 'rgba(56, 189, 248, 0.95)'
      : 'rgba(94, 234, 212, 0.33)'
  )
  .polygonSideColor(() => 'rgba(20, 28, 58, 0.20)')
  .polygonStrokeColor(() => '#77d2f7')
  .polygonAltitude((feature) =>
    feature.properties.name === selectedCountryName ? 0.03 : 0.01
  )
  .polygonLabel(
    ({ properties }) =>
      `<div style="padding:4px 6px;">
        <strong>${properties.name}</strong><br/>
        Click to search news
      </div>`
  )
  .onPolygonClick((polygon) => {
    const name = polygon.properties?.name;
    if (!name) return;
    selectCountry(name);
  });

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.45;
world.controls().enableDamping = true;
world.controls().dampingFactor = 0.06;
world.pointOfView({ lat: 18, lng: 12, altitude: 2.2 }, 1600);

fetch(countriesGeoJsonUrl)
  .then((response) => response.json())
  .then((geojson) => {
    countries = geojson.features;
    world.polygonsData(countries);
  })
  .catch((error) => {
    selectedCountryEl.textContent = `Failed to load countries: ${error.message}`;
  });

function selectCountry(countryName) {
  selectedCountryName = countryName;
  selectedCountryEl.textContent = countryName;
  openNewsBtn.disabled = false;

  world
    .polygonAltitude((feature) =>
      feature.properties.name === selectedCountryName ? 0.03 : 0.01
    )
    .polygonCapColor((feature) =>
      feature.properties.name === selectedCountryName
        ? 'rgba(56, 189, 248, 0.95)'
        : 'rgba(94, 234, 212, 0.33)'
    );
}

function openNewsSearch(countryName) {
  const query = encodeURIComponent(`${countryName} latest news`);
  window.open(`https://news.google.com/search?q=${query}`, '_blank', 'noopener');
}

function findCountryByName(searchTerm) {
  const normalizedTerm = searchTerm.trim().toLowerCase();
  return countries.find((country) => {
    const name = country.properties?.name || '';
    return name.toLowerCase() === normalizedTerm;
  });
}

openNewsBtn.addEventListener('click', () => {
  if (!selectedCountryName) return;
  openNewsSearch(selectedCountryName);
});

searchBtn.addEventListener('click', () => {
  const match = findCountryByName(countrySearchInput.value);
  if (!match) {
    selectedCountryEl.textContent = 'No exact country match found.';
    openNewsBtn.disabled = true;
    return;
  }

  selectCountry(match.properties.name);
  countrySearchInput.value = match.properties.name;
});

countrySearchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') searchBtn.click();
});

window.addEventListener('resize', () => {
  world.width(globeContainer.clientWidth);
  world.height(globeContainer.clientHeight);
});

world.width(globeContainer.clientWidth);
world.height(globeContainer.clientHeight);
