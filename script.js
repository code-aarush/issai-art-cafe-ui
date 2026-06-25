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
                    
                    <!-- New Bookings Dropdown -->
                    <li class="nav-dropdown">
                        <a href="#">Bookings ▾</a>
                        <ul class="dropdown-content">
                            <li><a href="booking.html">Book a Table</a></li>
                            <li><a href="host-event.html">Host an Event</a></li>
                        </ul>
                    </li>

                    <li><a href="blog.html">Our Blog</a></li>
                    <!-- Moved Gallery, FAQ, and Contact to Footer -->
                </ul>

                <a href="events.html" class="btn btn-primary nav-cta">Events you can join!</a>
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
                <div class="footer-top">
                    <div class="footer-logo-container">
                        <a href="index.html" class="footer-logo-new">isai</a>
                        <p class="footer-logo-sub">The Art Café</p><br>
                    </div>
                </div>
                <div class="footer-container">
                    <div class="footer-col">
                        <h3>Address</h3>
                        <p class="footer-address-italic">Where Creativity Meets Comfort.</p>
                        <address>
                            <p>4/408, Anna Salai Rd,<br> Palavakkam, Chennai,<br> Tamil Nadu 600041</p>
                        </address>
                    </div>

                    <div class="footer-col">
                        <h3>Contact Us & CTAs</h3>
                        <p class="footer-hours"><strong>Hours:</strong> Everyday from 5 PM</p>
                        <div class="footer-buttons">
                            <a href="tel:+919677011694" class="btn-footer phone-btn"><i class="fa-solid fa-phone"></i> +91 96770 11694</a>
                            <a href="https://wa.me/919677011694" class="btn-footer whatsapp-btn" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                        </div>
                    </div>

                    <div class="footer-col">
                        <h3>Quick Links</h3>
                        <ul class="footer-quick-links">
                            <li><a href="about.html">Our Story</a></li>
                            <li><a href="menu.html">Menu</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="gallery.html">Gallery</a></li>
                            <li><a href="faq.html">FAQ</a></li>
                            <li><a href="blog.html">Our Blog</a></li>
                            <li><a href="booking.html">Book a Slot</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h3>The Map</h3>
                        <div class="footer-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5833895475654!2d80.2528!3d12.9567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d1234567890%3A0x1234567890abcdef!2s4%2F408%2C%20Anna%20Salai%20Rd%2C%20Palavakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600041!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%" height="160" style="border:0; border-radius: 12px;" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade" title="Google Maps Location of ISAI Art Cafe">
                            </iframe>
                            <div class="map-btn-container">
                                <a href="https://goo.gl/maps/..." target="_blank" class="btn-footer map-btn">Get Directions</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="social-icons">
                        <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                        <a href="https://tiktok.com" target="_blank" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
                    </div>
                    <p>&copy; <span id="current-year">${new Date().getFullYear()}</span> ISAI - The Art Café. All rights reserved.</p>
                </div>
            </footer>
        `;
    }

    // Inject Corner Widget
    if (!document.getElementById('corner-widget')) {
        const widget = document.createElement('div');
        widget.id = 'corner-widget';
        widget.className = 'corner-widget';
        widget.innerHTML = `
            <a href="https://wa.me/919677011694" target="_blank" class="widget-btn whatsapp" aria-label="Chat on WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
            </a>
            <a href="tel:+919677011694" class="widget-btn phone" aria-label="Call Us">
                <i class="fa-solid fa-phone"></i>
            </a>
        `;
        document.body.appendChild(widget);
    }

    // Inject Transition Overlay
    let overlay = document.getElementById('transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'transition-overlay';
        overlay.className = 'transition-overlay';
        overlay.innerHTML = `
            <div class="logo-placeholder lg-logo">isai</div>
        `;
        document.body.appendChild(overlay);
    }

    // Fade out overlay on load
    requestAnimationFrame(() => {
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 50); // slight delay to ensure it renders first
    });

    // Initialize Page Transitions
    setupPageTransitions(overlay);
}

function setupPageTransitions(overlay) {
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetUrl = this.getAttribute('href');
            const targetOrigin = this.origin || (new URL(this.href, window.location.href)).origin;

            // Only transition for internal links that aren't anchors or new tabs
            if (
                targetUrl &&
                !targetUrl.startsWith('#') &&
                !targetUrl.startsWith('tel:') &&
                !targetUrl.startsWith('mailto:') &&
                this.target !== '_blank' &&
                targetOrigin === window.location.origin
            ) {
                e.preventDefault();
                const wrapper = document.querySelector('.page-wrapper');

                if (wrapper && overlay) {
                    // Show the overlay (fade in)
                    overlay.classList.remove('hidden');

                    // Wait for overlay to fade in before navigating
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 400); // Matches the 0.4s CSS transition duration
                } else {
                    window.location.href = targetUrl;
                }
            }
        });
    });
}

async function loadMenu() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return; // Safety check

    // Clear the grid in case this function runs twice
    menuGrid.innerHTML = '';

    // 1. URL and Helper Function
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQJS5u6bzuYnY3t9v2OD1FPYqp89b2yQxIuiJv5sHWFeF12pmyl9LrWz-wV9h0361ma6kTWu6KHoZ3F/pub?output=csv';

    // Ensures commas inside your descriptions don't break the columns
    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let insideQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') insideQuotes = !insideQuotes;
            else if (char === ',' && !insideQuotes) { result.push(current.trim()); current = ''; }
            else current += char;
        }
        result.push(current.trim());
        return result;
    }

    try {
        // 2. Fetch and Parse the Data
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Failed to fetch menu CSV");
        const csvText = await response.text();

        const rows = csvText.split(/\r?\n/);

        // 3. Structure the Data into your desired menuData object
        const menuData = rows.slice(1).reduce((acc, row) => {
            if (!row.trim()) return acc;
            const cols = parseCSVLine(row);
            if (cols.length < 5) return acc;

            const category = cols[0].replace(/^"|"$/g, '').trim();
            const name = cols[1].replace(/^"|"$/g, '').trim();
            const desc = cols[2].replace(/^"|"$/g, '').trim();
            const price = cols[3].replace(/^"|"$/g, '').trim();
            let img = cols[4] ? cols[4].replace(/^"|"$/g, '').trim() : '';

            // Ignore rows that don't have a category or name
            if (!category || !name) return acc;

            // --- THE GOOGLE DRIVE THUMBNAIL FIX YOU REQUESTED ---
            if (img && img.includes('drive.google.com')) {
                const fileIdMatch = img.match(/[-\w]{25,}/);
                if (fileIdMatch) {
                    img = `https://drive.google.com/thumbnail?id=${fileIdMatch[0]}&sz=s800`;
                }
            }

            // Create category ONLY if it doesn't exist, then push item
            (acc[category] = acc[category] || []).push({ name, price, desc, img });
            return acc;
        }, {});

        // 4. INJECT YOUR DOM LOGIC
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

                // Fallback handling: If img is blank, use a placeholder
                const finalImgUrl = item.img ? item.img : 'https://placehold.co/500x400/efebe6/4a3c31?text=No+Image';
                imgContainer.style.backgroundImage = `url('${finalImgUrl}')`;

                // Add essential background styles to ensure it renders well
                imgContainer.style.backgroundSize = 'cover';
                imgContainer.style.backgroundPosition = 'center';

                // Details container
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'item-details';

                const headerDiv = document.createElement('div');
                headerDiv.className = 'item-header';

                const itemName = document.createElement('h4');
                itemName.textContent = item.name;

                const itemPrice = document.createElement('div');
                itemPrice.className = 'item-price';
                itemPrice.textContent = `${item.price}`;

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

    } catch (error) {
        console.error("Error loading menu:", error);
        menuGrid.innerHTML = '<p class="error-msg text-center" style="grid-column: 1/-1;">Unable to load menu. Please check your internet connection.</p>';
    }
}
