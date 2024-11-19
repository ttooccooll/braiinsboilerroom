fetch('/profile')
  .then(response => response.json())
  .then(data => {
    const profileInfo = document.getElementById('profile-info');
    profileInfo.innerHTML = `
      </br>
      <p>All-time reward: ${data.btc.all_time_reward} BTC</p>
      <p>Hash rate 5m: ${data.btc.hash_rate_5m} ${data.btc.hash_rate_unit}</p>
      <p>Hash rate 60m: ${data.btc.hash_rate_60m} ${data.btc.hash_rate_unit}</p>
      <p>Hash rate 24h: ${data.btc.hash_rate_24h} ${data.btc.hash_rate_unit}</p>
      <p>Yesterday's Average Hash Rate: ${data.btc.hash_rate_yesterday} ${data.btc.hash_rate_unit}</p>
      </br>
      <p>Lazy Miners: ${data.btc.low_workers}</p>
      <p>Hard Hashing Miners: ${data.btc.ok_workers}</p>
      <p>Dead Miners: ${data.btc.off_workers}</p>
      <p>Today's Earnings: ${data.btc.today_reward} BTC</p>
      <p>Today's Estimated Total: ${data.btc.estimated_reward} BTC</p>
      </br>
    `;
  })
  .catch(error => console.error(error));

  fetch('/workers')
  .then(response => response.json())
  .then(data => {
    const workersInfo = document.getElementById('workers-info');
    workersInfo.innerHTML = `
      </br>
      <p>All-time reward: ${data.btc.workers.jasonb123.studio.state}</p>
      </br>
    `;
  })
  .catch(error => console.error(error));