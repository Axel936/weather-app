


let tempManager = new TempManager()


const loadPage = async function() {
    await tempManager.getDataFromDB()
    let cities = tempManager.cities
    renderCities(cities)
}
    
const renderCities = function (cities){
    const source = $("#first-template").html();
    
    const template = Handlebars.compile(source);
    
    let newHTML = template({ cities });
    
    $("#cities-container").empty().append(newHTML);
}




const weatherPlease = async () => {
    
    let request = $("#text").val()
   await  tempManager.getCityData(request)
    renderCities(tempManager.cities)
}
 
loadPage()

