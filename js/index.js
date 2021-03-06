// ======================= PATHs for API request ===================== //

let path1 = "https://corona-api.com/countries";
let proxy = `https://api.allorigins.win/raw?url=`;
let path2 = `${proxy}https://restcountries.herokuapp.com/api/v1`;

// ======================= Global selectors ========================== //

const loader = document.querySelector('.wrapper');
const canvasWrapper = document.querySelector('#canvas-wrap');
const buttons = document.querySelectorAll('.btn');
const link = document.querySelectorAll('a');

// ======================= global variables ========================== //

const world = new World("World");
let current = world;
let stat = "confirmed";

// ======================= EVENT LISTENERS ========================== //

// ------------------(( buttons ))------------------------------------//

buttons.forEach((e) => {
  e.addEventListener('click',() => { 
    buttons.forEach((c) => {c.classList.remove('selected')}); 
    e.classList.add('selected');
    let chart = document.querySelector('#chart');
    let target = world.names.indexOf(e.id);
    current = target === -1 ? world : world.list[target];
    changeDropDown(current);
    displayNew(chart, canvasWrapper, current, toArray(current.list,stat));
  })
});

// -------------------------(( links ))--------------------------------//

link.forEach((e) => {
  e.addEventListener('click',() => {
    stat = e.id;
    console.log(stat);
    link.forEach((c) => {c.classList.remove(c.id)})
    e.classList.add(e.id);
    let btn = document.querySelector(`#${current.name}`);
    btn.click();
  });
});

// ------------------------(( options ))----------------------------------//

document.getElementById('my-select').addEventListener('change', function() {
  let target = world.names.indexOf(this.value);
  let countryName = this.value;
  if (current !== world){
    for(const country of current.list)
      if(country.name === countryName)
        displayCounrty(country)   
  }else{
    current = world.list[target];
    let btn = document.querySelector(`#${current.name}`);
    btn.click();
  }  
});

// ======================= First Function on the page ========================== //

async function initPage(){
  let arr = await filter(world.names,path2);
  await updateWorld(arr,path1);
  loader.setAttribute("style","display: none;");
  barChart(current,toArray(current.list, stat));
  enable(buttons);
  document.getElementById('my-select').disabled =false;
}


