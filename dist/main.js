



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
// load page
loadPage()


// detete button on click
// remove city from cities array and DB in tempManager, and rerender cities array
$("body").on("click",".delete", async function() {
let cityName = ($(this).closest('#container').data().id)
await tempManager.removeCity(cityName)
renderCities(tempManager.cities)
});
// delete button on click
// add city to DB
$("body").on("click",".add", async function() {
let cityName = ($(this).closest('#container').data().id)
await tempManager.saveCity(cityName)
$(this).hide()

});
