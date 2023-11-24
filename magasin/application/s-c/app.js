document.addEventListener('DOMContentLoaded', function () {
    fetch('app.json')
      .then(response => response.json())
      .then(data => {
        const appContainer = document.getElementById('app');
        data.applications.forEach(app => {
          const card = document.createElement('div');
          card.classList.add('cards__card', 'card');
  
          card.innerHTML = `
            <h2 class="card__heading">${app.name}</h2>
            <p class="card__price">Par ${app.by}</p>
            <ul role="list" class="card__bullets flow">
              <li>Taille: ${app.size}</li>
              <li>Date: ${app.date}</li>
              <li>Avantage: ${app.advantage}</li>
              <li>Description: ${app.description}</li>
            </ul>
            <a href="${app.installUrl}" class="card__cta cta">Installer</a>
            <br><br>
            <a href="${app.openUrl}" class="card__cta cta">Visitez la source</a>
          `;
  
          appContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
