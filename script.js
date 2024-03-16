function getRecipesOnContainer() {
  let recipes = localStorage.getItem("recipes") ? JSON.parse(localStorage.getItem("recipes")) : [];
  console.log(recipes);
  for(i = 0; i <recipes.length;i++){
    const recipeContainer = document.getElementById("recipeContainer");
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const h2 = document.createElement("h2");
    h2.textContent = recipes[i].recipeName;
    recipeCard.appendChild(h2);

    const img = document.createElement("img");
    img.src = recipes[i].image;
    img.alt = recipes[i].recipeName;
    recipeCard.appendChild(img);

    const pIngredients = document.createElement("p");
    pIngredients.textContent = "Ingredients: ";
    recipeCard.appendChild(pIngredients);

    const h3 = document.createElement("h7");
    h3.textContent = recipes[i].ingredients;
    recipeCard.appendChild(h3);

    const pPreparation = document.createElement("p");
    pPreparation.textContent = "Preparation: ";
    recipeCard.appendChild(pPreparation);

    const h7 = document.createElement("h7");
    h7.textContent = recipes[i].preparation;
    recipeCard.appendChild(h7);

    recipeContainer.appendChild(recipeCard);
  }
}

async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            const base64Data = e.target.result;
            resolve(base64Data);
        };
        
        reader.onerror = (error) => {
            console.log('Error: ', error);
            reject(error);
        };
        
        reader.readAsDataURL(file);
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const addRecipeBtn = document.getElementById("addRecipeBtn");
  getRecipesOnContainer();
  const modal = document.getElementById("modal");
  const closeModalBtn = document.querySelector(".close");
  const addRecipeForm = document.getElementById("addRecipeForm");
  const recipeContainer = document.getElementById("recipeContainer");
  const searchInput = document.getElementById("searchInput");

  // Open modal to add recipe
  addRecipeBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  // Close modal
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Add recipe
  addRecipeForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const recipeName = document.getElementById("recipeName").value;
    const ingredients = document.getElementById("ingredients").value;
    const preparation = document.getElementById("preparation").value;
    const image = document.getElementById("image").files[0];
    // convertImageToBase64(image, function(base64Data) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const h2 = document.createElement("h2");
    h2.textContent = recipeName;
    recipeCard.appendChild(h2);

    const img = document.createElement("img");
    img.src = await convertImageToBase64(image);    img.alt = recipeName;
    recipeCard.appendChild(img);

    const pIngredients = document.createElement("p");
    pIngredients.textContent = "Ingredients: ";
    recipeCard.appendChild(pIngredients);

    const h3 = document.createElement("h7");
    h3.textContent = ingredients;
    recipeCard.appendChild(h3);

    const pPreparation = document.createElement("p");
    pPreparation.textContent = "Preparation: ";
    recipeCard.appendChild(pPreparation);

    const h7 = document.createElement("h7");
    h7.textContent = preparation;
    recipeCard.appendChild(h7);

    recipeContainer.appendChild(recipeCard);
    let recipes = localStorage.getItem("recipes")
      ? JSON.parse(localStorage.getItem("recipes"))
      : [];
    recipes.push({ recipeName, image :await convertImageToBase64(image), preparation, ingredients });
    localStorage.setItem("recipes",JSON.stringify(recipes));
    // Clear form fields
    addRecipeForm.reset();
    modal.style.display = "none";
  });

  // Search functionality
  searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.toLowerCase();
    const recipeCards = document.querySelectorAll(".recipe-card");

    recipeCards.forEach(function (recipeCard) {
      const recipeName = recipeCard
        .querySelector("h2")
        .textContent.toLowerCase();
      const ingredients = recipeCard
        .querySelector("p")
        .textContent.toLowerCase();
      const preparation = recipeCard
        .querySelectorAll("p")[1]
        .textContent.toLowerCase();

      if (
        recipeName.includes(searchQuery) ||
        ingredients.includes(searchQuery) ||
        preparation.includes(searchQuery)
      ) {
        recipeCard.style.display = "block";
      } else {
        recipeCard.style.display = "none";
      }
    });
  });
});
