const url = "http://aws.random.cat/meow";

let xhrbtn    = document.querySelector("#xhr-btn");
let fetchbtn  = document.querySelector("#fetch-btn");
let jquerybtn = $("#jquery-btn");
let axiosbtn  = document.querySelector("#axios-btn");


//document.querySelector("#xhr-btn").addEventListener("click", function(){});
xhrbtn.addEventListener("click", function(){
    let XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
        if(XHR.readyState === 4 && XHR.status === 200) {
            let cat = JSON.parse(XHR.responseText);
            document.querySelector("#cat-photo").src = cat.file;
        }
    }
    XHR.open("GET", url);
    XHR.send();
});

// document.querySelector("#fetch-btn").addEventListener("click", function(){});
fetchbtn.addEventListener("click", function(){
    fetch(url)
    .then(function(res){
        if(!res.ok) throw Error(res.status);
        return res.json();
    })
    .then(function(res){
        document.querySelector("#cat-photo").src = res.file;
    })
    .catch(function(err){
        console.log(err);
    })
});

// $("#jquery-btn").click(function(){})
jquerybtn.click(function(){
    $.getJSON(url)
    .done(function(res){
        $("#cat-photo").attr("src", res.file);
    })
    .fail(function(err){
        console.log("failed");
    });
});

axiosbtn.addEventListener("click", function(){
    axios.get(url)
    .then(function(res){
        if(res.status !== 200) throw Error(res.status);
        return res;
    })
    .then(function(res){        
        document.querySelector("#cat-photo").src = res.data.file;
    })
    .catch(function(err){
        console.log(err);
    })
});