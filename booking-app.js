// Main application class
class BookingApp {
    constructor() {
        // Simulated database
        this.users = [];
        this.properties = [
            {
                id: 1,
                name: "Luxury Ocean View Hotel",
                location: "Miami Beach, FL",
                price: 299,
                type: "hotel",
                description: "Stunning oceanfront hotel with world-class amenities"
            },
            {
                id: 2,
                name: "Cozy Mountain Cabin",
                location: "Aspen, CO",
                price: 189,
                type: "airbnb",
                description: "Perfect retreat in the heart of the mountains"
            },
            {
                id: 3,
                name: "Modern Downtown Loft",
                location: "New York, NY",
                price: 249,
                type: "apartment",
                description: "Stylish loft in the bustling city center"
            }
        ];
        this.bookings = [];
        this.currentUser = null;
        this.isLoginMode = true;
        
        // Initialize the app
        this.init();
    }
    
    // Initialize the application
    init() {
        this.createDOMStructure();
        this.setupEventListeners();
        this.loadProperties();
        this.setDefaultDates();
        
        // Add sample data for demo
        this.addSampleData();
        this.createFloatingParticles();
        
        console.log('StayScape Booking Platform initialized successfully!');
    }
    
    // Create the DOM structure
    createDOMStructure() {
        // Create the main container
        document.body.innerHTML = `
            <nav class="navbar">
                <div class="nav-content">
                    <div class="logo">ADILLA</div>
                    <ul class="nav-links">
                        <li><a id="homeLink">Home</a></li>
                        <li><a id="propertiesLink">Properties</a></li>
                        <li><a id="authLink">Login</a></li>
                        <li><a id="adminLink" style="display: none;">Admin</a></li>
                        <li><a id="logoutLink" style="display: none;">Logout</a></li>
                    </ul>
                </div>
            </nav>

            <div class="container">
                <!-- Home Section -->
                <section id="home" class="section active">
                    <div class="hero">
                        <h1>Discover Your Perfect Stay</h1>
                        <p>From luxury hotels to cozy Airbnbs, find and book your ideal accommodation with ease. Experience seamless booking with stunning properties worldwide.</p>
                    </div>
                    
                    <div class="card">
                        <h2 style="text-align: center; margin-bottom: 20px; color: #4ecdc4;">Quick Search</h2>
                        <div class="form-group">
                            <input type="text" placeholder="Where are you going?" id="searchLocation">
                        </div>
                        <div style="display: flex; gap: 15px;">
                            <div class="form-group" style="flex: 1;">
                                <input type="date" id="checkIn">
                            </div>
                            <div class="form-group" style="flex: 1;">
                                <input type="date" id="checkOut">
                            </div>
                        </div>
                        <div class="form-group">
                            <select id="guests">
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="5">5+ Guests</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" id="searchBtn">Search Properties</button>
                    </div>
                </section>

                <!-- Properties Section -->
                <section id="properties" class="section">
                    <div class="hero">
                        <h1>Available Properties</h1>
                        <p>Discover our curated collection of premium accommodations</p>
                    </div>
                    <div id="propertiesGrid" class="properties-grid">
                        <!-- Properties will be loaded here -->
                    </div>
                </section>

                <!-- Login/Register Section -->
                <section id="login" class="section">
                    <div class="card">
                        <h2 id="authTitle" style="text-align: center; margin-bottom: 30px; color: #4ecdc4;">Welcome Back</h2>
                        
                        <form id="authForm">
                            <div class="form-group" id="nameGroup" style="display: none;">
                                <label>Full Name</label>
                                <input type="text" id="fullName" placeholder="Enter your full name">
                            </div>
                            
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="email" placeholder="Enter your email" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" id="password" placeholder="Enter your password" required>
                            </div>
                            
                            <button type="submit" class="btn btn-primary" id="authSubmit">Sign In</button>
                        </form>
                        
                        <div style="text-align: center; margin-top: 20px;">
                            <p>
                                <span id="authToggleText">Don't have an account?</span>
                                <a href="#" id="authToggleLink" style="color: #4ecdc4; text-decoration: none; margin-left: 5px;">Sign Up</a>
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Admin Section -->
                <section id="admin" class="section">
                    <div class="admin-header">
                        <h1>Admin Dashboard</h1>
                        <div style="display: flex; gap: 15px;">
                            <button class="btn btn-secondary" id="addPropertyBtn">Add Property</button>
                            <button class="btn btn-secondary" id="viewBookingsBtn">View Bookings</button>
                        </div>
                    </div>

                    <!-- Add Property Form -->
                    <div id="addPropertyForm" class="card" style="display: none;">
                        <h2 style="color: #4ecdc4; margin-bottom: 20px;">Add New Property</h2>
                        <form id="propertyForm">
                            <div class="form-group">
                                <label>Property Name</label>
                                <input type="text" id="propName" placeholder="Enter property name" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Location</label>
                                <input type="text" id="propLocation" placeholder="Enter location" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Price per Night ($)</label>
                                <input type="number" id="propPrice" placeholder="Enter price" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Property Type</label>
                                <select id="propType" required>
                                    <option value="">Select Type</option>
                                    <option value="hotel">Hotel</option>
                                    <option value="airbnb">Airbnb</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="villa">Villa</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Description</label>
                                <textarea id="propDescription" placeholder="Enter property description" rows="4"></textarea>
                            </div>
                            
                            <button type="submit" class="btn btn-primary">Add Property</button>
                            <button type="button" class="btn btn-secondary" id="cancelAddProperty" style="margin-top: 10px;">Cancel</button>
                        </form>
                    </div>

                    <!-- Bookings List -->
                    <div id="bookingsList" class="bookings-list" style="display: none;">
                        <h2 style="color: #4ecdc4; margin-bottom: 20px;">Recent Bookings</h2>
                        <div id="bookingsContent">
                            <!-- Bookings will be loaded here -->
                        </div>
                    </div>
                </section>
            </div>

            <!-- Notification -->
            <div id="notification" class="notification"></div>
        `;
        
        // Add CSS styles
        this.addStyles();
    }
    
