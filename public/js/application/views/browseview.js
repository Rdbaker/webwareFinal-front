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

                    // close the new stock form
                    $("#add-stock-form", $(_this.el)).hide();
                    _this.retrieveCommonStockData();
                    _this.retrieveGameName();
                });
            })(this);
            //TODO: activate when API works and can reach port 7021


        },

        //add test id, stockname, price table and sort by most popular
        makeBrowseStocksTable: function (browseStocks) {
            var tbody = $("tbody", $("#browseStocks"));
            console.log(browseStocks);
            var ID, Name, Price, tr;
            // make a new row for each stock
            for (var i = 0; i < browseStocks.length; i++) {
                ID = document.createElement('td');
                Name = document.createElement('td');
                Price = document.createElement('td');
                tr = document.createElement('tr');
                //add attributes to make modal appear
                $("#browseStocks > tbody > tr").attr('data-toggle', 'modal');
                $("#browseStocks > tbody > tr").attr('data-target', '#modal');

                ID.innerText = browseStocks[i].symbol;
                Name.innerText = browseStocks[i].name;
                if (browseStocks[i].askRealtime != 0) {
                    Price.innerText = browseStocks[i].askRealtime;

                }
                else {
                    Price.innerText = browseStocks[i].bidRealtime;
                }

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

        // open the add stock form
        addStock: function () {
            // open the form
            $("#add-stock-form", $(this.el)).slideDown();
        },

        // close the add stock form and clear the inputs
        cancel: function () {
            var form = $("#add-stock-form", $(this.el));
            // close the form
            form.slideUp('fast');

            // clear the form
            $('input', form).val("");

            //add a listener for each row to have something called hidden
            // and if each substring doesn't match the ID, hide the row
            // and then all that's left is to submit a GET request
            // to the API
        },


        // retrieves a given stock with symbol stockId from port 7021
        /*retrieveAStock: function (stockId) {
         new Application.Services.APIRequestService({
         // type of request
         'port' : "7021",
         'type': "GET",
         // endpoint for the API to hit
         'uri': "/stock/"+stockId,
         // callback function for the request
         'callback': function (data) {
         // append the data to browseview
         // instead of asking for new data from the server
         data = JSON.parse(data);
         this.makeBrowseStocksTable(data);
         }
         });*/
        //},

        // retrieves 200 common stocks from server on port 7021 from yahoo finance api
        retrieveCommonStockData: function () {

            (function (_this) {
                new Application.Services.APIRequestService({
                    'port': "7021",
                    // type of request
                    'type': "GET",
                    // endpoint for the API to hit
                    'uri': "/commonStocks/stock",
                    // callback function for the request
                    'callback': function (data) {
                        // append the data to browseview
                        // instead of asking for new data from the server
                        data = JSON.parse(data);
                        _this.makeBrowseStocksTable(data);
                    }
                });
            })(this);


        },
        // retrives names of games for the user
        retrieveGameName: function () {
            //TODO: activate when API requests work to reach stock server on port 7021
            new Application.Services.APIRequestService({
                //type of request
                'type': "POST",
                // endpoint for the API to hit
                'uri': "/games",
                'data': {'authToken': window.authToken},
                // callback function for the request
                'callback': function (data) {
                    // append the data to dropdown in browseview
                    // instead of asking for new data from the server
                    data = JSON.parse(data);
                    console.log(data);
                    // get an array of game names
                    for (i = 0; i < data.length; i++) {

                        //gameName = [];
                        data[i].gameId;
                        data[i].startvalue;
                        data[i].users;
                        data[i].name;

                        var m = document.createElement('li');
                        m.id = data[i].gameId;
                        $('#stock-group > div > ul')[0].appendChild(m);
                        m.innerText = data[i].name;


                    }

                }
            });

        },

        postNewStocktoGame: function (gameId, stockName) {
            new Application.Services.APIRequestService({
                //type of request
                'type': "POST",
                //endpoint for API to hit
                'uri': "/games/add",
                'data': {
                    'gameId': gameId,
                    'stockName': stockName,
                    'startvalue': "startvalue",
                    'users': "users",
                    'authToken': window.authToken
                }
            })
        },

       selectFromMenu: function(e) {
           // get dropdown menu option and add stock to game
           if (e.target && e.target.nodeName == "li") {
               console.log(e.target.val + "was clicked");
               if (submit) {
                   console.log("inside submit");
               }
           }
       },

        //select option from dropdown menu, submit, and add stock to game
        submit: function(e){
            console.log (e.target.id);
            this.postNewStocktoGame(e.target.id);
        },

        // set up the events
        events: {
            'click #cancel-btn'                 : 'cancel',
            'click #browseStocks > tbody > tr'  : 'addStock',
            'click #stock-group > div > ul > li': 'submit'

        },


    });

    // assign it to the global scope
    window.Application.Views.BrowseView = BrowseView;
})(window, document, jQuery, undefined);


