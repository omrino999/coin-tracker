const Utils = {
  showProgress() {
    const progressBar = $("#progress-bar");
    if (progressBar.length === 0) {
      $("body").append(`
                <div id="progress-bar" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    z-index: 9999;
                "></div>
            `);
    } else {
      progressBar.show();
    }
  },

  hideProgress() {
    $("#progress-bar").fadeOut(500);
  },

  formatCurrency(value, currency) {
    const symbols = {
      USD: "$",
      EUR: "€",
      ILS: "₪",
    };

    //formats price+limit on length after point in price
    const formatted = value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `${symbols[currency]}${formatted}`;
  },

  showError(message) {
    const errorDiv = $(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert" style="
                position: fixed;
                top: 70px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
            ">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

    $("body").append(errorDiv);

    setTimeout(() => {
      errorDiv.fadeOut(300, function () {
        $(this).remove();
      });
    }, 5000);
  },

  showSuccess(message) {
    const successDiv = $(`
            <div class="alert alert-success alert-dismissible fade show" role="alert" style="
                position: fixed;
                top: 70px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
            ">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

    $("body").append(successDiv);

    setTimeout(() => {
      successDiv.fadeOut(300, function () {
        $(this).remove();
      });
    }, 3000);
  },
};
