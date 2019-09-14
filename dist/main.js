const weatherPlease = () => {
    let userRequest = $("#text").val()
    $.get(`/city/${userRequest}`,function(weatherData){
        console.log(weatherData)
})    
}

