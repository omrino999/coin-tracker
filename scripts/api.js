//this file will be used for standardizing api related functions

const API = {
    BASE_URL: 'https://api.coingecko.com/api/v3',
    CRYPTO_COMPARE: 'https://min-api.cryptocompare.com/data',
    
    async getAllCoins() {
    try {
        const response = await $.ajax({
            url: `${this.BASE_URL}/search/trending`,
            method: 'GET'
        });
        
        // destructure
        const coins = response.coins.map(item => ({
            id: item.item.id,
            symbol: item.item.symbol,
            name: item.item.name
        }));
        
        console.log('Fetched trending coins:', coins.length);
        return coins;
    } catch (error) {
        console.error('Error fetching coins:', error);
        return [];
    }
},
    
    async getCoinInfo(coinId) {
        const cached = AppState.getCachedCoinInfo(coinId);
        if (cached) {return cached;}
        
        try {
            const response = await $.ajax({
                url: `${this.BASE_URL}/coins/${coinId}`,
                method: 'GET'
            });
            
            AppState.setCachedCoinInfo(coinId, response);
            return response;
            
        } catch (error) {
            return null;
        }
    },
    
    async getMultiplePrices(coinSymbols) {
        try {
            const symbols = coinSymbols.join(',');
            const response = await $.ajax({
                url: `${this.CRYPTO_COMPARE}/pricemulti`,
                method: 'GET',
                data: {
                    //from symbols to symbols
                    fsyms: symbols,
                    tsyms: 'USD'
                }
            });
            return response;
        } catch (error) {
            return null;
        }
    }
};