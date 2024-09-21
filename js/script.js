window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
});

function uploadImages(e) {
    alert("Thank you for sharing your photo!")

    // show loader
    document.querySelector(".loader").classList.remove("hidden");

    // block form submit
    e.preventDefault();

    const form = document.getElementById('uploadForm');
    const data = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.dsciwedding.com/gallery/upload', true);

    xhr.onload = function() {
        // hide loader
        document.querySelector(".loader").className += " hidden";
        
        if (xhr.status === 200) {
            // Upload successful
            j = JSON.parse(xhr.response);

            // ceremony
            if(j.success.length > 0) {
                j.ceremony.success.map(element => {
                    $("#wedding-success-list").append('<li>' + element + '</li>')
                })

                $("#wedding-success").slideDown();
            }

            if(j.failed.length > 0) {
                j.ceremony.failed.map(element => {
                    $("#wedding-failed-list").append('<li>' + element + '</li>')
                })
                
                $("#wedding-failed").slideDown();
            }

            setTimeout(function() {
                $("#wedding-success").slideUp("slow");
                $("#wedding-failed").slideUp("slow");
                document.querySelector('#weddingFile').value = '';
            }, 5000);
        } else {
            // Error during upload
            alert("Sorry, there seems to be a problem with our image upload.");
            location.reload();
        }
    };

    xhr.onerror = function(e) {
        // show loader
        document.querySelector(".loader").className += " hidden";

        j = JSON.parse(e);
        
        alert(e.message);
    };

    xhr.send(data);
}