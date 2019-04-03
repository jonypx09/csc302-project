$(document).ready(function() {

    $("#create-ticket").click(function() {
        event.preventDefault();

        $.ajax({
            url: "/login",
            type: "GET",
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
});