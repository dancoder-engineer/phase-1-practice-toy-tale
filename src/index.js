let addToy = false;
let idNumber=0
let howMany = 0
let latest = 0

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getData(initPage)
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.querySelector('.submit').addEventListener('click',function(e){
     e.preventDefault()
     let a = document.getElementsByClassName('input-text')
     let name = a[0].value
     let image = a[1].value
     if (name !== "" && image !== "") 
     {
     a[0].value = ""
     a[1].value = ""
     getData(latestID)

     putIn = {
        name: name,
        image: image,
       likes: 0
     }

    
      fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers:{'Content-Type': 'application/json',},
      body:JSON.stringify(putIn)
  })
  .then(res=> res.json())
  .then(data => insertCard(name, image, data.id))



  
     
  
    
  }


  

   });
});



function insertCard(name, image, latest) {
  collection=document.getElementById('toy-collection')
    card=document.createElement('div')
    card.className='card'
    card.id=`Number${latest}`
    card.innerHTML += `<h2>${name}</h2>`
    card.innerHTML += `<img src="${image}" class="toy-avatar" />`
    card.innerHTML += `<p>0 Likes </p>`
    card.innerHTML += `<button class="like-btn" id="${latest}">Like <3</button>`
    card.addEventListener('click', function(e) {
      idNumber = latest
      getData(howManyLikes)
    })
    
    collection.appendChild(card)
    
}

function getData(func, url="http://localhost:3000/toys") {
  fetch(url)
  .then(res => res.json())
  .then(data => func(data))
}


function parseData(data) {
  console.log(data)
}

function initPage(data) {
  for (i of data) {
    collection=document.getElementById('toy-collection')
    card=document.createElement('div')
    card.className='card'
    card.id=`Number${i.id}`
    card.innerHTML += `<h2>${i.name}</h2>`
    card.innerHTML += `<img src="${i.image}" class="toy-avatar" />`
    card.innerHTML += `<p>${i.likes} Likes </p>`
    card.innerHTML += `<button class="like-btn" id="${i.id}">Like <3</button>`
    collection.appendChild(card)
    

  }

  addListeners()

}

function addListeners() {
  for (i of document.getElementsByClassName('like-btn')) {

    i.addEventListener('click', function(e) {
      idNumber = e.target.id
      getData(howManyLikes)
    })
  }
}

function howManyLikes(data) {
  howMany = data[idNumber-1].likes
  updateLikes(`http://localhost:3000/toys/${idNumber}`)
}

function updateLikes(url) {
  howMany += 1
  strr = `likes: ${howMany}`
  //console.log(`updateLikes ${howMany}`)
  fetch (url, {
    method:'PATCH',
   headers: { 'Content-Type': 'application/json'},
   // accept: 'application.json', },
     body:JSON.stringify({likes: howMany})
    })
    .then(x = document.getElementById(card.id=`Number${idNumber}`).querySelector('p') ) 
    .then(x.innerHTML = `${howMany} Likes`)
   //.then(console.log(x))
}

function latestID(data) {
  latest = 0
  for (i of data) {
    latest += 1 }
}