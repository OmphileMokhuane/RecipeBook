const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

// Connect to the database
const dbPath = path.resolve('D:/2025/RecipeBook/RecipeBook/data/recipes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase(); // Setup on start
  }
});

// Check & create table + insert dummy data if needed
function initializeDatabase() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image TEXT,
      time TEXT,
      serving TEXT,
      difficulty TEXT,
      description TEXT,
      ingredients TEXT,
      instructions TEXT
    )
  `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
      return;
    }

    console.log('Table check/creation complete.');

    // Check if there is any data in the table
    db.get('SELECT COUNT(*) AS count FROM recipes', (err, row) => {
      if (err) {
        console.error('Error checking recipe count:', err.message);
        return;
      }

      if (row.count === 0) {
        insertDummyRecipes();
      } else {
        console.log(`Database already has ${row.count} recipes.`);
      }
    });
  });
}

function insertDummyRecipes() {
  const dummyRecipes = [];

  for (let i = 1; i <= 10; i++) {
    dummyRecipes.push({
      title: `Recipe ${i}`,
      image: `/RecipeBook/images/recipe${i}.jpg`,
      time: `${10 + i * 2} minutes`,
      serving: `${1 + (i % 4)} servings`,
      difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
      description: `This is a dummy description for Recipe ${i}.`,
      ingredients: JSON.stringify([`Ingredient A${i}`, `Ingredient B${i}`, `Ingredient C${i}`]),
      instructions: JSON.stringify([`Step 1 for Recipe ${i}`, `Step 2 for Recipe ${i}`])
    });
  }

  const insertSQL = `
    INSERT INTO recipes (title, image, time, serving, difficulty, description, ingredients, instructions)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  dummyRecipes.forEach(recipe => {
    db.run(insertSQL, [
      recipe.title,
      recipe.image,
      recipe.time,
      recipe.serving,
      recipe.difficulty,
      recipe.description,
      recipe.ingredients,
      recipe.instructions
    ]);
  });

  console.log('Inserted 10 dummy recipes.');
}

// API endpoint to fetch recipes
app.get('/api/recipes', (req, res) => {
  db.all('SELECT * FROM recipes', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // Parse ingredients & instructions
      rows = rows.map(row => ({
        ...row,
        ingredients: JSON.parse(row.ingredients),
        instructions: JSON.parse(row.instructions)
      }));
      res.json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
