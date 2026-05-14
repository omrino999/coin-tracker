// in this file I want to manage the data i fetched/should fetch (inspired from react&redux)
// here ill also use assistant variables/methods. i.e. limit on 5 fav coins, 2 minutes cooldown between more info etc...
const AppState = {
    allCoins: [],
    displayedCoins: [],
    selectedCoins: [],
    coinCache: {},
    currentPage: 'home',
    chartInterval: null,
    
    setAllCoins(coins) {
        this.allCoins = coins;
        this.displayedCoins = coins;
    },
    
    addSelectedCoin(coinId) {
        if (this.selectedCoins.length >= 5) {
            return false;
        }
        if (!this.selectedCoins.includes(coinId)) {
            this.selectedCoins.push(coinId);
        }
        return true;
    },
    
    removeSelectedCoin(coinId) {
        this.selectedCoins = this.selectedCoins.filter(id => id !== coinId);
    },
    
    getCachedCoinInfo(coinId) {
        const cached = this.coinCache[coinId];
        if (!cached) return null;
        
        const twoMinutes = 2 * 60 * 1000;
        const now = Date.now();
        
        if (now - cached.timestamp < twoMinutes) {
            return cached.data;
        }
        return null;
    },
    
    setCachedCoinInfo(coinId, data) {
        this.coinCache[coinId] = {
            data: data,
            timestamp: Date.now()
        };
    },
    
    filterCoins(searchTerm) {
        if (!searchTerm) {
            this.displayedCoins = this.allCoins; // show all
            return;
        }
        
        this.displayedCoins = this.allCoins.filter(coin => 
            coin.symbol.toLowerCase() === searchTerm.toLowerCase()
        );
    }
};