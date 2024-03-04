// Déclaration du tableau pour stocker les données d'application
let appData = [];

// Fonction pour rendre chaque application
function renderApp(app) {
  // Create the app card element
  const appCard = document.createElement("div");
  appCard.classList.add("app-card"); // Use classList for modern approach

  // Create the app image element
  const appImage = document.createElement("img");
  appImage.src = app.imageUrl;
  appImage.alt = app.name;
  appImage.classList.add("app-image"); // Use classList for modern approach

  // Create the app name element
  const appName = document.createElement("h3");
  appName.textContent = app.name;

  // Create the open button element
  const openButton = document.createElement("button");
  openButton.textContent = "Open";
  openButton.classList.add("btn"); // Use classList for modern approach
  openButton.addEventListener("click", () => window.open(app.executionUrl));

  // Create the details button element
  const detailsButton = document.createElement("button");
  detailsButton.textContent = "Details";
  detailsButton.classList.add("btn"); // Use classList for modern approach
  detailsButton.addEventListener("click", () => showDetails(app));

  // Append elements to the app card
  appCard.appendChild(appImage);
  appCard.appendChild(appName);
  appCard.appendChild(openButton);
  appCard.appendChild(detailsButton);

  // Append the app card to the container
  const appContainer = document.getElementById("appContainer");
  appContainer.appendChild(appCard);
}

// Fonction pour afficher les détails d'une application
function showDetails(app) {
  alert(`Details for ${app.name}:\nBy: ${app.by}\nSize: ${app.size}\nTags: ${app.tags.join(", ")}`);
}

// Fonction pour filtrer les applications
function filterApps() {
  const selectedCategories = Array.from(document.getElementById("categoryFilter").selectedOptions)
    .map(option => option.value);
  const selectedTags = Array.from(document.getElementById("tagFilter").selectedOptions)
    .map(option => option.value);

  const filteredApps = appData.filter(app => {
    const categoryMatch = selectedCategories.includes("all") ||
      app.category.some(cat => selectedCategories.includes(cat));
    const tagMatch = selectedTags.includes("all") ||
      app.tags.some(tag => selectedTags.includes(tag));

    return categoryMatch && tagMatch;
  });

  // Clear the app container content
  const appContainer = document.getElementById("appContainer");
  appContainer.innerHTML = "";

  // Render the filtered applications
  filteredApps.forEach(renderApp);
}

// Fonction pour effacer les filtres
function clearFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const tagFilter = document.getElementById("tagFilter");

  categoryFilter.value = ["all"]; // Select the "all" option explicitly
  tagFilter.value = ["all"]; // Select the "all" option explicitly

  filterApps();
}

// Charger le fichier JSON
fetch('app.json')
  .then(response => response.json())
  .then(data => {
    appData = data;
    filterApps(); // Apply initial filters
  })
  .catch(error => console.error('Erreur lors du chargement des données de l`application:', error));


