// --------------------------------------------------------------------------------------------------------
// -------------------------------------- classes definition ----------------------------------------------
// --------------------------------------------------------------------------------------------------------

// Class for countries
class Country {
  constructor(data,today,region,name){
    this.name = name;
    this.region = region;
    this.newCases = today.confirmed;
    this.newDeaths = today.deaths;
    this.confirmed = data.confirmed+today.confirmed;
    this.deaths = data.deaths+today.deaths;
    this.recovered = data.recovered;
    this.critical = data.critical;
  }
  get(param){
    switch(param) {
      case "name":
        return this.name;
      case "newCases":
        return this.newCases;
      case "newDeaths":
        return this.newDeaths;
      case "confirmed":
        return this.confirmed;
      case "deaths":
        return this.deaths;
      case "recovered":
        return this.recovered;
      case "critical":
        return this.critical;
    }
  }
}

// Class for continents
class Continent {
  constructor(name){
    this.name = name;
    this.list = [];
    this.confirmed = 0;
    this.deaths = 0;
    this.recovered = 0;
    this.critical = 0;
  }
  add(data,today,region,name){
    let c = new Country(data,today,region,name);
    this.list.push(c);
    this.confirmed += data.confirmed+today.confirmed;
    this.deaths += data.deaths+today.deaths;
    this.recovered += data.recovered;
    this.critical += data.critical;
    return c;
  }
  get(param){
    switch(param) {
      case "name":
        return this.name;
      case "confirmed":
        return this.confirmed;
      case "deaths":
        return this.deaths;
      case "recovered":
        return this.recovered;
      case "critical":
        return this.critical;
    }
  }
}
// List of continents
class World {
  constructor(name){
    this.name = name;
    this.names = ["Asia","Oceania","Africa","Americas","Europe"];
    this.list = [];
    this.confirmed = 0;
    this.deaths = 0;
    this.recovered = 0;
    this.critical = 0;
  }
  add(name){
    let c = new Continent(name);
    this.list.push(c);
  }
  get(param){
    switch(param) {
      case "name":
        return this.name;
      case "confirmed":
        return this.confirmed;
      case "deaths":
        return this.deaths;
      case "recovered":
        return this.recovered;
      case "critical":
        return this.critical;
    }
  }
  update(){
    this.list.forEach((cont) => {
      this.confirmed += cont.confirmed;
      this.deaths += cont.totalDeaths;
      this.recovered += cont.recovered;
      this.critical += cont.critical;
    });
  }
}
