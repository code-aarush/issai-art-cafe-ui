/**
 * ISAI Art Café - Application Logic
 * Implements dynamic menu generation and basic interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer dynamically
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 2. Dynamic Menu Data Object
    const menuData = {
        "Appetizers": [
            { name: "Garlic Bread", price: 130 },
            { name: "Cheesy Garlic Bread", price: 150 },
            { name: "Pan Fried Mushrooms", price: 180 },
            { name: "Pan Fried Tenders", price: 300 }
        ],
        "All Day Breakfast": [
            { name: "The English Breakfast", price: 400 },
            { name: "French Toast", price: 200 },
            { name: "Poha", price: 180 }
        ],
        "Isai's Originals": [
            { name: "Egg Wrapped Ramen", price: 220 },
            { name: "Semi-Fried Momos", price: 180 },
            { name: "The Bacon Special", price: 300 }
        ]
    };

    // 3. Inject Menu Logic
    const menuGrid = document.getElementById('menu-grid');

    if (menuGrid) {
        // Iterate through each category in the data object
        for (const [category, items] of Object.entries(menuData)) {
            
            // Create a section for the category
            const categorySection = document.createElement('div');
            categorySection.className = 'menu-category';
            
            // Create and append category title
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'menu-category-title';
            categoryTitle.textContent = category;
            categorySection.appendChild(categoryTitle);

            // Create grid for items
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'menu-items';

            // Iterate through items and create DOM elements
            items.forEach(item => {
                // Wrapper card with 'float' effect classes mapped in CSS
                const itemCard = document.createElement('div');
                itemCard.className = 'aesthetic-menu-item';
                
                // Item details container
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'item-details';
                
                const itemName = document.createElement('h4');
                itemName.textContent = item.name;
                detailsDiv.appendChild(itemName);

                // Price element
                const itemPrice = document.createElement('div');
                itemPrice.className = 'item-price';
                itemPrice.textContent = `₹${item.price}`;

                // Assemble card
                itemCard.appendChild(detailsDiv);
                itemCard.appendChild(itemPrice);
                
                itemsContainer.appendChild(itemCard);
            });

            // Append items to category section
            categorySection.appendChild(itemsContainer);
            
            // Append category to main grid
            menuGrid.appendChild(categorySection);
        }
    }
});
