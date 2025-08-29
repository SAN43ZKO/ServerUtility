// Variables
const pracOne = `<i class="fas fa-crosshairs"></i>  Practice 1`;

// Use Variables
document.addEventListener("DOMContentLoaded", ready);
function ready() {
  document.getElementById("heading").innerHTML = pracOne
}

// Notification
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
function notificationStart() {
  const preNotification = document.getElementById("notification-preStart");
  preNotification.classList.add("preShow");

  setTimeout(() => {
    preNotification.classList.remove("preShow");
    setTimeout(() => {
      const notificationStart = document.getElementById("notification-start");
      notificationStart.classList.add("show");
      setTimeout(() => {
        notificationStart.classList.remove("show");
      }, 3000);
    }, 5000);
  }, 3000);
}

// Notification Stop
function notificationStop() {
  const notificationStop = document.getElementById("notification-stop");
  notificationStop.classList.add("show");

  setTimeout(() => {
    notificationStop.classList.remove("show");
  }, 3000);
}

// Notification Fail
function notificationFail() {
  const notificationFail = document.getElementById("notification-fail");
  notificationFail.classList.add("show");

  setTimeout(() => {
    notificationFail.classList.remove("show");
  }, 3000);
}

// Button Handler
// Stop Button Handler
document.addEventListener("DOMContentLoaded", function () {
  const stopButton = document.querySelectorAll(".stop-btn");
  stopButton.forEach(function (button) {
    button.addEventListener("click", stopServer);
  });
});

// Start Button Handler
document.addEventListener("DOMContentLoaded", function () {
  const stopButton = document.querySelectorAll(".start-btn");
  stopButton.forEach(function (button) {
    button.addEventListener("click", startServer);
  });
});

// Fetch
function stopServer() {
  fetch("http://localhost:5000/server-stop", { method: "POST" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP ERROR" + response.status);
      }
      return response.json();
    })
    .then(function () {
      notificationStop();
    })
    .catch(function () {
      notificationFail();
    });
}

function startServer() {
  fetch("http://localhost:5000/server-start", { method: "POST" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP ERROR" + response.status);
      }
      return response.json();
    })
    .then(function () {
      notificationStart();
    })
    .catch(function () {
      notificationFail();
    });
}
