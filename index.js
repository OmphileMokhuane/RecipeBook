let dataset = [];

async function fetchRecipes(){
  try{
    const resopnse = await fetch('https://localhost:3000/api/recipes');
    dataset = await resopnse.json();
  } catch(error){
    console.error('Error fetching recipes:', error);
  }
}

fetchRecipes().then(() => {
  createRecipeCards();
});

// Function to create recipe cards dynamically
function createRecipeCards() {
  const recipeGrid = document.getElementById('recipe-grid');
  recipeGrid.innerHTML = '';

  dataset.forEach(recipe => {
    recipeGrid.innerHTML += `
      <a href="#" class="recipe-card" data-id="${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
        <h3>${recipe.title}</h3>
        <p><i class="far fa-clock"></i> ${recipe.time}</p>
        <p><i class="fas fa-utensils"></i> ${recipe.serving}</p>
        <span class="difficulty">${recipe.difficulty}</span>
      </a>`;
  });

  // Attach event listeners to the newly added cards
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      const recipeId = parseInt(this.getAttribute('data-id'));
      openRecipeInfoModal(recipeId);
    });
  });
}
  
  function openRecipeInfoModal(recipeId) {
    const recipe = dataset.find(r => r.id === recipeId);
    if (!recipe) return;
  
    const modal = document.getElementById('recipeModal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" id="closeModal">&times;</span>
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p><i class="far fa-clock"></i> ${recipe.time}</p>
        <p>${recipe.description}</p>
        <h3>Ingredients:</h3>
        <ul>${recipe.ingredients.map(item => `<li>${item}</li>`).join('')}</ul>
        <h3>Instructions:</h3>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
      </div>
    `;
  
    modal.classList.remove('hidden'); // show modal
  
    // Close modal
    document.getElementById('closeModal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    // Optional: close on outside click
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
  