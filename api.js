async function getData() {
  const endpoints = [
    {
      id: "1",
      serverIp: "linfed.ru",
      serverPort: 28011,
      properties: ["map", "status", "players"],
    },
    {
      id: "2",
      serverIp: "linfed.ru",
      serverPort: 28012,
      properties: ["map", "status", "players"],
    },
    {
      id: "3",
      serverIp: "linfed.ru",
      serverPort: 28013,
      properties: ["map", "status", "players"],
    },
  ];

  // Обрабатываем все endpoints параллельно
  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      try {
        const response = await fetch(`http://localhost:5000/status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Указываем тип контента
          },
          body: JSON.stringify({
            serverIp: endpoint.serverIp,
            serverPort: endpoint.serverPort
          }),
        });

        console.log(endpoint.serverIp, endpoint.serverPort);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        const result = {};

        // Обрабатываем каждое свойство
        endpoint.properties.forEach((property) => {
          result[property] = data[property] ? data[property].split(" ") : [];
        });

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
  console.log(results);
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
        block.querySelector(".player").textContent = item.data.players;
        block.querySelector(".map").textContent = item.data.map;
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
      }
    } catch {
      const errText = "Couldn't get data";
      if (block) {
        block.querySelector(".player").textContent = errText;
        block.querySelector(".map").textContent = errText;
        block.querySelector(".status").textContent = errText;
      }
    }
  });
}

// getData()
// setInterval(() => {
//   getData()
// }, 15000);

// https://proxy.corsfix.com/?https://cs-servers.ru/web/json-${endpoint.id}.json
