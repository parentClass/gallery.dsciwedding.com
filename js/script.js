window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
});

function uploadImages(e) {
    alert("please wait")

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
            if(j.ceremony.success.length > 0) {
                j.ceremony.success.map(element => {
                    $("#ceremony-success-list").append('<li>' + element + '</li>')
                })

                $("#ceremony-success").slideDown();
            }

            if(j.ceremony.failed.length > 0) {
                j.ceremony.failed.map(element => {
                    $("#ceremony-failed-list").append('<li>' + element + '</li>')
                })
                
                $("#ceremony-failed").slideDown();
            }

            // reception
            if(j.reception.success.length > 0) {
                j.reception.success.map(element => {
                    $("#reception-success-list").append('<li>' + element + '</li>')
                })

                $("#reception-success").slideDown();
            }

            if(j.reception.failed.length > 0) {
                j.reception.failed.map(element => {
                    $("#reception-failed-list").append('<li>' + element + '</li>')
                })
                
                $("#reception-failed").slideDown();
            }

            // after party
            if(j.afterparty.success.length > 0) {
                j.afterparty.success.map(element => {
                    $("#afterparty-success-list").append('<li>' + element + '</li>')
                })

                $("#afterparty-success").slideDown();
            }

            if(j.afterparty.failed.length > 0) {
                j.afterparty.failed.map(element => {
                    $("#afterparty-failed-list").append('<li>' + element + '</li>')
                })
                
                $("#afterparty-failed").slideDown();
            }

            setTimeout(function() {
                $("#ceremony-success").slideUp("slow");
                $("#reception-success").slideUp("slow");
                $("#afterparty-success").slideUp("slow");
                $("#ceremony-failed").slideUp("slow");
                $("#reception-failed").slideUp("slow");
                $("#afterparty-failed").slideUp("slow");
                document.querySelector('#ceremonyFile').value = '';
                document.querySelector('#receptionFile').value = '';
                document.querySelector('#afterPartyFile').value = '';
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