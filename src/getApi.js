async function getData() {
  const endpoints = [
    {
      id: "1",
      serverIp: "linfed.ru",
      serverPort: 28011,
      properties: ["map", "status", "players", "server_version"],
    },
    {
      id: "2",
      serverIp: "linfed.ru",
      serverPort: 28012,
      properties: ["map", "status", "players", "server_version"],
    },
    {
      id: "3",
      serverIp: "linfed.ru",
      serverPort: 28013,
      properties: ["map", "status", "players", "server_version"],
    },
  ];

  // Обрабатываем все endpoints параллельно
  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      try {
        const [statusResponse, versionResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Указываем тип контента
            },
            body: JSON.stringify({
              serverIp: endpoint.serverIp,
              serverPort: endpoint.serverPort,
            }),
          }),
          fetch("http://localhost:5000/api/version", { mathod: "GET" }),
        ]);

        if (!statusResponse.ok) {
          throw new Error(`HTTP Error: ${statusResponse.status}`);
        }
        if (!versionResponse.ok) {
          throw new Error(`HTTP Error: ${versionResponse.status}`);
        }

        const [statusData, versionData] = await Promise.all([
          statusResponse.json(),
          versionResponse.json(),
        ]);

        const result = {};

        // Обрабатываем каждое свойство
        endpoint.properties.forEach((property) => {
          result[property] = statusData[property]
            ? statusData[property].split(" ")
            : [];
        });

        result.app_version = [versionData];

        return {
          id: endpoint.id,
          data: result,
        };
      } catch (error) {
        console.error(`Error for endpoint ${endpoint.id}:`, error);
        return {
          id: endpoint.id,
          error: error.message,
        };
      }
    })
  );
  displayData(results);
}

function displayData(results) {
  const data = results.map((result) => {
    return {
      id: result.value.id,
      data: result.value.data,
    };
  });

  data.forEach((item) => {
    const block = document.getElementById(`server-${item.id}`);

    try {
      if (block) {
        const status = item.data.status[0];
        const appVersion = item.data.app_version;
        const playerText = item.data.players;
        const mapText = item.data.map;
        const versionText = item.data.server_version;

        const mapLoader = block.querySelector(".map");
        const playerLoader = block.querySelector(".player");
        const statusLoader = block.querySelector(".status");
        const versionLoader = block.querySelector(".version");
        [mapLoader, playerLoader, statusLoader, versionLoader].forEach((el) =>
          el?.classList?.remove("loader")
        );

        block.querySelector(".player").textContent = playerText;
        block.querySelector(".map").textContent = mapText;

        if (versionText[0] === appVersion[0] || versionText == "") {
          block.querySelector(".version").textContent = "CURRENT";
        } else {
          block.querySelector(".version").textContent = "OUTDATED";
        }

        switch (status) {
          case "offline":
            block.querySelector(
              ".status"
            ).innerHTML = `<i class="fa-solid fa-circle red"></i>`;
            block.querySelector(".status").classList.add("red");
            break;
          case "online":
            block.querySelector(
              ".status"
            ).innerHTML = `<i class="fa-solid fa-circle green"></i>`;
            block.querySelector(".status").classList.add("green");
            break;
        }
        if (item.data.map == "") {
          block.querySelector(".map").textContent = "Server offline";
          block.querySelector(".player").textContent = "Server offline";
        }
      }
    } catch {
      const errText = "Couldn't get data";

      if (block) {
        const mapLoader = block.querySelector(".map");
        const playerLoader = block.querySelector(".player");
        const statusLoader = block.querySelector(".status");
        const versionLoader = block.querySelector(".version");
        [mapLoader, playerLoader, statusLoader, versionLoader].forEach((el) =>
          el?.classList?.remove("loader")
        );
        block.querySelector(".player").textContent = errText;
        block.querySelector(".map").textContent = errText;
        block.querySelector(".status").textContent = errText;
        block.querySelector(".version").textContent = errText;
      }
    }
  });
}

getData();
let intervalId = setInterval(getData, 15000);

function reset() {
  clearInterval(intervalId);
  intervalId = setInterval(getData, 15000);
}

export { reset };
