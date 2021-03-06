// --------------------------------------------------------------------------------------------------------
// -------------------------------------- Functions! ------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

// function to find a specific country in covid list
async function getCountry (path, code){
  let country  = await get(path + `/${code}`);
  return country;
}

// function to fetch info from API
async function get(endpoint){
  try{
    const promise = await fetch(endpoint);
    return await promise.json();
  }catch(err){
    console.log(err);
  }
}

// function to devide the list into continents
async function filter(continent,path){
  let array = [];
  for(let i = 0 ; i<continent.length; i++){
    let country = await get(path + `/region/${continent[i]}`);
    array.push(country);
  }
  return array;
}

// function to insert world <- continents <- countries
async function updateWorld (arr,path){
  for(let i = 0; i<arr.length; i++){
    // add new continent into world
    world.add(world.names[i]);

    // loop each continent
    for(const e in arr[i]){
      // kosorov does not exist in the covid API's list
      if (arr[i][e].cca2 === "XK")
        continue;
      let country = await getCountry(path,arr[i][e].cca2);
      world.list[i].add(country.data.latest_data,country.data.today,world.names[i],country.data.name)
    }
  }
  world.update();
}

// fuction to insert data into array by required stat
function toArray (arr,stat){
  let array = [];
  arr.forEach(element => {
    array.push(element.get(stat));
  });
  return array;
}

// function to alternate colors of chart bars
function bgColor (data) {
  return arr = data.map((e,i) => {
    switch(i%6) {
      case 0:
        return 'rgba(255, 99, 132, 0.2)';
      case 1:
        return 'rgba(54, 162, 235, 0.2)';
      case 2:
        return 'rgba(255, 206, 86, 0.2)';
      case 3:
        return 'rgba(75, 192, 192, 0.2)';
      case 4:
        return 'rgba(153, 102, 255, 0.2)';
      case 5:
        return 'rgba(255, 159, 64, 0.2)';
    }
  });
}
// function to alternate colors of chart bars :HOVER
function hoverBgColor (data) {
  return arr = data.map((e,i) => {
    switch(i%6) {
      case 0:
        return 'rgba(255, 99, 132, 0.5)';
      case 1:
        return 'rgba(54, 162, 235, 0.5)';
      case 2:
        return 'rgba(255, 206, 86, 0.5)';
      case 3:
        return 'rgba(75, 192, 192, 0.5)';
      case 4:
        return 'rgba(153, 102, 255, 0.5)';
      case 5:
        return 'rgba(255, 159, 64, 0.5)';
    }
  });
}

// function to alternate colors of chart bar's border
function borderColor (data) {
  return arr = data.map((e,i) => {
    switch(i%6) {
      case 0:
        return 'rgba(255, 99, 132, 1)';
      case 1:
        return 'rgba(54, 162, 235, 1)';
      case 2:
        return 'rgba(255, 206, 86, 1)';
      case 3:
        return 'rgba(75, 192, 192, 1)';
      case 4:
        return 'rgba(153, 102, 255, 1)';
      case 5:
        return 'rgba(255, 159, 64, 1)';
    }
  });
}

// function to display new chart
function displayNew (element,container,arr,data) {
  element.remove();
  let chart = document.createElement("canvas");
  chart.setAttribute("id","chart");
  chart.setAttribute("class","fancy-border");
  container.appendChild(chart);
  barChart(arr,data);
}

// function to change the select options
function changeDropDown (element) {
  const myNode = document.getElementById("my-select");
  myNode.innerHTML = '';
  
  // console.log(element.name);
  myNode.innerHTML = `<option selected disabled hidden>${element.name}</option>`;
  for(const item of element.list){
    myNode.innerHTML += `<option class="option" value="${item.name}">${item.name}</option>`
  }
}

// function to enable buttons
function enable (arr) {
  arr.forEach((e)=>{ e.disabled =false; });
}

// function to display country's statistics
function displayCounrty (country) {
  let details = document.querySelectorAll('.number');
  document.getElementById("country-name").innerHTML = `Country Details: ${country.name}`
  console.log(details);
  details.forEach((detail) => {
    detail.innerHTML = `${country.get(detail.id)}`;   
  });
}

// function to shorten too long country names
function abriviate (string) {
  let arr = string.split(" "); 
  return arr.length >= 3 ? `${arr[0]}.${arr[1].charAt(0).toUpperCase()}.${arr[2].charAt(0).toUpperCase()}`: string;
}