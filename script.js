Promise.all([
  fetch('/profile').then(response => response.json()),
  fetch('/workers').then(response => response.json())
]).then(([profileData, workersData]) => {
  const profileInfo = document.getElementById('profile-info');
  profileInfo.innerHTML = `
    <div id="miners">
      <p>Hard Hashing Miners: ${profileData.btc.ok_workers}</p>
      <p>Lazy Miners: ${profileData.btc.low_workers}</p>
      <p>Dead Miners: ${profileData.btc.off_workers}</p>
      <p>Today's Earnings: ${(profileData.btc.today_reward*100000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sats</p>
      <p>Today's Estimated Total: ${(profileData.btc.estimated_reward*100000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sats</p>
      <p>Total Earnings: ${(profileData.btc.all_time_reward*100000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sats</p>
    </div>
    <div id="rewards">
      <p>Hash rate 5m: ${(profileData.btc.hash_rate_5m/1000).toFixed(4)} Th/s</p>
      <p>Hash rate 60m: ${(profileData.btc.hash_rate_60m/1000).toFixed(4)} Th/s</p>
      <p>Hash rate 24h: ${(profileData.btc.hash_rate_24h/1000).toFixed(4)} Th/s</p>
      <p>Yesterday's Hash Rate: ${(profileData.btc.hash_rate_yesterday/1000).toFixed(4)} Th/s</p>
    </div>
  `;

  const workersInfo = document.getElementById('workers-info');
  const miners = Object.fromEntries(Object.entries(workersData.btc.workers).filter(([miner, info]) => info.state !== 'dis'));
  let html = '';
  for (const miner in miners) {
    const minerName = miner.includes('.') ? miner.split('.')[1] : miner;
    const capitalizedMinerName = minerName.charAt(0).toUpperCase() + minerName.slice(1);
    const stateClass = miners[miner].state === 'OK' ? 'ok' : 'off';
    html += `
      <div id="lines">
        <p>${capitalizedMinerName}: <span class="${stateClass}">${miners[miner].state}</span> ${((miners[miner].hash_rate_60m / 1000).toFixed(3))} Th/s</p>
        <p>${(((miners[miner].hash_rate_60m / 1000)/(profileData.btc.hash_rate_60m/1000))*100).toFixed(2)} %</p>
      </div>
    `;
  }
  workersInfo.innerHTML = html;
}).catch(error => console.error(error));