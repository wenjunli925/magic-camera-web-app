// console.log("about to fetch a photo");
// catchPhoto()
//     .then(response => {
//         console.log("photo fetched");
//     })
//     .catch(error => {
//         console.log(error);
//     });


// async function catchPhoto() {
//     const response = await fetch("photo.jpg");
//     const blob = await response.blob();
//     document.getElementById("photo-web-cam").src = URL.createObjectURL(blob);
// }

// async function getData() {
//     const xs = [];
//     const ys = []; 

//     const response = await fetch("ZonAnn.Ts+dSST.csv");
//     const data = await response.text();
//     // console.log(data);

//     const table = data.split("\n").slice(1);
//     table.forEach(row => {
//         const columns = row.split(",");
//         const year = columns[0];
//         const temp = columns[1];
//         console.log(year, temp);

//         xs.push(year);
//         ys.push(parseFloat(temp) + 14);
//     });

//     return { xs, ys };
// }

async function showMap() {
    const mymap = L.map('issMap').setView([0, 0], 1);
    const marker = L.marker([0, 0]).addTo(mymap);
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    
    getISS(marker);

    setInterval(getISS, 1000);
}



const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

async function getISS(marker) {
    
    const response = await fetch(api_url);
    const data = await response.json();
    const  { latitude, longitude } = data;

    document.getElementById("lat").textContent = latitude;
    document.getElementById("lon").textContent = longitude;
    console.log(latitude, longitude);

    if (firstTime) {
        marker.setLatLng([latitude, longitude]);
        firstTime = false;
    }
}

async function chartIt() {
    const data = await getData();
    const ctx = document.getElementById('chart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.xs,
        datasets: [{
          label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in °C',
          data: data.ys,
          fill: false,
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
                      return value + '°';
                  }
            }
          }
        }
      }
    });
  }