    // Add CSS styles to the document
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                            url('background.jpg');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                min-height: 100vh;
                color: white;
                overflow-x: hidden;
            }

            /* Navigation */
            .navbar {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50px;
                padding: 15px 30px;
                z-index: 1000;
                transition: all 0.3s ease;
            }

            .navbar:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateX(-50%) translateY(-2px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }

            .nav-content {
                display: flex;
                align-items: center;
                gap: 30px;
            }

            .logo {
                font-size: 24px;
                font-weight: bold;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .nav-links {
                display: flex;
                gap: 20px;
                list-style: none;
            }

            .nav-links a {
                color: white;
                text-decoration: none;
                padding: 8px 16px;
                border-radius: 20px;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .nav-links a:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }

            /* Main Content */
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 120px 20px 40px;
            }

            .hero {
                text-align: center;
                margin-bottom: 60px;
                animation: fadeInUp 1s ease;
            }

            .hero h1 {
                font-size: 3.5em;
                margin-bottom: 20px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: gradientShift 3s ease infinite;
            }

            .hero p {
                font-size: 1.3em;
                opacity: 0.9;
                max-width: 600px;
                margin: 0 auto;
            }

            /* Cards */
            .section {
                display: none;
                animation: fadeIn 0.5s ease;
            }

            .section.active {
                display: block;
            }

            .card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 40px;
                margin: 20px auto;
                max-width: 500px;
                transition: all 0.3s ease;
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                background: rgba(255, 255, 255, 0.15);
            }

            .form-group {
                margin-bottom: 20px;
            }

            .form-group label {
                display: block;
                margin-bottom: 8px;
                color: rgba(255, 255, 255, 0.9);
            }

            .form-group input, .form-group select, .form-group textarea {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 16px;
                transition: all 0.3s ease;
            }

            .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                outline: none;
                border-color: #4ecdc4;
                background: rgba(255, 255, 255, 0.2);
                box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
            }

            .form-group input::placeholder, .form-group textarea::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }

            .btn {
                width: 100%;
                padding: 15px;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .btn-primary {
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
            }

            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(78, 205, 196, 0.4);
            }

            .btn-secondary {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }

            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }

            /* Properties Grid */
            .properties-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
                margin-top: 30px;
            }

            .property-card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .property-card:hover {
                transform: translateY(-10px) scale(1.02);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }

            .property-image {
                width: 100%;
                height: 200px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 48px;
                position: relative;
                overflow: hidden;
            }

            .property-image::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transform: rotate(45deg);
                animation: shimmer 2s infinite;
            }

            .property-content {
                padding: 20px;
            }

            .property-title {
                font-size: 1.4em;
                font-weight: bold;
                margin-bottom: 10px;
                color: #4ecdc4;
            }

            .property-price {
                font-size: 1.6em;
                font-weight: bold;
                color: #ff6b6b;
                margin: 10px 0;
            }

            .property-location {
                opacity: 0.8;
                margin-bottom: 15px;
            }

            /* Admin Panel */
            .admin-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                backdrop-filter: blur(20px);
            }

            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(45deg, #4ecdc4, #45b7d1);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                transform: translateX(400px);
                transition: all 0.3s ease;
                z-index: 1001;
            }

            .notification.show {
                transform: translateX(0);
            }

            .bookings-list {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 20px;
                margin-top: 20px;
            }

            .booking-item {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 15px;
                border-left: 4px solid #4ecdc4;
            }

            /* Animations */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            @keyframes shimmer {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }

            /* Responsive */
            @media (max-width: 768px) {
                .navbar {
                    left: 20px;
                    right: 20px;
                    transform: none;
                    padding: 10px 20px;
                }

                .nav-content {
                    flex-direction: column;
                    gap: 15px;
                }

                .nav-links {
                    gap: 15px;
                }

                .hero h1 {
                    font-size: 2.5em;
                }

                .properties-grid {
                    grid-template-columns: 1fr;
                }

                .admin-header {
                    flex-direction: column;
                    gap: 15px;
                }
            }

            /* Additional animations */
            @keyframes float {
                0% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('homeLink').addEventListener('click', () => this.showSection('home'));
        document.getElementById('propertiesLink').addEventListener('click', () => this.showSection('properties'));
        document.getElementById('authLink').addEventListener('click', () => this.showSection('login'));
        document.getElementById('adminLink').addEventListener('click', () => this.showSection('admin'));
        document.getElementById('logoutLink').addEventListener('click', () => this.logout());
        
        // Authentication
        document.getElementById('authForm').addEventListener('submit', (e) => this.handleAuthSubmit(e));
        document.getElementById('authToggleLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleAuthMode();
        });
        
        // Search
        document.getElementById('searchBtn').addEventListener('click', () => this.searchProperties());
        document.getElementById('searchLocation').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length > 2) {
                setTimeout(() => {
                    if (document.getElementById('searchLocation').value.toLowerCase().trim() === query) {
                        this.searchProperties();
                    }
                }, 500);
            }
        });
        
        // Admin
        document.getElementById('addPropertyBtn').addEventListener('click', () => this.showAddProperty());
        document.getElementById('viewBookingsBtn').addEventListener('click', () => this.viewBookings());
        document.getElementById('cancelAddProperty').addEventListener('click', () => this.hideAddProperty());
        document.getElementById('propertyForm').addEventListener('submit', (e) => this.handlePropertySubmit(e));
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAddProperty();
            }
        });
    }
    
    // Navigation
    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        if (sectionId === 'properties') {
            this.loadProperties();
        }
    }
    
    // Authentication
    toggleAuthMode() {
        this.isLoginMode = !this.isLoginMode;
        const title = document.getElementById('authTitle');
        const submitBtn = document.getElementById('authSubmit');
        const nameGroup = document.getElementById('nameGroup');
        const toggleText = document.getElementById('authToggleText');
        const toggleLink = document.getElementById('authToggleLink');

        if (this.isLoginMode) {
            title.textContent = 'Welcome Back';
            submitBtn.textContent = 'Sign In';
            nameGroup.style.display = 'none';
            toggleText.textContent = "Don't have an account?";
            toggleLink.textContent = 'Sign Up';
        } else {
            title.textContent = 'Create Account';
            submitBtn.textContent = 'Sign Up';
            nameGroup.style.display = 'block';
            toggleText.textContent = 'Already have an account?';
            toggleLink.textContent = 'Sign In';
        }
    }
    
    handleAuthSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const fullName = document.getElementById('fullName').value;

        if (this.isLoginMode) {
            // Login
            const user = this.users.find(u => u.email === email && u.password === password);
            if (user) {
                this.currentUser = user;
                this.updateAuthUI();
                this.showNotification('Welcome back, ' + user.name + '!');
                this.showSection('home');
            } else {
                this.showNotification('Invalid credentials!', 'error');
            }
        } else {
            // Register
            if (this.users.find(u => u.email === email)) {
                this.showNotification('Email already exists!', 'error');
                return;
            }
            
            const newUser = {
                id: this.users.length + 1,
                name: fullName,
                email: email,
                password: password,
                isAdmin: email.includes('admin') // Simple admin check
            };
            
            this.users.push(newUser);
            this.currentUser = newUser;
            this.updateAuthUI();
            this.showNotification('Account created successfully!');
            this.showSection('home');
        }
        
        document.getElementById('authForm').reset();
    }
    
    logout() {
        this.currentUser = null;
        this.updateAuthUI();
        this.showNotification('Logged out successfully!');
        this.showSection('home');
    }
    
    updateAuthUI() {
        const authLink = document.getElementById('authLink');
        const adminLink = document.getElementById('adminLink');
        const logoutLink = document.getElementById('logoutLink');

        if (this.currentUser) {
            authLink.style.display = 'none';
            logoutLink.style.display = 'block';
            
            if (this.currentUser.isAdmin) {
                adminLink.style.display = 'block';
            }
        } else {
            authLink.style.display = 'block';
            adminLink.style.display = 'none';
            logoutLink.style.display = 'none';
        }
    }
    
    // Properties
    loadProperties() {
        const grid = document.getElementById('propertiesGrid');
        grid.innerHTML = '';

        this.properties.forEach(property => {
            const propertyCard = this.createPropertyCard(property);
            grid.appendChild(propertyCard);
        });
    }
    
    createPropertyCard(property) {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.addEventListener('click', () => this.bookProperty(property));
        
        const icons = {
            hotel: '🏨',
            airbnb: '🏠',
            apartment: '🏢',
            villa: '🏡'
        };

        card.innerHTML = `
            <div class="property-image">
                <span style="font-size: 64px;">${icons[property.type] || '🏨'}</span>
            </div>
            <div class="property-content">
                <div class="property-title">${property.name}</div>
                <div class="property-location">📍 ${property.location}</div>
                <div class="property-price">$${property.price}/night</div>
                <p style="opacity: 0.8; margin-top: 10px;">${property.description}</p>
                <div style="margin-top: 15px;">
                    <span style="background: rgba(78, 205, 196, 0.2); padding: 4px 8px; border-radius: 15px; font-size: 0.8em; text-transform: capitalize;">
                        ${property.type}
                    </span>
                </div>
            </div>
        `;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
        
        return card;
    }
    
    bookProperty(property) {
        if (!this.currentUser) {
            this.showNotification('Please login to book a property!', 'error');
            this.showSection('login');
            return;
        }

        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const guests = document.getElementById('guests').value;

        if (!checkIn || !checkOut) {
            this.showNotification('Please select check-in and check-out dates!', 'error');
            this.showSection('home');
            return;
        }

        const booking = {
            id: this.bookings.length + 1,
            propertyId: property.id,
            propertyName: property.name,
            userId: this.currentUser.id,
            userName: this.currentUser.name,
            userEmail: this.currentUser.email,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests,
            totalPrice: property.price,
            bookingDate: new Date().toISOString().split('T')[0],
            status: 'confirmed'
        };

        this.bookings.push(booking);
        this.showNotification(`Successfully booked ${property.name}! Booking ID: #${booking.id}`);
        
        // Simulate notification to admin
        console.log('New Booking Alert:', booking);
    }
    
    searchProperties() {
        const location = document.getElementById('searchLocation').value.toLowerCase();
        
        if (!location) {
            this.showSection('properties');
            return;
        }

        const filteredProperties = this.properties.filter(property => 
            property.location.toLowerCase().includes(location) ||
            property.name.toLowerCase().includes(location)
        );

        this.showSection('properties');
        
        const grid = document.getElementById('propertiesGrid');
        grid.innerHTML = '';

        if (filteredProperties.length === 0) {
            grid.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7); font-size: 1.2em;">No properties found for your search.</p>';
        } else {
            filteredProperties.forEach(property => {
                const propertyCard = this.createPropertyCard(property);
                grid.appendChild(propertyCard);
            });
        }
    }
    
    // Admin Functions
    showAddProperty() {
        if (!this.currentUser || !this.currentUser.isAdmin) {
            this.showNotification('Admin access required!', 'error');
            return;
        }
        
        document.getElementById('addPropertyForm').style.display = 'block';
        document.getElementById('bookingsList').style.display = 'none';
    }
    
    hideAddProperty() {
        document.getElementById('addPropertyForm').style.display = 'none';
    }
    
    viewBookings() {
        if (!this.currentUser || !this.currentUser.isAdmin) {
            this.showNotification('Admin access required!', 'error');
            return;
        }
        
        document.getElementById('addPropertyForm').style.display = 'none';
        document.getElementById('bookingsList').style.display = 'block';
        
        const bookingsContent = document.getElementById('bookingsContent');
        bookingsContent.innerHTML = '';

        if (this.bookings.length === 0) {
            bookingsContent.innerHTML = '<p style="text-align: center; opacity: 0.7;">No bookings yet.</p>';
        } else {
            this.bookings.forEach(booking => {
                const bookingItem = document.createElement('div');
                bookingItem.className = 'booking-item';
                bookingItem.innerHTML = `
                    <div style="display: flex; justify-content: between; align-items: center;">
                        <div>
                            <h3 style="color: #4ecdc4; margin-bottom: 5px;">Booking #${booking.id}</h3>
                            <p><strong>Property:</strong> ${booking.propertyName}</p>
                            <p><strong>Guest:</strong> ${booking.userName} (${booking.userEmail})</p>
                            <p><strong>Dates:</strong> ${booking.checkIn} to ${booking.checkOut}</p>
                            <p><strong>Guests:</strong> ${booking.guests}</p>
                            <p><strong>Total:</strong> $${booking.totalPrice}</p>
                        </div>
                        <div style="text-align: right;">
                            <span style="background: rgba(78, 205, 196, 0.3); padding: 5px 10px; border-radius: 15px; font-size: 0.8em;">
                                ${booking.status}
                            </span>
                            <p style="font-size: 0.8em; opacity: 0.7; margin-top: 5px;">
                                Booked: ${booking.bookingDate}
                            </p>
                        </div>
                    </div>
                `;
                bookingsContent.appendChild(bookingItem);
            });
        }
    }
    
    handlePropertySubmit(e) {
        e.preventDefault();
        
        if (!this.currentUser || !this.currentUser.isAdmin) {
            this.showNotification('Admin access required!', 'error');
            return;
        }

        const newProperty = {
            id: this.properties.length + 1,
            name: document.getElementById('propName').value,
            location: document.getElementById('propLocation').value,
            price: parseInt(document.getElementById('propPrice').value),
            type: document.getElementById('propType').value,
            description: document.getElementById('propDescription').value
        };

        this.properties.push(newProperty);
        this.showNotification('Property added successfully!');
        document.getElementById('propertyForm').reset();
        this.hideAddProperty();
        this.loadProperties();
    }
    
    // Notifications
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification show';
        
        if (type === 'error') {
            notification.style.background = 'linear-gradient(45deg, #ff6b6b, #ff4757)';
        } else {
            notification.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
        }

        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
    
    // Utility functions
    setDefaultDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        document.getElementById('checkIn').value = today.toISOString().split('T')[0];
        document.getElementById('checkOut').value = tomorrow.toISOString().split('T')[0];
    }
    
    addSampleData() {
        // Add sample users for demo
        this.users.push(
            { id: 1, name: 'Admin User', email: 'admin@stayscape.com', password: 'admin123', isAdmin: true },
            { id: 2, name: 'John Doe', email: 'john@example.com', password: 'password', isAdmin: false }
        );

        // Add sample bookings for demo
        this.bookings.push(
            {
                id: 1,
                propertyId: 1,
                propertyName: 'Luxury Ocean View Hotel',
                userId: 2,
                userName: 'John Doe',
                userEmail: 'john@example.com',
                checkIn: '2024-12-25',
                checkOut: '2024-12-30',
                guests: '2',
                totalPrice: 1495,
                bookingDate: '2024-12-15',
                status: 'confirmed'
            }
        );
    }
    
    createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                animation: float ${Math.random() * 20 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particlesContainer.appendChild(particle);
        }

        document.body.appendChild(particlesContainer);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BookingApp();
});
