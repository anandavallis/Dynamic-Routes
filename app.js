     const mockUsers = [
            {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                phone: "+1-234-567-8901",
                website: "john-doe.com",
                address: "123 Main St, New York, NY",
                company: "Tech Corp",
                bio: "Full-stack developer with 5+ years of experience in React and Node.js. Passionate about creating scalable web applications and mentoring junior developers."
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane@example.com",
                phone: "+1-234-567-8902",
                website: "jane-smith.dev",
                address: "456 Oak Ave, Los Angeles, CA",
                company: "Design Studio",
                bio: "UX/UI designer passionate about creating intuitive user experiences. Specializes in user research, prototyping, and design systems."
            },
            {
                id: 3,
                name: "Mike Johnson",
                email: "mike@example.com",
                phone: "+1-234-567-8903",
                website: "mikej.portfolio.com",
                address: "789 Pine Rd, Chicago, IL",
                company: "Data Analytics Inc",
                bio: "Data scientist specializing in machine learning and predictive analytics. Expert in Python, R, and statistical modeling."
            },
            {
                id: 4,
                name: "Sarah Wilson",
                email: "sarah@example.com",
                phone: "+1-234-567-8904",
                website: "sarahwilson.blog",
                address: "321 Elm St, Austin, TX",
                company: "Marketing Solutions",
                bio: "Digital marketing strategist with expertise in social media, content creation, and data-driven marketing campaigns."
            }
        ];

        // Custom Router Implementation
        class Router {
            constructor() {
                this.routes = {};
                this.currentRoute = '/';
                this.params = {};
                this.init();
            }

            init() {
                // Handle browser back/forward buttons
                window.addEventListener('popstate', (event) => {
                    if (event.state && event.state.route) {
                        this.handleRoute(event.state.route, false);
                    }
                });

                // Initial route
                this.handleRoute(window.location.pathname || '/');
            }

            // Simulate useParams hook
            useParams() {
                return this.params;
            }

            navigate(path, pushState = true) {
                this.handleRoute(path, pushState);
            }

            handleRoute(path, pushState = true) {
                this.currentRoute = path;
                this.params = {};

                // Update browser URL
                if (pushState) {
                    history.pushState({ route: path }, '', path);
                }

                // Update active nav link
                this.updateActiveNavLink(path);

                // Route matching
                if (path === '/' || path === '') {
                    this.showPage('home');
                } else if (path === '/users') {
                    this.showPage('users');
                    this.renderUsersList();
                } else if (path.startsWith('/users/')) {
                    // Extract user ID from URL (simulating :id parameter)
                    const userId = path.split('/users/')[1];
                    this.params = { id: userId };
                    this.showPage('user-detail');
                    this.renderUserDetail(userId);
                } else {
                    this.showPage('not-found');
                }
            }

            showPage(pageId) {
                // Hide all pages
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });

                // Show target page
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.classList.add('active');
                }
            }

            updateActiveNavLink(path) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    const route = link.getAttribute('data-route');
                    if (route === path || (route === '/users' && path.startsWith('/users'))) {
                        link.classList.add('active');
                    }
                });
            }

            renderUsersList() {
                const usersGrid = document.getElementById('users-grid');
                usersGrid.innerHTML = '';

                mockUsers.forEach(user => {
                    const userCard = document.createElement('div');
                    userCard.className = 'user-card';
                    userCard.onclick = () => this.navigate(`/users/${user.id}`);
                    
                    userCard.innerHTML = `
                        <div class="user-header">
                            <div class="user-avatar">${user.name.charAt(0)}</div>
                            <div class="user-info">
                                <h3>${user.name}</h3>
                                <p>${user.company}</p>
                            </div>
                        </div>
                        <div class="user-details">
                            <div class="user-detail">
                                <span class="icon">📧</span>
                                ${user.email}
                            </div>
                            <div class="user-detail">
                                <span class="icon">📍</span>
                                ${user.address}
                            </div>
                        </div>
                        <div class="user-bio">
                            ${user.bio}
                        </div>
                    `;
                    
                    usersGrid.appendChild(userCard);
                });
            }

            async renderUserDetail(userId) {
                const content = document.getElementById('user-detail-content');
                
                // Show loading state
                content.innerHTML = `
                    <div class="loading">
                        <div class="loading-spinner"></div>
                        <p>Loading user details...</p>
                        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">Fetching user ID: ${userId}</p>
                    </div>
                `;

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 800));

                const user = mockUsers.find(u => u.id === parseInt(userId));

                if (!user) {
                    content.innerHTML = `
                        <div class="error">
                            <div class="error-icon">👤</div>
                            <h2>User Not Found</h2>
                            <p>User with ID ${userId} not found</p>
                            <p style="font-size: 0.9rem; color: #666;">Requested ID: ${userId}</p>
                            <div class="error-actions">
                                <button class="btn" onclick="router.navigate('/users')">View All Users</button>
                                <button class="btn btn-secondary" onclick="router.navigate('/')">Go Home</button>
                            </div>
                        </div>
                    `;
                    return;
                }

                // Render user profile
                content.innerHTML = `
                    <div class="user-profile">
                        <div class="profile-header">
                            <div class="profile-avatar">${user.name.charAt(0)}</div>
                            <h1>${user.name}</h1>
                            <p>ID: ${user.id}</p>
                        </div>
                        
                        <div class="profile-content">
                            <div class="profile-grid">
                                <div class="profile-section">
                                    <h3>Contact Information</h3>
                                    <div class="profile-item">
                                        <div class="icon">📧</div>
                                        <div class="profile-item-content">
                                            <p>Email</p>
                                            <p>${user.email}</p>
                                        </div>
                                    </div>
                                    <div class="profile-item">
                                        <div class="icon">📞</div>
                                        <div class="profile-item-content">
                                            <p>Phone</p>
                                            <p>${user.phone}</p>
                                        </div>
                                    </div>
                                    <div class="profile-item">
                                        <div class="icon">🌐</div>
                                        <div class="profile-item-content">
                                            <p>Website</p>
                                            <p style="color: #667eea;">${user.website}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="profile-section">
                                    <h3>Professional Details</h3>
                                    <div class="profile-item">
                                        <div class="icon">🏢</div>
                                        <div class="profile-item-content">
                                            <p>Company</p>
                                            <p>${user.company}</p>
                                        </div>
                                    </div>
                                    <div class="profile-item">
                                        <div class="icon">📍</div>
                                        <div class="profile-item-content">
                                            <p>Address</p>
                                            <p>${user.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="profile-bio">
                                <h3>Biography</h3>
                                <p>${user.bio}</p>
                            </div>
                            
                            <div class="route-info">
                                <h4>Route Information</h4>
                                <p><strong>Current Route:</strong> <code>/users/${userId}</code></p>
                                <p><strong>Extracted Parameter:</strong> <code>id = ${userId}</code></p>
                                <p><strong>useParams() result:</strong> <code>${JSON.stringify(this.useParams())}</code></p>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Initialize router
        const router = new Router();

        // Example of accessing route parameters (similar to useParams)
        function getCurrentParams() {
            return router.useParams();
        }

        // Example usage in console
        console.log('Router initialized. Try these commands in console:');
        console.log('router.navigate("/users/1")');
        console.log('router.navigate("/users")');
        console.log('getCurrentParams() // Get current route parameters');
