const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",                                      // not GET this time
    headers: { "Content-Type": "application/json" },     // "the body is JSON"
    body: JSON.stringify({ name: "Savory Patty" })       // the data, as JSON text
});