async function fetchKpIndex() {
  const url = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Kp Index Data:", data);
  } catch (error) {
    console.error("Failed to fetch Kp Index data:", error);
  }
}

fetchKpIndex();
