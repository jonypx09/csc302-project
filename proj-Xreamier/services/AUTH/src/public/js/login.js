$(document).ready(function() {

    $("#user-signin").click(function() {
        event.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            url: "/login",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ "username": username, "password": password }),
            success: function(response) {
                alert("Successfully logged in!");
                window.location.replace("/portal/dashboard");
            },
            error: function(response) {
                alert("Wrong username/password.");
            }
        });
    });


    $("#user-logout").click(function() {
        event.preventDefault();

        $.ajax({
            url: "/logout",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                window.location.replace("/");
            },
            error: function(response) {
                window.location.replace("/");
            }
        });
    });
});