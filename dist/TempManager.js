class TempManager {
  constructor() {
    this.cities = [];
  }
  getDataFromDB = async function() {
   
   let cities =  await $.get(`/cities`) 
      this.cities = cities
   
  };

  getCityData =  async function(cityName) {
    let city = await $.get(`/city/${cityName}`) 
      this.cities.push(city);
    };
  
  saveCity = async function(cityName){
   await $.post(`/city/`,this.cities.find(p => p.name == cityName), function (err, body){})

  }
  removeCity= async function(cityName){
    await $.ajax({
      type: 'DELETE',
      url: `/city/${cityName}`, 
      success: function (err, body){}
  })
  }

}
