const Components = {
  // create  search bar and filters
  createSearchBar() {
    const searchBar = $(`
            <div class="search-container mb-4">
                <div class="row">
                    <div class="col-md-5">
                        <input type="text" id="coin-search" class="form-control" 
                               placeholder="Search by symbol (e.g., BTC)">
                    </div>
                    <div class="col-md-2">
                        <button id="search-btn" class="btn btn-primary w-100">Search</button>
                    </div>
                    <div class="col-md-2">
                        <button id="show-all-btn" class="btn btn-secondary w-100">Show All</button>
                    </div>
                    <div class="col-md-3">
                        <div class="form-check mt-2">
                            <input type="checkbox" id="show-selected-only" class="form-check-input">
                            <label class="form-check-label" for="show-selected-only">
                                Show Selected Only
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `);

    // search button click event
    searchBar.find("#search-btn").on("click", function () {
      const searchTerm = $("#coin-search").val().trim();

      // uncheck box when searching
      $("#show-selected-only").prop("checked", false);

      AppState.filterCoins(searchTerm);
      Pages.renderCoins();
    });

    // show all button
    searchBar.find('#show-all-btn').on('click', function() {
        // Clear search input
        $('#coin-search').val('');
        
        $('#show-selected-only').prop('checked', false);
        
        // Reset to show all coins
        AppState.displayedCoins = AppState.allCoins;
        Pages.renderCoins();
    });

    // enter key for search box like in exam 2
    searchBar.find("#coin-search").on("keypress", function (e) {
      if (e.which === 13) {
        $("#search-btn").click();
      }
    });

    // show selected only checkbox
    searchBar.find("#show-selected-only").on("change", function () {
      if ($(this).is(":checked")) {
        // filter to show favorites
        AppState.displayedCoins = AppState.allCoins.filter((coin) =>
          AppState.selectedCoins.includes(coin.id)
        );
      } else {
        // back to all coins
        AppState.displayedCoins = AppState.allCoins;
      }
      Pages.renderCoins();
    });

    return searchBar;
  },

  // create a single coin card
  createCoinCard(coin) {
    const isSelected = AppState.selectedCoins.includes(coin.id);

    const card = $(`
            <div class="col-md-4 col-lg-3 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${coin.symbol.toUpperCase()}</h5>
                        <p class="card-text">${coin.name}</p>
                        
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input toggle-coin" 
                                   type="checkbox" 
                                   id="toggle-${coin.id}"
                                   ${isSelected ? "checked" : ""}>
                            <label class="form-check-label" for="toggle-${
                              coin.id
                            }">
                                Add to Reports
                            </label>
                        </div>
                        
                        <button class="btn btn-primary btn-sm w-100 btn-more-info">
                            More Info
                        </button>
                        
                        <div class="collapse mt-3" id="info-${coin.id}">
                            <div class="card card-body">
                                <div class="text-center">
                                    <div class="spinner-border spinner-border-sm" role="status"></div>
                                    <p class="mb-0">Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

    // add & remove from favorites
    card.find(".toggle-coin").on("change", function () {
      const coinId = coin.id;

      if ($(this).is(":checked")) {
        // try to add coin
        const success = AppState.addSelectedCoin(coinId);

        if (!success) {
          // if didnt suceed pop modal to remove 1 coin from favs
          $(this).prop("checked", false);
          Components.showSelectionModal(coinId);
        }
      } else {
        // if unchecked -> removed from favs
        AppState.removeSelectedCoin(coinId);
      }
    });

    // more info button
    card.find(".btn-more-info").on("click", async function () {
      const collapseDiv = card.find(`#info-${coin.id}`);

      // toggle more info
      if (collapseDiv.hasClass("show")) {
        collapseDiv.collapse("hide");
        return;
      }

      // spinner
      collapseDiv.collapse("show");

      Utils.showProgress();
      const coinData = await API.getCoinInfo(coin.id);
      Utils.hideProgress();

      if (coinData) {
        Components.renderCoinInfo(collapseDiv.find(".card-body"), coinData);
      } else {
        collapseDiv
          .find(".card-body")
          .html('<p class="text-danger">Failed to load data</p>');
      }
    });

    return card;
  },

  // Render coin detailed info inside the collapse
  renderCoinInfo(container, coinData) {
    // Get prices
    const usd = coinData.market_data.current_price.usd;
    const eur = coinData.market_data.current_price.eur;
    const ils = coinData.market_data.current_price.ils;

    // Build HTML
    const infoHtml = `
            <div class="coin-details text-center">
                <img src="${coinData.image.small}" alt="${
      coinData.name
    }" class="mb-2">
                <p class="mb-1"><strong>USD:</strong> ${Utils.formatCurrency(
                  usd,
                  "USD"
                )}</p>
                <p class="mb-1"><strong>EUR:</strong> ${Utils.formatCurrency(
                  eur,
                  "EUR"
                )}</p>
                <p class="mb-0"><strong>ILS:</strong> ${Utils.formatCurrency(
                  ils,
                  "ILS"
                )}</p>
            </div>
        `;

    container.html(infoHtml);
  },

  // more than 5 coisn modal
  showSelectionModal(newCoinId) {
    const modal = $("#selection-modal");

    const modalContent = `
            <div class="modal-header">
                <h5 class="modal-title">Maximum Coins Selected</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>You can only select up to 5 coins for live reports.</p>
                <p>Please remove one of the following coins:</p>
                <div id="selected-coins-list"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
        `;

    modal.find(".modal-content").html(modalContent);

    // Add list of selected coins
    const listContainer = modal.find("#selected-coins-list");

    AppState.selectedCoins.forEach((coinId) => {
      const coin = AppState.allCoins.find((c) => c.id === coinId);

      const item = $(`
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="coinToRemove" value="${coinId}">
                    <label class="form-check-label">
                        ${coin.symbol.toUpperCase()} - ${coin.name}
                    </label>
                </div>
            `);

      
      item.find("input").on("change", function () {
        // remove old
        AppState.removeSelectedCoin(coinId);

        // add new 
        AppState.addSelectedCoin(newCoinId);
        Pages.renderCoins();

        const bsModal = bootstrap.Modal.getInstance(modal[0]);
        bsModal.hide();
      });

      listContainer.append(item);
    });

    const bsModal = new bootstrap.Modal(modal[0]);
    bsModal.show();
  },
};