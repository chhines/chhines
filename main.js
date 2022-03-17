const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const input = document.querySelector('input');
var imageArray = {};
var current = 0;
console.log(mySearch.value);

async function queryAPI(){
    const response = await fetch(" https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    listBreeds(data.message);
}

function listBreeds(breedList){
    document.getElementById("breed").innerHTML = `
        <select id="Select" onchange="getBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList).map(function(breed){
                if(breed.includes(mySearch.value))
                    return `<option>${breed}</option>`;
            })}
        </select>
    `;
}

async function getBreed(breed){
    if(document.getElementById("Select").options.selectedIndex != 0){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        imageArray = data.message;
        createGallery(data.message);
    }
    else{
        document.getElementById("gallery").children[0].remove();
    }
}

function createGallery(images){
    document.getElementById("gallery").innerHTML = `
    <div class="picture" style="background-image: url('${images[0]}')"></div>
    `
}

function nextSlide() {
    current++;
    if(current > (imageArray.length - 1)){
        current = 0;
    }
    document.getElementById("gallery").innerHTML = `
    <div class="picture" style="background-image: url('${imageArray[current]}')"></div>
    `
  };
  
function prevSlide() {
    current--;
    if(current < 0){
        current = (imageArray.length - 1);
    }
    document.getElementById("gallery").innerHTML = `
    <div class="picture" style="background-image: url('${imageArray[current]}')"></div>
    `
  };

    next.addEventListener('click', e => {
        nextSlide();
    });

    prev.addEventListener('click', e => {
        prevSlide();
    });

    input.addEventListener('change', updateValue);

    function updateValue(e) {
        queryAPI();
    }

    queryAPI();