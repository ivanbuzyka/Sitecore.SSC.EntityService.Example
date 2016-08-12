var logIn = function (uname, pwd, callback) {

    var credentials = { domain: "sitecore", username: uname, password: pwd };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sc81ssc1/sitecore/api/ssc/auth/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this);
            //alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText); 
        }
    };

    xhr.send(JSON.stringify(credentials));

            //COMMENT: another option to run logIn, using jQuery
            /*$.ajax(
                {
                    type: "POST",
                    url: "https://sc81ssc1/sitecore/api/ssc/auth/login", 
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(credentials),//"{ 'domain': 'sitecore', 'username': '" + uname + "', 'password': '" + pwd + "' }",
                    dataType: "json",                     
                    success: function () {                      
                                            
                    },                    
                });*/

}


var logOut = function () {

    $.ajax({
        type: "POST",
        url: "https://sc81ssc1/sitecore/api/ssc/auth/logout",
        success: function() {
            console.log("Logout. Success.");
        }
    });

    //var xhr = new XMLHttpRequest();
    //xhr.open("POST", "https://sc81ssc1/sitecore/api/ssc/auth/logout");
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
        .click(function() {
            logOut();
        });

    $("#testEntity")
        .click(function() {
            $.ajax(
            {
                type: "GET",
                url: "https://sc81ssc1/sitecore/api/ssc/Sitecore-SSC-EntityServicesExammple-Controllers/TestEntity",
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
});