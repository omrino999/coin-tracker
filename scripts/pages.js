const Pages = {
    
    // render any page+change navbar css
    render(pageName) {
        AppState.currentPage = pageName;
        
        $('#navbar a').removeClass('active');
        $(`#nav-${pageName}`).addClass('active');
        
        if (pageName === 'home') {
            this.renderHome();
        } else if (pageName === 'reports') {
            this.renderReports();
        } else if (pageName === 'about') {
            this.renderAbout();
        }
    },
    
    renderHome() {
        const content = $('#app-content');
        content.empty();
        content.append(Components.createSearchBar());
        content.append('<div id="coins-container" class="row"></div>');
        this.renderCoins();
    },
    
    renderCoins() {
        const container = $('#coins-container');
        container.empty();
    
        if (AppState.displayedCoins.length === 0) {
            container.html(`
                <div class="col-12 text-center py-5">
                    <h3>No coins found</h3>
                    <p>Try a different search term</p>
                </div>
            `);
            return;
        }
        
        AppState.displayedCoins.forEach(coin => {
            const card = Components.createCoinCard(coin);
            container.append(card);
        });
    },
    
    // ended up not doing the bonus task...
    renderReports() {
        const content = $('#app-content');
        content.empty();
        
        content.append(`
            <div class="reports-page">
                <h2 class="mb-4">Live Reports</h2>
                
                
                <p>Work in progress...</p>
            </div>
        `);
    },
    
    renderAbout() {
        const content = $('#app-content');
        content.empty();
        
        content.append(`
            <div class="about-page">
                <div class="row">
                    <div class="col-md-4 text-center mb-4">
                        <h3>Made by Omri Shitrit</h3>
                        <p class="text-muted">Full Stack Developer</p>
                    </div>
                    <div class="col-md-8">
                        <h2 class="mb-3">About This Project</h2>
                        <p>
                            This is a cryptocurrency tracking front-end application app. Built as Project #2
                            for John Bryce.
                        </p>
                        
                        <h4 class="mt-4">Technologies Used:</h4>
                        <ul>
                            <li>HTML5 & CSS3</li>
                            <li>JavaScript </li>
                            <li>jQuery & AJAX</li>
                            <li>Bootstrap 5</li>
                            <li>RESTful APIs (CoinGecko, CryptoCompare)</li>
                        </ul>
                        
                        <h4 class="mt-4">Features:</h4>
                        <ul>
                            <li>Displays 15 trending cryptocurrencies</li>
                            <li>Search by coin symbol</li>
                            <li>View detailed coin information</li>
                            <li>Select up to 5 coins for tracking</li>
                            <li>Responsive design (Desktop, Tablet, Mobile)</li>
                            <li>Client-side caching for 'More Info'(2-minute cache)</li>
                        </ul>
                    </div>
                </div>
            </div>
        `);
    }
};