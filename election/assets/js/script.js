function updateClock() {
            const timeEl = document.querySelector("#time");
            const now = new Date();
            
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");

            timeEl.textContent = `${hours}:${minutes}:${seconds}`;
        }

        setInterval(updateClock, 1000);

        updateClock();
        document.querySelectorAll('input.value[type="text"]').forEach(input => {
            input.addEventListener('click', function() {
                this.value = this.value === "X" ? "" : "X";
            });
        });
        document.getElementById("form").addEventListener("submit", function (e) {
          e.preventDefault(); // Prevent the default form submission
          document.getElementById("message").textContent = "กำลังบันทึก...";
          document.getElementById("message").style.display = "block";
          document.getElementById("submit-button").disabled = true;
  
          // Collect the form data
          var formData = new FormData(this);
          var keyValuePairs = [];
          for (var pair of formData.entries()) {
            keyValuePairs.push(pair[0] + "=" + pair[1]);
          }
  
          var formDataString = keyValuePairs.join("&");
  
          // Send a POST request to your Google Apps Script
          fetch(
            "https://script.google.com/macros/s/AKfycby3ndK2LIkcgDHv33i8H40jxCcmSzEyp2489xjoGD48f3lLvV-Vz3SunKvKJVZLJAD_/exec",
            {
              redirect: "follow",
              method: "POST",
              body: formDataString,
              headers: {
                "Content-Type": "text/plain;charset=utf-8",
              },
            }
          )
            .then(function (response) {
              // Check if the request was successful
              if (response) {
                return response; // Assuming your script returns JSON response
              } else {
                throw new Error("Failed to submit the form.");
              }
            })
            .then(function (data) {
              // Display a success message
              document.getElementById("message").textContent =
                "Data submitted successfully!";
              document.getElementById("message").style.display = "block";
              document.getElementById("message").style.backgroundColor = "green";
              document.getElementById("message").style.color = "beige";
              document.getElementById("submit-button").disabled = false;
              document.getElementById("form").reset();
  
              setTimeout(function () {
                document.getElementById("message").textContent = "";
                document.getElementById("message").style.display = "none";
              }, 2600);
            })
            .catch(function (error) {
              // Handle errors, you can display an error message here
              console.error(error);
              document.getElementById("message").textContent =
                "An error occurred while submitting the form.";
              document.getElementById("message").style.display = "block";
            });
        });
