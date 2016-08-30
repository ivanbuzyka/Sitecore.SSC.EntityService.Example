var hostName = "https://sc81server";

var logIn = function (uname, pwd) {

    //COMMENT: using XMLHttpRequest object
    var credentials = { domain: "sitecore", username: uname, password: pwd };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", hostName + "/sitecore/api/ssc/auth/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this);
        }
    };

    xhr.withCredentials = true;
    xhr.send(JSON.stringify(credentials));

    //COMMENT: alternative option to run logIn, using jQuery
    /*$.ajax(
        {
            type: "POST",
            url: hostName + "/sitecore/api/ssc/auth/login",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(credentials),//"{ 'domain': 'sitecore', 'username': '" + uname + "', 'password': '" + pwd + "' }",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function () {

            },
        });*/

}


var logOut = function () {

    //COMMENT: using jQuery ajax call
    $.ajax({
        type: "POST",
        url: hostName + "/sitecore/api/ssc/auth/logout",
        xhrFields: {
            withCredentials: true
        },
        success: function () {
            console.log("Logout. Success.");
        }
    });

    //COMMENT: alternative option to send request using XMLHttpRequest object
    /*var xhr = new XMLHttpRequest();
    xhr.open("POST", hostName + "/sitecore/api/ssc/auth/logout");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this);
        }
    };

    xhr.withCredentials = true;
    xhr.send();*/
}


$(document).ready(function () {

    $("#logIn").click(function () {

        logIn("admin", "b");
    });

    $("#logOut")
        .click(function () {
            logOut();
        });

    //COMMENT: requesting custom entity service
    $("#testEntity")
        .click(function () {

            //COMMENT: using jQuery ajax call
            $.ajax(
            {
                type: "GET",
                url: hostName + "/sitecore/api/ssc/Sitecore-SSC-EntityServicesExammple-Controllers/TestEntity",
                contentType: "application/json; charset=utf-8",
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                }
            });

            //COMMENT: another option to send request using Sitecore Javascript API
            //IMPORTANT: this option will not work because of impossibility to add "withCredentials: true" header. 
            //    A bug has been registered to the product

            /*var exampleSvc = new EntityService({
                url: hostName + "/sitecore/api/ssc/Sitecore-SSC-EntityServicesExammple-Controllers/TestEntity"
            });
        
            var fetchQuery = exampleSvc.fetchEntities();
            var fetchQueryPromise = fetchQuery.execute().then( function (data) {
                console.log(data[0].Title);               
            });*/
        });

    //COMMENT: requesting item service
    $("#testItem")
        .click(function () {

            //COMMENT: using jQuery ajax call
            $.ajax(
            {
                type: "GET",
                url: hostName + "/sitecore/api/ssc/item/110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9",
                contentType: "application/json; charset=utf-8",
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                }
            });

            //COMMENT: another option to send request using Sitecore Javascript API
            //IMPORTANT: this option will not work because of impossibility to add "withCredentials: true" header. 
            //    A bug has been registered to the product

            /*var exampleItemSvc = new ItemService({
                url: hostName + "/sitecore/api/ssc/item"
            });
        
            var fetchQuery = exampleItemSvc.fetchItem("110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9");
            var fetchQueryPromise = fetchQuery.execute().then( function (data) {
                console.log(data);
            });*/
        });
});