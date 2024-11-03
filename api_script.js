//api_script.js
// Sample API Data
const apiData = [
    { name: "Weather API", url: "https://openweathermap.org/api", category: "Weather", description: "Provides weather data." },
    { name: "COVID-19 Stats API", url: "https://documenter.getpostman.com/view/10724784/SzYXKX6mA", category: "Health", description: "Gives COVID-19 case statistics." },
    { name: "Stock Price API", url: "https://financialmodelingprep.com/developer/docs", category: "Finance", description: "Provides stock price data." },
    { name: "TheCatAPI", url: "https://thecatapi.com/", category: "Animals", description: "Pictures of cats from Tumblr." },
];

// Categories list
const categories = [
    "Animals", "Anime", "Anti-Malware", "Art & Design", "Books", "Business", "Calendar", 
    "Cloud storage", "Continuous Integration", "Cryptocurrency", "Currency Exchange", "Data Validation", 
    "Development", "Dictionary", "Disaster", "Document", "Education", "Environment", "Event", 
    "Finance", "Food & Drink", "Fraud Prevention", "Games & Comic", "Geocoding", "Government", 
    "Health", "Jobs", "Machine learning", "Music", "News", "Open Data", "Open Source Project", 
    "Patent", "Personality", "Photography", "Science & Maths", "Security", "Shopping", 
    "Social", "Sports & Fitness", "Test Data", "Text Analysis", "Tracking", "Transportation", 
    "Url Shortening", "Vehicle", "Video", "Weather"
];

// Get DOM elements
const apiList = document.getElementById('api-list');
const categoryList = document.getElementById('category-list');

// Function to display APIs
function displayAPIs(apis) {
    apiList.innerHTML = ''; // Clear previous entries
    apis.forEach(api => {
        const apiCard = document.createElement('div');
        apiCard.className = 'api-card';
        apiCard.innerHTML = `
            <h3>${api.name}</h3>
            <p><strong>URL:</strong> <a href="${api.url}" target="_blank">${api.url}</a></p>
            <p><strong>Description:</strong> ${api.description}</p>
            <p><strong>Category:</strong> ${api.category}</p>
        `;
        apiList.appendChild(apiCard);
    });
}

// Function to populate categories
function populateCategories() {
    categoryList.innerHTML = ''; // Clear the list first
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = category;
        categoryItem.onclick = () => filterByCategory(category); // Set onclick event for filtering
        categoryList.appendChild(categoryItem);
    });
}

// Call to display all APIs and populate categories initially
displayAPIs(apiData);
populateCategories();

// Function to filter APIs by search
function filterAPIs() {
    const searchTerm = document.getElementById('main-search').value.toLowerCase();
    const filteredAPIs = apiData.filter(api => 
        api.name.toLowerCase().includes(searchTerm) ||
        api.category.toLowerCase().includes(searchTerm)
    );

    // Display filtered APIs or all APIs if the search is empty
    if (searchTerm === "") {
        displayAPIs(apiData); // Show all APIs if search is empty
    } else {
        displayAPIs(filteredAPIs);
    }
}

// Function to filter categories
function filterCategories() {
    const searchTerm = document.getElementById('category-search').value.toLowerCase();
    const categoryItems = Array.from(categoryList.getElementsByTagName('li'));

    categoryItems.forEach(category => {
        const text = category.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            category.style.display = 'block'; // Show matching category
        } else {
            category.style.display = 'none'; // Hide non-matching category
        }
    });

    // Reset to show all categories if search is empty
    if (searchTerm === "") {
        categoryItems.forEach(category => {
            category.style.display = 'block'; // Show all categories if search is empty
        });
    }
}

// Function to filter APIs by category when a category is clicked
function filterByCategory(category) {
    const filteredAPIs = apiData.filter(api => api.category.toLowerCase() === category.toLowerCase());
    displayAPIs(filteredAPIs);
}

// Function to add a new category if it doesn't exist
function addCategoryIfNotExists(newCategory) {
    const normalizedNewCategory = newCategory.toLowerCase().trim();

    const categoryExists = categories.some(
        existingCategory => existingCategory.toLowerCase() === normalizedNewCategory
    );

    if (!categoryExists) {
        categories.push(newCategory);
        populateCategories(); // Re-populate the category list
    } else {
        alert("Category already exists.");
    }
}

// Function to add a new API
function addAPI() {
    const apiName = document.getElementById('apiName').value;
    const apiURL = document.getElementById('apiURL').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('apiCategory').value || 'General';

    if (apiName && apiURL && description) {
        const newAPI = {
            name: apiName,
            url: apiURL,
            category: category,
            description: description
        };

        apiData.push(newAPI); // Add the new API to the data list
        displayAPIs(apiData); // Update the API display
        addCategoryIfNotExists(category); // Add the category if it doesn't exist

        document.getElementById('contribute-form').reset(); // Reset form
    } else {
        alert("Please fill in all required fields.");
    }
}