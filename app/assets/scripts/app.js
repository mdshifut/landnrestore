import 'jquery';
// import PopperJs from 'popper.js';
import 'owl.carousel';
// import 'bootstrap';


// Homepage slider
$('.hero-slider').owlCarousel({
    items: 1,
    nav: false,
    loop: true,
    autoplay: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut'
});



// Contact form
$("#contact").on("submit", function(e) {
    e.preventDefault();
    $("#send-button").disabled = true;
    $("#send-button").val('Please wait ...');

    var formdata = new FormData();


    formdata.append("name", $("#name").val());
    formdata.append("email", $("#email").val());
    formdata.append("subject", $("#subject").val());
    formdata.append("phone", $("#phone").val());
    formdata.append("address", $("#address").val());
    formdata.append("message", $("#message").val());





    var ajax = new XMLHttpRequest();
    ajax.open("POST", "send.php");
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            if (ajax.responseText == "success") {
                $("#send-button").val('Send');
                $("#send-button").after("<p class='status green'>Thanks " + $("#name").val() + ", your message has been sent.We will contact you ASAP.</p>");
                $("p.status").fadeIn();
                $("#name").val("");
                $("#email").val("");
                $("#subject").val("");
                $("#phone").val("");
                $("#address").val("");
                $("#message").val("")
                setTimeout(function() {

                    $('p.status').fadeOut();
                    $("p.status").remove();
                }, 7000);
            } else {
                $("#send-button").after("<p class='status red'>" + ajax.responseText + "</p>");
                $("p.status").fadeIn();
                $("#send-button").disabled = false;
                $("#send-button").val('Send');
                setTimeout(function() {

                    $('p.status').fadeOut();
                    $("p.status").remove();
                }, 7000);

            }
        }
    }
    ajax.send(formdata);

}); //End contact form