



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

const deletePost = function() { console.log(this)}

$("body").on("click",".delete", async function() {
let cityName = ($(this).closest('#container').data().id)
await tempManager.removeCity(cityName)
renderCities(tempManager.cities)
});

$("body").on("click",".add", async function() {
let cityName = ($(this).closest('#container').data().id)
await tempManager.saveCity(cityName)
renderCities(tempManager.cities)
});
