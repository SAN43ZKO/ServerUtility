import * as script from "./script.js"

//Notification Copy
document.addEventListener("DOMContentLoaded", function () {
  // Функция для копирования IP-адреса
  function copyIP(ip) {
    navigator.clipboard
      .writeText(ip)
      .then(function () {
        // Показываем уведомление
        const notification = document.getElementById("notification");
        notification.classList.add("show");

        // Скрываем уведомление через 3 секунды
        setTimeout(function () {
          notification.classList.remove("show");
        }, 3000);
      })
      .catch(function (err) {
        console.error("Ошибка при копировании: ", err);
        alert("Не удалось скопировать IP-адрес. Скопируйте его вручную: " + ip);
      });
  }

  // Добавляем обработчики событий для всех кнопок копирования
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const ip = this.getAttribute("data-ip");
      copyIP(ip);
    });
  });
});

// Notification Start
// document.addEventListener("DOMContentLoaded", function () {
//   function notifStart() {
//     const preNotification = document.getElementById("notification-preStart");
//     preNotification.classList.add("preShow");

//     setTimeout(() => {
//         preNotification.classList.remove("preShow");

//         setTimeout(() => {
//             const notificationStart = document.getElementById("notification-start");
//             notificationStart.classList.add("show");

//             setTimeout(() => {
//                 notificationStart.classList.remove("show")
//             }, 3000);
//         }, 5000);
//     }, 3000);
//   }

//   const startButton = document.querySelectorAll(".start-btn");
//   startButton.forEach(function (button) {
//     button.addEventListener("click", function () {
//       notifStart();
//     });
//   });
// });

//Notification Stop
function notificationStop() {
  const notificationStop = document.getElementById("notification-stop");
  notificationStop.classList.add("show");

  setTimeout(() => {
    notificationStop.classList.remove("show");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const stopButton = document.querySelectorAll(".stop-btn");
  stopButton.forEach(function (button) {
    button.addEventListener("click", script.stopServer());
  });
});

