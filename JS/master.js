let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(()=>{
    searchByName("").then(()=>{
        $(".loading-screen").fadeOut(100);
        $("body").css("overflow","visible")
    })
})
function openSideNav(){
    $(".side-nav-menu").animate({left:0},500)

    $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");

    for(let i=0;i<5;i++){
        $(".nav-links li").eq(i).animate({
            top:0
        },(i+8)*100)
    }
}

function closeSideNav(){
    let boxWidth=$(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({left:-boxWidth},500)

    $(".open-close-icon").removeClass("fa-x").addClass("fa-align-justify");

    $(".nav-links li").animate({top:300},1000)

}
closeSideNav()
$(".side-nav-menu i.open-close-icon").click(()=>{
    if( $(".side-nav-menu").css("left")=="0px"){
        closeSideNav()
    }else{
        openSideNav()
    }
})

function displayMeals(arr){
    let cartonna=""
    for(let i=0;i<arr.length;i++){
        cartonna+=`
        <div class="col-md-3">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>

            </div>
        </div>`
    }
    rowData.innerHTML=cartonna;
}

async function getCategories(){
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML="";

    let response=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    response=await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(arr){
    let cartonna="";
    for(let i=0;i<arr.length;i++){
        cartonna+=`
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer" >
                <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription.split("").slice(0,20).join("")}</p>
                </div>
            </div>
        </div>
        `
    }
    rowData.innerHTML=cartonna;
}

async function getArea(){
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML="";

    let response=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response=await response.json()

    displayArea(response.meals)
    $(".inner-loading-screen").fadeOut(300)

}

function displayArea(arr){
    let cartonna=``
    for(let i=0;i<arr.length;i++){
        cartonna+=`
        <div class="col-md-3">
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
            </div>
        </div>
        `
    }
    rowData.innerHTML=cartonna;
}
async function getIngredients(){
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML="";

    let response=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    response=await response.json()
    console.log(response.meals);

    displayIngredients(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(300)

}

function displayIngredients(arr){
    let cartonna=""
    for(let i=0;i<arr.length;i++){
        cartonna+=`
        <div class="col-md-3">
            <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 border border-1 border-light text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
        `
    }
    rowData.innerHTML=cartonna;
}

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}



async function getAreaMeals(area) {
    rowData.innerHTML = ``
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}

function displayMealDetails(meal){
    searchContainer=""
    let ingredients=``;
    for(let i=0;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients+=`<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags=meal.strTags?.split(",")

    if(!tags) tags=[]

    let tagsStr=``
    for(let i=0;i<tags.length;i++){
        tagsStr+=`
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
        `
    }

    let cartonna=`
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bloder">Area :</span>${meal.strArea}</h3>
            <h3><span class="fw-bloder">Catagory :</span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
            </ul>
            <div class="d-flex align-items-center ">
            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class=" ms-2 "><i class="fa-brands fa-youtube fa-3x" style="color: #d42525;"></i></a>
            </div>
            
        </div>
    `
    rowData.innerHTML=cartonna;
}
 

function showSearchInput(){

    searchContainer.innerHTML=`
    <div class="row p-2">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name"/>
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent  text-white" type="text" placeholder="Search By Letter"/>
        </div>
    </div>
    `
    rowData.innerHTML=""
}

async function searchByName(search){
    closeSideNav();
    rowData.innerHTML=""
    // $(".inner-loading-screen").fadeIn(300);
    let reponse=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    reponse=await reponse.json();

    reponse.meals ? displayMeals(reponse.meals):displayMeals([])
    $(".inner-loading-screen").fadeOut(300);
}

async function searchByLetter(search){
    closeSideNav()
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300);
    search==""?search="a":"";
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    response=await response.json();
    response.meals?displayMeals(response.meals):displayMeals([])

    $(".inner-loading-screen").fadeOut(300);
}


function showContacts(){
    rowData.innerHTML=`
    <div class="contact min-vh-100 d-flex align-items-center justify-content-center">
      <div class="container w-75 text-center">
        <div class="row place-holder-color g-4">
          <div class="col-md-6">
            <input id="nameInput" onkeyup="inputsvalidation()" type="text" class="form-control" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
              Special Character and Number Not Allowed
            </div>
          </div>
          <div class="col-md-6">
            <input id="emailInput" onkeyup="inputsvalidation()" type="email" class="form-control" placeholder="Enter Your Email" >
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
              Email not vaild *exemple@yyy.zzz
            </div>
          </div>
          <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsvalidation()" type="text" class="form-control" placeholder="Enter Your Phone" >
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Phone Number
            </div>
          </div>
          <div class="col-md-6">
            <input id="ageInput" onkeyup="inputsvalidation()" type="number" class="form-control" placeholder="Enter Your Age" >
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid age
            </div>
          </div>
          <div class="col-md-6">
            <input id="passwordInput" onkeyup="inputsvalidation()" type="password" class="form-control" placeholder="Enter Your Password" >
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid password *Minimun eight characters,at least one letter and one number:*
            </div>
          </div>
          <div class="col-md-6">
            <input id="repasswordInput" onkeyup="inputsvalidation()" type="password" class="form-control" placeholder="Enter Your Repassword" >
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid repassword 
            </div>
          </div>
          
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-info px-2 mt-3">Submit</button>
      </div>
    </div>
    `
    submitBtn=document.getElementById("submitBtn");

    document.getElementById("nameInput").addEventListener("focus",()=>{
        nameInputTouched=true;
    })

    document.getElementById("emailInput").addEventListener("focus",()=>{
        emailInputTouched=true;
    })
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

nameInputTouched=false;
emailInputTouched=false;
phoneInputTouched = false;
ageInputTouched = false;
passwordInputTouched = false;
repasswordInputTouched = false;


function inputsvalidation(){
    if(nameInputTouched){
        if(namevalidation){
            document.getElementById("nameAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("nameAlert").classList.replace("d-none","d-block")
        }
    }
    if(emailInputTouched){
        if(emailvalidation){
            document.getElementById("emailAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("emailAlert").classList.replace("d-none","d-block")
        }
    }
    if(phoneInputTouched){
        if(phonevalidation){
            document.getElementById("phoneAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("phoneAlert").classList.replace("d-none","d-block")
        }
    }
    if(ageInputTouched){
        if(agevalidation){
            document.getElementById("ageAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("ageAlert").classList.replace("d-none","d-block")
        }
    }
    if(passwordInputTouched){
        if(passworddvalidation){
            document.getElementById("passwordAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("passwordAlert").classList.replace("d-none","d-block")
        }
    }
    if(repasswordInputTouched){
        if(repasswordvalidation){
            document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
        }
    }

    if(namevalidation()&&emailvalidation()&&phonevalidation()&&agevalidation()&&passworddvalidation()&&repasswordvalidation()){
        submitBtn.removeAttribute("disabled")
    }else{
        submitBtn.setAttribute("disabled","true")
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

