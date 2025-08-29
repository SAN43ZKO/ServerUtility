import * as notification from "./copyScript.js"

// function startCommand() {
//   fetch("http://localhost:5000/server-start", { method: "POST" })
//     .then((response) => response.json())
//     .then((data) => alert(JSON.stringify(data)))
//     .catch((error) => console.error("Error:", error));
// }
// function stopCommand() {
//   fetch("http://localhost:5000/server-stop", { method: "POST" })
//     .then((response) => response.json())
//     .then((data) => alert(JSON.stringify(data)))
//     .catch((error) => console.error("Error:", error));
// }
// function sayCommand() {
//   fetch("http://localhost:5000/say", { method: "POST" })
//     .then((response) => response.json())
//     .then((data) => alert(JSON.stringify(data)))
//     .catch((error) => console.error("Error:", error));
// }

function startCommandThree() {
  fetch("http://localhost:5000/server-start2", { method: "POST" })
    .then(function (response) {
      if (response.status !== 200) {
        // console.log("fail");
        document.addEventListener("DOMContentLoaded", function () {
          function notifFail() {
            const notificationFail =
              document.getElementById("notification-fail");
            notificationFail.classList.add("show");

            setTimeout(() => {
              notificationFail.classList.remove("show");
            }, 3000);
          }

          const startButton = document.querySelectorAll(".start-btn");
          startButton.forEach(function (button) {
            button.addEventListener("click", function () {
              notifFail();
            });
          });
        });
        return;
      }
      response.json().then(function (data) {
        console.log("Success!", data);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function stopServer(){
  fetch("http://localhost:5000/server-stop", { method: "POST", mode: "no-cors"}).then(
    function (response) {
      if (!response.ok) {
        throw new Error("HTTP Error" + response.status)
      }
      return response.json()
    }
  )
  .then(
    notification.notificationStop()
  )
  .catch(function(err) {
    console.error(err)
  })
}
