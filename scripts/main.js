$(document).ready(async function() {
    
    // change link's behavior for single page behavior
    $('#nav-home').on('click', function(e) {
        e.preventDefault();
        Pages.render('home');
    });
    
    $('#nav-reports').on('click', function(e) {
        e.preventDefault();
        Pages.render('reports');
    });
    
    $('#nav-about').on('click', function(e) {
        e.preventDefault();
        Pages.render('about');
    });
    
    // prog bar for fetch
    Utils.showProgress();
    
    const coins = await API.getAllCoins();
    
    Utils.hideProgress();
    
    if (coins.length > 0) {
        console.log('Successfully loaded', coins.length, 'coins');
        AppState.setAllCoins(coins);
        
        Pages.render('home');
    } else {
        $('#app-content').html(`
            <div class="alert alert-danger text-center">
                <h4>Failed to load cryptocurrency data</h4>
                <p>Please check your internet connection and try again.</p>
                <button class="btn btn-primary" onclick="location.reload()">Retry</button>
            </div>
        `);
    }
    
    // parallax effect
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('#header').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });
    
    console.log('App ready!');
});