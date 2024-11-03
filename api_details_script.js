//api_details_script.js
// Get query parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        url: params.get("url"),
        description: params.get("description"),
        category: params.get("category")
    };
}

// Display API details
function displayAPIDetails() {
    const api = getQueryParams();
    document.getElementById("api-name").textContent = api.name;
    document.getElementById("api-url").textContent = api.url;
    document.getElementById("api-url").href = api.url;
    document.getElementById("api-description").textContent = api.description;
    document.getElementById("api-category").textContent = api.category;
}

// Initialize
displayAPIDetails();