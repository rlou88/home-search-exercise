// function to parse csv file
// getData();
// async function getData() {
//   const response = await fetch('home-data.csv');
//   const data = await response.text();

//   const table = data.split('\n').slice(1);
//   table.forEach((row) => {
//     const col = row.split(',');
//     const address = col[3];
//     const price = col[7];
//     const bed = col[8];
//     const bath = col[9];
//     const sqft = col[11];
//     const listingUrl = col[20];
//     console.log(address, price, bed, bath, sqft, listingUrl);
//   });
// }

const houseList = document.getElementById('houseList');
const searchBar = document.getElementById('searchBar');
let houseListings = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredHouses = houseListings.filter((house) => {
    return house.ADDRESS.toLowerCase().includes(searchString);
  });
  displayHouses(filteredHouses);
});

const loadHouses = async () => {
  try {
    const res = await fetch('/listings.json');
    houseListings = await res.json();
    displayHouses(houseListings);
  } catch (err) {
    console.error(err);
  }
};

const displayHouses = (Houses) => {
  const htmlString = Houses.map((house) => {
    return `
            <li class="house">
                <h3>${house.ADDRESS}</h3>
                <p>${house.BEDS} Beds ${house.BATHS} Baths ${house['SQUARE FEET']} Sq.Ft</p>
                <h4>$${house.PRICE}</h4>
                <a href="${house['URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)']}" target="_blank">View</a>
            </li>
        `;
  }).join('');
  houseList.innerHTML = htmlString;
};

loadHouses();
