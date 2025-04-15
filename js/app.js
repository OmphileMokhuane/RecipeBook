let dataset = [
    {
      id: 1,
      title: 'Chocolate Cake',
      image: '/RecipeBook/images/recipe1.jpg',
      time: '15 minutes',
      serving: '2 servings',
      difficulty: 'Easy',
      description: 'A delicious chocolate cake recipe.',
      ingredients: ['2 eggs', '1 cup sugar', '1/2 cup cocoa powder'],
      instructions: ['Mix ingredients', 'Bake at 180°C for 30 mins']
    },
    {
      id: 2,
      title: 'Spaghetti Bolognese',
      image: '/RecipeBook/images/recipe2.jpg',
      time: '30 minutes',
      serving: '4 servings',
      difficulty: 'Medium',
      description: 'Classic Italian pasta dish with rich meat sauce.',
      ingredients: ['200g spaghetti', '100g minced beef', 'Tomato sauce'],
      instructions: ['Boil pasta', 'Cook meat', 'Mix with sauce']
    },
    {
      id: 3,
      title: 'Pancakes',
      image: '/RecipeBook/images/recipe3.jpg',
      time: '20 minutes',
      serving: '3 servings',
      difficulty: 'Easy',
      description: 'Fluffy and golden pancakes perfect for breakfast.',
      ingredients: ['1 cup flour', '1 egg', '1/2 cup milk', '1 tbsp sugar'],
      instructions: ['Mix ingredients', 'Cook on pan until golden']
    }
  ];
  
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
  
  // Initial load
  createRecipeCards();
  