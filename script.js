// ===== GET: find a recipe =====
const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

async function loadRecipe() {
    recipeArea.textContent = "";   // clear the old recipe first

    if (input.value === "") {
        statusText.textContent = "Type a number first.";
        return;
    }

    try {
        statusText.textContent = "Loading...";

        const response = await fetch("https://dummyjson.com/recipes/" + input.value);

        if (!response.ok) {
            statusText.textContent = "No recipe with that number. Try 1 to 50.";
            return;
        }

        const recipe = await response.json();
        statusText.textContent = "";
        console.log(recipe);

        // The card: same 4 moves as Week 4
        const card = document.createElement("div");
        card.className = "card p-3";

        const title = document.createElement("h2");
        title.className = "h4";
        title.textContent = recipe.name;
        card.appendChild(title);

        const cuisine = document.createElement("p");
        cuisine.textContent = "Cuisine: " + recipe.cuisine;
        card.appendChild(cuisine);

        const prep = document.createElement("p");
        prep.textContent = "Prep time: " + recipe.prepTimeMinutes + " minutes";
        card.appendChild(prep);

        recipeArea.appendChild(card);
        input.value = "";   // clear the box
    } catch (error) {
        statusText.textContent = "Can't reach the recipe server. Check your internet.";
    }
}

button.addEventListener("click", loadRecipe);

const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

async function addDish() {
    savedArea.textContent = "";

    const response = await fetch("https://dummyjson.com/recipes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: dishInput.value })
    });

    const newDish = await response.json();
    console.log(newDish);

    const message = document.createElement("p");
    message.className = "alert alert-success";
    message.textContent = 'Added "' + newDish.name + '" as recipe #' + newDish.id + " (practice server: not really saved)";
    savedArea.appendChild(message);

        dishInput.value = "";

}

postButton.addEventListener("click", addDish);