fetch('/profile')
  .then(response => response.json())
  .then(data => {
    const profileInfo = document.getElementById('profile-info');
    profileInfo.innerHTML = `
      <p>All-time reward: ${data.btc.all_time_reward} BTC</p>
      <p>Hash rate 5m: ${(data.btc.hash_rate_5m/1000)} Th/s</p>
      <p>Hash rate 60m: ${(data.btc.hash_rate_60m/1000)} Th/s</p>
      <p>Hash rate 24h: ${(data.btc.hash_rate_24h/1000)} Th/s</p>
      <p>Yesterday's Average Hash Rate: ${data.btc.hash_rate_yesterday}</p>
      </br>
      <p>Lazy Miners: ${data.btc.low_workers}</p>
      <p>Hard Hashing Miners: ${data.btc.ok_workers}</p>
      <p>Dead Miners: ${data.btc.off_workers}</p>
      <p>Today's Earnings: ${data.btc.today_reward} BTC</p>
      <p>Today's Estimated Total: ${data.btc.estimated_reward} BTC</p>
    `;
  })
  .catch(error => console.error(error));

fetch('/workers')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const workersInfo = document.getElementById('workers-info');
    workersInfo.innerHTML = `
      <p>Basement: ${data.btc.workers["jasonb123.bigdog"].state} - Hashing at ${(data.btc.workers["jasonb123.bigdog"].hash_rate_60m / 1000)} Th/s</p>
      <p>Garage: ${data.btc.workers["jasonb123.garage"].state} - Hashing at ${(data.btc.workers["jasonb123.garage"].hash_rate_60m / 1000)} Th/s</p>
      <p>Foyer: ${data.btc.workers["jasonb123.foyer"].state} - Hashing at ${(data.btc.workers["jasonb123.foyer"].hash_rate_60m / 1000)} Th/s</p>
      <p>Studio: ${data.btc.workers["jasonb123.studio"].state} - Hashing at ${(data.btc.workers["jasonb123.studio"].hash_rate_60m / 1000)} Th/s</p>
      </br>
    `;
  })
  .catch(error => console.error(error));