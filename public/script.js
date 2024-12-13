Promise.all([
  fetch('/profile').then(response => response.json()),
  fetch('/workers').then(response => response.json())
]).then(([profileData, workersData]) => {
  const profileInfo = document.getElementById('profile-info');
  profileInfo.innerHTML = `
    <div id="miners">
      <p><b>Hard Hashing Miners:</b> ${profileData.btc.ok_workers}</p>
      <p><b>Lazy Miners:</b> ${profileData.btc.low_workers}</p>
      <p><b>Dead Miners:</b> ${profileData.btc.off_workers}</p>
      <p><b>Miners Working:</b> ${((profileData.btc.ok_workers/(profileData.btc.off_workers+profileData.btc.low_workers+profileData.btc.ok_workers))*100).toFixed(2)} %</p>
    </div>
    <div id="rewards">
      <p><b>Today's Earnings:</b> ${(profileData.btc.today_reward*100000000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sats</p>
      <p><b>Today's Estimated Total:</b> ${(profileData.btc.estimated_reward*100000000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sats</p>
      <p><b>Total Earnings:</b> ${(profileData.btc.all_time_reward*100000000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sats</p>
    </div>
    <div id="hashing">
      <p><b>Hash rate 5m:</b> ${(profileData.btc.hash_rate_5m/1000).toFixed(2)} Th/s</p>
      <p><b>Hash rate 60m:</b> ${(profileData.btc.hash_rate_60m/1000).toFixed(2)} Th/s</p>
      <p><b>Hash rate 24h:</b> ${(profileData.btc.hash_rate_24h/1000).toFixed(2)} Th/s</p>
      <p><b>Average Yesterday:</b> ${(profileData.btc.hash_rate_yesterday/1000).toFixed(2)} Th/s</p>
    </div>
  `;

  const workersInfo = document.getElementById('workers-info');
  const miners = Object.fromEntries(Object.entries(workersData.btc.workers).filter(([miner, info]) => info.state !== 'dis'));
  let html = '';
  for (const miner in miners) {
    const minerName = miner.includes('.') ? miner.split('.')[1] : miner;
    const capitalizedMinerName = minerName.charAt(0).toUpperCase() + minerName.slice(1);
    const stateClass = miners[miner].state === 'OK' ? 'ok' : 
                       miners[miner].state === 'LOW' ? 'low' : 'off';
    html += `
      <div id="lines">
        <p><b>${capitalizedMinerName}:</b> <span class="${stateClass}">${miners[miner].state}</span> ${((miners[miner].hash_rate_5m / 1000).toFixed(2))} Th/s</p>
        <p class="little"><b>Percent of Daily Hash:</b> ${(((miners[miner].hash_rate_60m / 1000)/(profileData.btc.hash_rate_60m/1000))*100).toFixed(2)} %</p>
        <p class="little"><b>Estimated Earnings Today:</b> ${(((profileData.btc.estimated_reward*100000000).toFixed(0).toString())*(((miners[miner].hash_rate_60m / 1000)/(profileData.btc.hash_rate_60m/1000)))).toFixed(0)} sats</p>
      </div>
    `;
  }
  workersInfo.innerHTML = html;
}).catch(error => console.error(error));