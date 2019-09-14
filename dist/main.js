const renderCities = function(cities) {
  const source = $("#first-template").html();

  const template = Handlebars.compile(source);

  let newHTML = template({ cities });

  $("#cities-container").empty().append(newHTML);
}
const showCities = () => {
    $.get(`/cities`, function(citidata){
        renderCities(citidata)
    })
}


const addCity = (weatherData) => {
    $.post('/city', weatherData, function(err, data){
        
    })
}


const weatherPlease = () => {
    let userRequest = $("#text").val()
    $.get(`/city/${userRequest}`,function(weatherData){
        addCity(weatherData)
        showCities()
        

})    
}

showCities()

