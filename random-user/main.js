let btn = document.querySelector(".btn");
btn.addEventListener("click", updateUser());

function updateUser(){
    let url = "https://randomuser.me/api";
    fetch(url)
    .then(handleError)
    .then(function(res){ return res.json(); })
    .then(function(res){
        let photo    = document.querySelector("#profile-pic"),
            fullname = document.querySelector("#fullname"),
            username = document.querySelector("#username"),
            email    = document.querySelector("#email"),
            city     = document.querySelector("#city");

        photo.src            = res.results[0].picture.large;
        fullname.textContent = res.results[0].name.first + " " + res.results[0].name.last;
        username.textContent = res.results[0].login.username;
        email.textContent    = "eMail: " + res.results[0].email;
        city.textContent     = "City: "  + res.results[0].location.city;
    })
    .catch(function(err){
        console.log(err);
    });
}

function handleError(responde){
    if(!responde.ok) {
        throw Error(responde.status)
    }
    return responde;
}