var hostName = "https://sc81ssc";

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

    xhr.send(JSON.stringify(credentials));

    //COMMENT: alternative option to run logIn, using jQuery
    /*$.ajax(
        {
            type: "POST",
            url: hostName + "/sitecore/api/ssc/auth/login", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(credentials),//"{ 'domain': 'sitecore', 'username': '" + uname + "', 'password': '" + pwd + "' }",
            dataType: "json",                     
            success: function () {                      
                                    
            },                    
        });*/

}


var logOut = function () {

    //COMMENT: using jQuery ajax call
    $.ajax({
        type: "POST",
        url: hostName + "/sitecore/api/ssc/auth/logout",
        success: function () {
            console.log("Logout. Success.");
        }
    });

    //COMMENT: alternative option to send request using XMLHttpRequest object
    //var xhr = new XMLHttpRequest();
    //xhr.open("POST", hostName + "/sitecore/api/ssc/auth/logout");
    //xhr.onreadystatechange = function () {
    //    if (this.readyState == 4) {
    //        console.log(this);
    //    }
    //};

    //xhr.send();
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
            /*var exampleSvc = new EntityService({
                url: "sitecore/api/ssc/Sitecore-SSC-EntityServicesExammple-Controllers/TestEntity"
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
            /*$.ajax(
            {
                type: "GET",
                url: hostName + "/sitecore/api/ssc/item/?path=%2Fsitecore%2Fcontent%2Fhome",
                contentType: "application/json; charset=utf-8",
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                }
            });*/

            //COMMENT: another option to send request using Sitecore Javascript API
            var exampleItemSvc = new ItemService({
                url: "sitecore/api/ssc/item"
            });
        
            var fetchQuery = exampleItemSvc.fetchItem("110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9");
            var fetchQueryPromise = fetchQuery.execute().then( function (data) {
                console.log(data);
            });
        });
});