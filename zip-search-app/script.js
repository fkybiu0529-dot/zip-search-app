async function loadCSV() {
  const response = await fetch("KEN_ALL.CSV");
  const text = await response.text();

  const lines = text.split("\n");
  const data = lines.map(line => {
    const cols = line.split(",");
    return {
      zipcode: cols[2]?.replace(/"/g, ""),
      prefecture: cols[6]?.replace(/"/g, ""),
      city: cols[7]?.replace(/"/g, ""),
      town: cols[8]?.replace(/"/g, "")
    };
  });

  return data;
}

async function findAddress() {
  const zip = document.getElementById("zipInput").value;
  const data = await loadCSV();
  const result = data.find(row => row.zipcode === zip);

  document.getElementById("zipResult").textContent =
    result ? result.prefecture + result.city + result.town : "見つかりませんでした";
}

async function findZip() {
  const keyword = document.getElementById("addrInput").value;
  const data = await loadCSV();
  const results = data.filter(row =>
    row.prefecture.includes(keyword) ||
    row.city.includes(keyword) ||
    row.town.includes(keyword)
  );

  document.getElementById("addrResult").textContent =
    results.length > 0
      ? results.map(r => `${r.zipcode}：${r.prefecture}${r.city}${r.town}`).join("<br>")
      : "見つかりませんでした";
}