
$(window).on("hashchange", function () {
	if (location.hash.slice(1) == "signup") {
		$(".page").addClass("extend");
		$("#login").removeClass("active");
		$("#signup").addClass("active");
	} else {
		$(".page").removeClass("extend");
		$("#login").addClass("active");
		$("#signup").removeClass("active");
	}
});
$(window).trigger("hashchange");

function validateLoginForm() {
	var name = document.getElementById("logName").value;
	var password = document.getElementById("logPassword").value;

	if (name == "" || password == "") {
		document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
		return false;
	}

	else if (password.length < 8) {
		document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
		return false;
	}
	else {
		alert("Successfully logged in");
		return true;
	}
}
// ... (your existing JavaScript code) ...

function validateSignupForm() {
    var mail = document.getElementById("signEmail").value;
    var name = document.getElementById("signName").value;
    var password = document.getElementById("signPassword").value;

    if (mail == "" || name == "" || password == "") {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields";
        return false;
    } else if (password.length < 8) {
        document.getElementById("errorMsg").innerHTML = "Your password must include at least 8 characters";
        return false;
    } else {
        // Removed the alert here, as we will handle the success in the AJAX function
        return true;
    }
}

$(document).ready(function() {
    $(".login").submit(function(e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr("action");
        var formData = form.serialize();

        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            dataType: "json",
			success: function(data) {
				console.log("Response from server:", data);
			
				if (data.status === "success") {
					console.log("Login successful. Redirecting...");
					window.location.href = "index.html";
				} else {
					console.log("Login failed. Error message:", data.message);
					document.getElementById("errorMsg").innerHTML = data.message;
				}
			},
			
            error: function() {
                // Error occurred during AJAX request
                alert("An error occurred. Please try again.");
            }
        });
    });
});

$(document).ready(function() {
    $(".signup-form").submit(function(e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr("action");
        var formData = form.serialize();

        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            dataType: "json",
            success: function(data) {
                if (data.status === "success") {
                    // Signup successful, do something (optional)
                    alert("Signup successful");
                } else {
                    // Signup failed, show error message
                    document.getElementById("errorMsg").innerHTML = data.message;
                }
            },
            error: function() {
                // Error occurred during AJAX request
                alert("An error occurred. Please try again.");
            }
        });
    });
});
