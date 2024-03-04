// Déclaration du tableau pour stocker les données d'application
let appData = [];

// Fonction pour rendre chaque application
function renderApp(app) {
  const appContainer = document.getElementById("appContainer");
  const appCard = document.createElement("div");
  appCard.className = "app-card";

  const appImage = document.createElement("img");
  appImage.src = app.imageUrl;
  appImage.alt = app.name;
  appImage.className = "app-image";

  const appName = document.createElement("h3");
  appName.textContent = app.name;

  const openButton = document.createElement("button");
  openButton.textContent = "Open";
  openButton.className = "btn";
  openButton.addEventListener("click", () => window.open(app.executionUrl));

  const detailsButton = document.createElement("button");
  detailsButton.textContent = "Details";
  detailsButton.className = "btn";
  detailsButton.addEventListener("click", () => showDetails(app));

  appCard.appendChild(appImage);
  appCard.appendChild(appName);
  appCard.appendChild(openButton);
  appCard.appendChild(detailsButton);

  appContainer.appendChild(appCard);
}

// Fonction pour afficher les détails d'une application
function showDetails(app) {
  alert(`Details for ${app.name}:\nBy: ${app.by}\nSize: ${app.size}\nTags: ${app.tags.join(", ")}`);
}

// Fonction pour filtrer les applications
function filterApps() {
  const categoryFilter = Array.from(document.getElementById("categoryFilter").selectedOptions).map(option => option.value);
  const tagFilter = Array.from(document.getElementById("tagFilter").selectedOptions).map(option => option.value);

  const filteredApps = appData.filter(app => {
    const categoryMatch = categoryFilter.includes("all") || app.category.some(cat => categoryFilter.includes(cat));
    const tagMatch = tagFilter.includes("all") || app.tags.some(tag => tagFilter.includes(tag));
    
    return categoryMatch && tagMatch;
  });

  // Efface le contenu actuel
  const appContainer = document.getElementById("appContainer");
  appContainer.innerHTML = "";

  // Rendre les applications filtrées
  filteredApps.forEach(renderApp);
}

// Fonction pour effacer les filtres
function clearFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const tagFilter = document.getElementById("tagFilter");
  
  categoryFilter.value = Array.from(categoryFilter.options).map(option => option.value);
  tagFilter.value = Array.from(tagFilter.options).map(option => option.value);

  filterApps();
}

// Charger le fichier JSON
fetch('app.json')
  .then(response => response.json())
  .then(data => {
    // Rendre chaque application
    appData = data;
    filterApps(); // Appliquer les filtres initiaux
  })
  .catch(error => console.error('Erreur lors du chargement des données de l`application:', error));
