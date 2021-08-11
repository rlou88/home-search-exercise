// getData();
// async function getData() {
//   const response = await fetch('home-data.csv');
//   const data = await response.text();

//   const table = data.split('\n').slice(1);
//   table.forEach((row) => {
//     const col = row.split(',');
//     const address = col[3];
//     // listingAdd.push(address);
//     const price = col[7];
//     const bed = col[8];
//     const bath = col[9];
//     const sqft = col[11];
//     const listingUrl = col[20];
//     console.log(address, price, bed, bath, sqft, listingUrl);
//     let addId = document.getElementById('getAddress');
//     let priceId = document.getElementById('getPrice');
//     let bedId = document.getElementById('getBed');
//     let bathId = document.getElementById('getBath');
//     let sqftId = document.getElementById('getSqft');
//     let listingUrlId = document.getElementById('getListUrl');
//     addId.innerHTML = address;
//     priceId.innerHTML = price;
//     bedId.innerHTML = bed;
//     bathId.innerHTML = bath;
//     sqftId.innerHTML = sqft;
//     listingUrlId.innerHTML = listingUrl;
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
                <h2>${house.ADDRESS}</h2>
                <p>House: ${house.CITY}</p>
                
            </li>
        `;
  }).join('');
  houseList.innerHTML = htmlString;
};

loadHouses();
