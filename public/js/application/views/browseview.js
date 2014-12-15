(function (window, document, $) {
    // make a backbone view
    var BrowseView;
    BrowseView = Backbone.View.extend({
        // the tagname for this view's element
        tagname: "div",

        // what to do on initialization
        initialize: function () {
            // a little trick to use proper scoping
            (function (_this) {
                $.get('/browse-view', function (data) {
                    $(_this.el).html(data);
                    //make an API request to populate
                    // stock table

                    _this.makeBrowseStocksTable([{id: 100, name: 'test', price: 100}]);

                    // close the new game form
                    $("#add-stock-form", $(_this.el)).hide();
                });
            })(this);

            //TODO: activate when API works and can reach port 7021
            //this.retrieveCommonStockData();
        },

        //add test id, stockname, price table and sort by most popular
        makeBrowseStocksTable: function (browseStocks) {
            var tbody = $("tbody", $("#browseStocks"));

            var ID, Name, Price, tr;
            // make a new row for each stock
            for (var i = 0; i < browseStocks.length; i++) {
                ID = document.createElement('td');
                Name = document.createElement('td');
                Price = document.createElement('td');
                tr = document.createElement('tr');
                ID.innerText = browseStocks[i].symbol;
                Name.innerText = browseStocks[i].name;
                Price.innerText = browseStocks[i].price;

                // add it to the table
                tr.appendChild(ID);
                tr.appendChild(Name);
                tr.appendChild(Price);
                tbody[0].appendChild(tr);
            }
        },

        // limit the table to show 10 records at a time
        makeTableScroll: function (browseStocks) {
            var maxRows = 10;
            var table = document.getElementById('browseStocks');
            var rowsInTable = browseStocks.rows.length;
            var height = 0;

            if (rowsInTable > maxRows) {
                for (var i = 0; i < maxRows; i++) {
                    height += table.rows[i].clientHeight;
                }
                wrapper.style.height = height + "px";
            }
        },

        // when user clicks row, display add stock form

        /*$(function(){
         $('#browseStocks').next().click(function(){
         $(this).hide();
         var $result = $('#add-stock-form');
         $('#browseStocks').bootstrapTable({
         }).on('click-row.bs.table', function(e, row, $element) {
         $result.text('Event:click-row.bs.table, data: ' + JSON.stringify(row));
         })
         })
         }),*/




        // open the add stock form
        addStock: function (e) {
            // open the form
            $("#add-stock-form", $(this.el)).slideDown();
        },

        // close the add stock form and clear the inputs
        cancelGame: function () {
            var form = $("#add-stock-form", $(this.el));
            // close the form
            form.slideUp();

            // clear the form
            $('input', form).val("");

            //add a listener for each row to have something called hidden
            // and if each substring doesn't match the ID, hide the row
            // and then all that's left is to submit a GET request
            // to the API
        },

        retrieveAStock: function (stockId) {
            //TODO: activate when API requests work to reach stock server on port 7021
            //new Application.Services.APIRequestService({
            //    // type of request
            //    'type': "GET",
            //    // endpoint for the API to hit
            //    'uri': "/stock/"+stockId,
            //    // callback function for the request
            //    'callback': function (data) {
            //        // append the data to browseview
            //        // instead of asking for new data from the server
            //        data = JSON.parse(data);
            //        this.makeBrowseStocksTable(data);
            //    }
            //});
        },

        retrieveCommonStockData: function () {
            //TODO: activate when API requests work to reach stock server on port 7021
            //new Application.Services.APIRequestService({
            //    // type of request
            //    'type': "GET",
            //    // endpoint for the API to hit
            //    'uri': "/commonStocks/stock",
            //    // callback function for the request
            //    'callback': function (data) {
            //        // append the data to browseview
            //        // instead of asking for new data from the server
            //        data = JSON.parse(data);
            //        this.makeBrowseStocksTable(data);
            //    }
            //});

            // todo: when user clicks on a a stock,
            // have the div slide down and let them have the option
            // to add it to their portfolio for a specific game
            //(have a drop down of the games they're currently in)*/
        },


        // todo: when user clicks on a a stock,
        // have the div slide down and let them have the option
        // to add it to their portfolio for a specific game
        //(have a drop down of the games they're currently in)*/


        // set up the events
        events: {
            'click #cancel': 'cancel',
            'click #submit': 'submit',
            'click #browseStocks > tbody > tr': 'addStock'
        },


    });

    // assign it to the global scope
    window.Application.Views.BrowseView = BrowseView;
})(window, document, jQuery, undefined);






