/**
 * ISAI Art Café - Application Logic
 * Implements shared component injection (navbar, footer), dynamic menu generation, and interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {
    loadSharedComponents();
    
    // Check if we are on the menu page before loading menu data
    if (document.getElementById('menu-grid')) {
        loadMenu();
    }
});

function loadSharedComponents() {
    // Inject Navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <nav class="navbar">
                <a href="index.html" class="logo-placeholder">isai<span class="logo-subtext">The ART Café</span></a>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">Our Story</a></li>
                    <li><a href="menu.html">Menu</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
                <a href="booking.html" class="btn btn-primary nav-cta">Make Appointment</a>
            </nav>
        `;
        
        // Highlight active link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = navbarContainer.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Inject Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-details">
                        <a href="index.html" class="footer-logo">isai</a>
                        <p class="footer-tagline">Where Creativity Meets Comfort.</p>
                        <address>
                            <p>4/408, Anna Salai Rd,<br> Palavakkam, Chennai,<br> Tamil Nadu 600041</p>
                            <p class="hours">Hours: Opens 5 PM</p>
                            <p><a href="tel:+919677011694" class="phone-link">+91 96770 11694</a></p>
                            <p><a href="https://wa.me/919677011694" class="whatsapp-link" target="_blank">Chat on WhatsApp</a></p>
                        </address>
                    </div>

                    <div class="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="about.html">Our Story</a></li>
                            <li><a href="menu.html">Menu</a></li>
                            <li><a href="gallery.html">Instagrammable Moments</a></li>
                            <li><a href="booking.html">Book a Slot</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>

                    <div class="footer-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5833895475654!2d80.2528!3d12.9567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d1234567890%3A0x1234567890abcdef!2s4%2F408%2C%20Anna%20Salai%20Rd%2C%20Palavakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600041!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%" height="200" style="border:0; border-radius: 12px;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade" title="Google Maps Location of ISAI Art Cafe">
                        </iframe>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; <span id="current-year">${new Date().getFullYear()}</span> ISAI - The Art Café. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
}

function loadMenu() {
    const menuData = {
        "Appetizers": [
            { name: "Garlic Bread", price: 130, desc: "Toasted bread infused with garlic, butter, and parsley.", img: "assets/images/garlic_bread.png" },
            { name: "Cheesy Garlic Bread", price: 150, desc: "Toasted bread with shredded mozzarella, garlic, and herbs.", img: "assets/images/cheesy_garlic_bread.png" },
            { name: "Pan Fried Mushrooms", price: 180, desc: "A medley of button & bell peppers with sautéed mushrooms.", img: "assets/images/pan_fried_mushrooms.png" },
            { name: "Pan Fried Tenders", price: 300, desc: "Deep-fried chicken tenders tossed with onions, capsicum & spices.", img: "assets/images/pan_fried_tenders.png" }
        ],
        "All Day Breakfast": [
            { name: "The English Breakfast", price: 400, desc: "A medley of bacon, chicken sausages, eggs, veggies, hash brown, toast & multi-dips.", img: "assets/images/english_breakfast.png" },
            { name: "French Toast", price: 200, desc: "Fluffy buttery egg soaked bread toasted to perfection w/ honey.", img: "assets/images/french_toast.png" },
            { name: "Poha", price: 180, desc: "Flattened rice cooked with onions, peanuts & raw spices.", img: "assets/images/poha.png" }
        ],
        "Isai's Originals": [
            { name: "Egg Wrapped Ramen", price: 220, desc: "Spicy garlic ramen wrapped in a fluffy omelette.", img: "assets/images/egg_wrapped_ramen.png" },
            { name: "Semi-Fried Momos", price: "180/200", desc: "Veg/Chicken momos pan-fried with onions, capsicum and sauces.", img: "assets/images/semi_fried_momos.png" },
            { name: "The Bacon Special", price: 300, desc: "Crispy bacon, veggies, cheese in bread grilled to perfection.", img: "assets/images/bacon_special.png" }
        ]
    };

    const menuGrid = document.getElementById('menu-grid');

    for (const [category, items] of Object.entries(menuData)) {
        const categorySection = document.createElement('div');
        categorySection.className = 'menu-category fade-in-scale';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'menu-category-title';
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'menu-items';

        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'aesthetic-menu-item';
            
            // Image container
            const imgContainer = document.createElement('div');
            imgContainer.className = 'menu-item-image';
            imgContainer.style.backgroundImage = `url('${item.img}')`;
            
            // Details container
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'item-details';
            
            const headerDiv = document.createElement('div');
            headerDiv.className = 'item-header';
            
            const itemName = document.createElement('h4');
            itemName.textContent = item.name;
            
            const itemPrice = document.createElement('div');
            itemPrice.className = 'item-price';
            itemPrice.textContent = `₹${item.price}`;
            
            headerDiv.appendChild(itemName);
            headerDiv.appendChild(itemPrice);
            
            const itemDesc = document.createElement('p');
            itemDesc.className = 'item-desc';
            itemDesc.textContent = item.desc;
            
            detailsDiv.appendChild(headerDiv);
            detailsDiv.appendChild(itemDesc);

            itemCard.appendChild(imgContainer);
            itemCard.appendChild(detailsDiv);
            
            itemsContainer.appendChild(itemCard);
        });

        categorySection.appendChild(itemsContainer);
        menuGrid.appendChild(categorySection);
    }
}
