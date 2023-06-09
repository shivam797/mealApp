console.log('helo');

// let searchText = document.getElementById('searchText');

// let json = {method : 'POST',
//             headers :{
//                         "Content-type" : "application/json"
//                      }
//             }

// searchText.addEventListener('keydown',function(e){
//     // console.log(e);
//     // console.log('search text', searchText.value);
//     // let text = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+searchText.value;
//     // console.log(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.value}`);

//     let obj = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.value}`).then((response) => {return response.json();})
//     .then((data)=>{
//         console.log(JSON.stringify(data));
//         return data;
//     }).catch(function(err){
//         console.log('err', err);
//     });

//     console.log('obj=>', obj);
//     // console.log('data', data);
// });

let list = document.getElementById('list');
let arr =[];
let fav = document.getElementById('toggle');//toggling of fav bar


let searchText = document.getElementById('searchText');

let displayFav = document.getElementById('fav-list');// to add element of html

let json = {
  method: 'GET',
  headers: {
    "Content-type": "application/json"
  }
};

searchText.addEventListener('keyup', async function (_e) {
  try {
    let text = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchText.value;
    console.log(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.value}`);

    let response = await fetch(text);
    let data = await response.json();

    console.log(data);
    // Use the data as needed here

  } catch (err) {
    console.log('err', err);
  }
});

function getMealDetail(){

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.value.trim()}`)
    .then((response) => { return response.json(); })
    .then((data) => {
      // console.log(JSON.stringify(data));
      console.log('data', data);
      // console.log('meassage', data.meals[0]);
      let txt = "";
      // for(let ele of data.meals){
      //   console.log(ele.strMealThumb);
      // } 
      

      for (let ele of data.meals) {
        let temp = JSON.stringify(ele).replaceAll('"', '&');
        let ht = `<div class="image" data-id="${ele.idMeal}">
                <div class="place">
                    <img src="${ele.strMealThumb}" height="60%" width="60%" alt="error">
                </div>

                <div class="display">
                    <h4>${ele.strMeal}</h4>
                    <button class="button height" onclick='displayDetails("${ele.idMeal}")'>Details</button>
                    <button class="button width height" onclick ='addFavorite("${ele.idMeal}")'>Add To Fav</button>
                </div>                
            </div> `;
            
          txt += ht;
      }
      list.innerHTML = txt;     

    }).catch(function (err) {
      console.log('err', err);
    });

  
}

// to add object in an array of favorite list
async function addFavorite(ele){
  // console.log('ele',ele);
  // let num = ele.replaceAll('&', '"');
  // console.log('num', num);
  // let temp = JSON.parse(num);
  let num = await fetchDatabyId(ele);
  
    // console.log(num);
    const temp = arr.filter(function(ele){
      return ele.idMeal == num.meals[0].idMeal;
    });
    console.log('is present or not:',temp);
    if(temp.length == 0){
      arr.push(num.meals[0]);
    }
    else{
      alert('<h1>element is already added</h1>');
    }
    // await addFavlist();
    displayFavoriteList();
}

async function displayDetails(ele){
  let num = await fetchDatabyId(ele);
  console.log('display', num);

}

// fetch obj using obj.idMeal
async function fetchDatabyId(ele){
  let temp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ele}`);  
  return await temp.json();
}



function printFavorite(){
  // event.preventDefault();
  let ht = "";  
  console.log(arr);
  for(ele of arr){
    var text =`
    <div class="fav-food">
                <div class="fav-image">
                    <img src="${ele.strMealThumb}" alt="error" height="80%" width="70%" >
                </div>  
                <div class="fav-button">
                    <button class="button height">Details</button>
                    <button class="button width height" onclick ='deletefav("${ele.idMeal}")'>Remove</button>
                </div>
    </div>`;

    ht+=text;    
    
  }
  displayFav.innerHTML = ht;
  fav.classList.toggle('display1')
}

//<i class="fa-sharp fa-solid fa-xmark"></i>&nbsp;
function displayFavoriteList(){
  let ht = "";  
  console.log(arr);
  for(ele of arr){
    var text =`
    <div class="fav-food">
                <div class="fav-image">
                    <img src="${ele.strMealThumb}" alt="error" height="80%" width="70%" >
                </div>  
                <div class="fav-button">
                    <button class="button height">Details</button>
                    <button class="button width height" onclick ='deletefav("${ele.idMeal}")'>Remove</button>
                </div>
    </div>`;

    ht+=text; 
    
    
  }
  displayFav.innerHTML = ht;
}


function closeFavorite(){
  fav.classList.toggle('display1');
}


async function deletefav(ele){
  let temp = await fetchDatabyId(ele);
  let index = arr.findIndex(obj =>{
    return obj.idMeal === temp.meals[0].idMeal;
  });
  console.log(arr[index]);
  arr.splice(index, 1);
  displayFavoriteList();
}



let detail = document.getElementById('detail');

async function displayDetails(ele){
  let temp = await fetchDatabyId(ele);
  // detail.classList.add('detail'); 


  let txt = `<button class="position1" onclick='closeDisplayDetail()'>X</button>
  <div class="detail-fav">
      <div class="text-detail">
          <h2 class="text">${temp.meals[0].strMeal}</h2>
          <p class="text">${temp.meals[0].strInstructions}
          </p>
      </div>
      <div class="detail-image">
          <img src="${temp.meals[0].strMealThumb}" height="80%" width="50%" alt="">
      </div>
      <div>
          <a href="${temp.meals[0].strYoutube}" target ="_blank">Watch video now</a>
      </div>
  </div>`;

  detail.innerHTML = txt;
  detail.classList.toggle('display1');
}

function closeDisplayDetail(){
  detail.classList.toggle('display1');
}

