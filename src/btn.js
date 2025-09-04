// Variables
import { reset } from "./src/api.js";
// Notification
// Notification Copy
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
function notificationPreStart() {
  const preNotification = document.getElementById("notification-preStart");
  preNotification.classList.add("preShow");

  setTimeout(() => {
    preNotification.classList.remove("preShow");
  }, 3000);
}

function notificationStart() {
  const notificationStart = document.getElementById("notification-start")
  notificationStart.classList.add("show")

  setTimeout(() => {
    notificationStart.classList.remove("show")
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
// Start Button Handler
document.addEventListener("DOMContentLoaded", function () {
  const stopButton = document.querySelectorAll(".start-btn");
  stopButton.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const block = document.getElementById(`server-${id}`);
      const mapLoader = block.querySelector(".map");
      const playerLoader = block.querySelector(".player");
      const statusLoader = block.querySelector(".status");
      [mapLoader, playerLoader, statusLoader].forEach(
        (el) => (el.innerHTML = " ")
      );
      [mapLoader, playerLoader, statusLoader].forEach((el) =>
        el?.classList?.add("loader")
      );
      startServer(id);
    });
  });
});

// Stop Button Handler
document.addEventListener("DOMContentLoaded", function () {
  const stopButton = document.querySelectorAll(".stop-btn");
  stopButton.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const block = document.getElementById(`server-${id}`);
      const mapLoader = block.querySelector(".map");
      const playerLoader = block.querySelector(".player");
      const statusLoader = block.querySelector(".status");
      [mapLoader, playerLoader, statusLoader].forEach(
        (el) => (el.innerHTML = " ")
      );
      [mapLoader, playerLoader, statusLoader].forEach((el) =>
        el?.classList?.add("loader")
      );
      stopServer(id);
    });
  });
});

// Fetch
function stopServer(id) {
  fetch("https://dev.linfed.ru/api/server-stop", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Указываем тип контента
    },
    body: JSON.stringify({ id: id }),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP ERROR" + response.status);
      }
      return response.json();
    })
    .then(function () {
      setTimeout(() => {
        notificationStop()
      }, 18000);
      reset()
    })
    .catch(function () {
      // notificationFail();
    });
}

function startServer(id) {
  fetch("https://dev.linfed.ru/api/server-start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Указываем тип контента
    },
    body: JSON.stringify({ id: id }),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP ERROR" + response.status);
      }
      return response.json();
    })
    .then(function () {
      notificationPreStart();
      const data = response.json()
      if (data.output !== "") {
        notificationStart()
      }
    })
    .catch(function () {
      notificationFail();
    });
}

export {notificationStart}
