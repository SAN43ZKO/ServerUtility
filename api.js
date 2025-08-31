async function getData() {
  const endpoints = [
    { id: "4185", properties: ["mapname", "port", "status"] },
    { id: "4188", properties: ["mapname", "port", "status"] },
  ];

  // Обрабатываем все endpoints параллельно
  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      try {
        const response = await fetch(
          `https://proxy.corsfix.com/?https://cs-servers.ru/web/json-${endpoint.id}.json`
        );

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
  displayData(results)
}

function displayData(results) {
  const data = results.map((result) => {
    return {
      id: result.value.id,
      data: result.value.data,
    };
  });

}
