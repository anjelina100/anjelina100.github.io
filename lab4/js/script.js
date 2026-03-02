//event listeners

let zipElement = document.querySelector("#zipCode");
zipElement.addEventListener("change", displayCity);

document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});
document.querySelector("#pass").addEventListener("click", displayPass);


document.querySelector("#user").addEventListener("change", displayUserName);

let countyElement = document.querySelector("#state");
countyElement.addEventListener("change", displayCounty);
displayCounty();
displayStates();
async function displayStates () {
    let url = "https://csumb.space/api/allStatesAPI.php"
    try {
       const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
       const data = await response.json();
       console.log(data);
       // alert(data[0].state);

       for (let i of data){
        let optionEL = document.createElement("option")
        optionEL.textContent = i.state;
        optionEL.value = i.usps;

        document.querySelector("#state").append(optionEL);
       }
       } catch (err) {
             if (err instanceof TypeError) {
                alert("Error accessing API endpoint (network failure)");
              } else {
                alert(err.message);
              }
      } //catch
}
async function displayCity() {
    //alert("displaying city...");

    let zipCode = zipElement.value;
    let zipError = document.querySelector("#zipError");
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();
    if (data === false) {
        zipError.innerHTML = "Zip code not found";
    } else {
    console.log(data);
    // alert(data.city);
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
    }
}


async function displayPass() {
    console.log("displaying the pass");
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    document.querySelector("#suggestedPass").textContent = data.password;
}

async function displayUserName() {
    let username = document.querySelector("#user").value;
    let usernameError = document.querySelector("#available");
    console.log("displaying the username");
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + username;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (data.available) {
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
    }
}

async function displayCounty() {
    let state = document.querySelector("#state").value;

    console.log("displaying the county");
    let url = "https://csumb.space/api/countyListAPI.php?state=" + state;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    document.querySelector("#county").innerHTML = "<option>Select</option>";
    for (let i of data){
        let optionEL = document.createElement("option")
        optionEL.textContent = i.county;
        document.querySelector("#county").append(optionEL);
       }
}
function validateForm(e) {
    e.preventDefault();
    let isValid = true;
    let username = document.querySelector("#user").value;
    let password = document.querySelector("#pass").value;
    let suggestedPassword = document.querySelector("#pass2").value;
    if(username.length < 3) {
        document.querySelector("#available").innerHTML = "Username Required!";
        isValid = false;
    } 
    if(password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password Required!";
        isValid = false;
    } 
    if(password !== suggestedPassword) {
        document.querySelector("#passwordError").innerHTML = "Retype Password!";
        isValid = false;
    } 


    if (!isValid) {
        e.preventDefault();
    }
}
