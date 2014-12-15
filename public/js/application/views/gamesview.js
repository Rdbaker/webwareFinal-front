(function (window, document, $) {
    // make a backbone view
    var GamesView = Backbone.View.extend({
        // the tagname for this view's element
        tagname: "div",

        // what to do on initialization
        initialize: function () {
            // a little trick to use proper scoping
            (function (_this) {
                $.get('/games-view', function (data) {
                    $(_this.el).html(data);
                    // make an API services request to get
                    // the games for the user
                    // then make a table from it
                    _this.makeTableFromGames([{name: 'test', val: 100}]);

                    // close the new game form
                    $("#new-game-form", $(_this.el)).hide();
                });
            })(this);
        },

        // make a table from the game names for the user
        makeTableFromGames: function (games) {
            // get the table body
            var tbody = $("tbody", $("#games"));

            var td1, td2, tr;
            // for each game name
            for (var i = 0; i < games.length; i++) {
                // make a new row
                tr = document.createElement('tr');
                td1 = document.createElement('td');
                td2 = document.createElement('td');
                td1.innerText = games[i].name;
                td2.innerText = games[i].val;

                // append it to the table
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody[0].appendChild(tr);
            }
        },

        // open the newGame form
        newGame: function () {
            // open the form
            $("#new-game-form", $(this.el)).slideDown();
        },

        // close the newGame form and clear the inputs
        cancelGame: function () {
            var form = $("#new-game-form", $(this.el));
            // close the form
            form.slideUp();

            // clear the form
            $('input', form).val("");
        },

        // create the game
        createGame: function () {
            // validate the form
            var good = this.validateForm();

            if (good) {
                // send the game information to the server
                // in an API service request

                // close and clear the form
                this.cancelGame();
            }
        },

        // validate the newGame form
        validateForm: function () {
            // get the input fields
            var gameName = $("#game-name");

            // the regex for usernames and for game names
            var re = /^\w$/;

            // test the game name
            var good = re.test(gameName.val());

            // if the game name isn't good, let the user know
            if (!good) {
                $("#game-name-group").addClass('has-error');
            } else {
                $("#game-name-group").removeClass('has-error');
            }

            // check each of the usernames

            // return the validation result
            return good;
        },

        // get the game's info and change its color on a click
        getGameInfo: function (e) {
            // remove any already chosen row
            $('#warning', $('tbody', $(this.el))).removeClass('warning');

            // add it to the clicked row
            $(e.currentTarget).addClass('warning');


            // retrieve the info for the game
            this.retrieveLeaderBoardData(e);
            this.retrieveMyStockPortfolioData(e);

        },
        retrieveLeaderBoardData: function (gamename) {

            // TODO: create an API request service caller, review end point
            //var gameNameTxt = gamename.currentTarget.childNodes[0].innerText;
            //new Application.Services.APIRequestService({
            //    // type of request
            //    'type': "GET",
            //    // endpoint for the API to hit
            //    'uri': "/"+gameNameTxt + "/leaderboard",
            //    // callback function for the request
            //    'callback': function (data) {
            //        // append the data to Leader board table
            //        // instead of asking for new data from the server
            //
            //        data = JSON.parse(data);
            //        var tbody = $("tbody", $('#leaderboard-view'));
            //        var username, networth, row;
            //        for (var i = 0; i < data.length; i++) {
            //            // create the row and data for the row
            //            row = document.createElement("tr");
            //            username = document.createElement("td");
            //            networth = document.createElement("td");
            //
            //            // put the content in the row
            //            $(username).text(data[i].username);
            //            $(networth).text(data[i].networth);
            //
            //            // append the content to the row
            //            row.appendChild(username);
            //            row.appendChild(networth);
            //
            //            // append the row to the body
            //            tbody.append(row);
            //        }
            //    }
            //
            //});

        },

        retrieveMyStockPortfolioData: function (gamename) {

            // TODO: create an API request service caller, review end points
            //var gameNameTxt = gamename.currentTarget.childNodes[0].innerText;
            //new Application.Services.APIRequestService({
            //    // type of request
            //    'type': "GET",
            //    // endpoint for the API to hit
            //    'uri': "/"+gameNameTxt + "/stocks",
            //    // callback function for the request
            //    'callback': function (data) {
            //        // append the data to Leader board table
            //        // instead of asking for new data from the server
            //
            //        data = JSON.parse(data);
            //        var tbody = $("tbody", $('#user-stock-view'));
            //        var stockName, NumOwned, CostperShare, BuySell, row;
            //        for (var i = 0; i < data.length; i++) {
            //            // create the row and data for the row
            //            row = document.createElement("tr");
            //            stockName = document.createElement("td");
            //            NumOwned = document.createElement("td");
            //            CostperShare = document.createElement("td");
            //
            //            // put the content in the row
            //            $(stockName).text(data[i].stockName);
            //            $(NumOwned).text(data[i].NumOwned);
            //            $(CostperShare).text(data[i].CostperShare);
            //            $(BuySell).text(data[i].BuySell);
            //
            //            // append the content to the row
            //            row.appendChild(stockName);
            //            row.appendChild(NumOwned);
            //            row.appendChild(CostperShare);
            //
            //            // append the row to the body
            //            tbody.append(row);
            //        }
            //    }
            //
            //});

        },


        // set up the events
        events: {
            'click #game-btn': 'newGame',
            'click #cancel-game': 'cancelGame',
            'click #create-game': 'createGame',
            'click #games > tbody > tr': 'getGameInfo'
        },


    });

    // assign it to the global scope
    window.Application.Views.GamesView = GamesView;
})(window, document, jQuery, undefined);
