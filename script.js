(function myFunction() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
   } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
   }
})();

function showError(error) {
   switch (error.code) {
      case error.PERMISSION_DENIED:
         alert("User denied the request for Geolocation.");
         break;
      case error.POSITION_UNAVAILABLE:
         alert("Location information is unavailable.");
         break;
      case error.TIMEOUT:
         alert("The request to get user location timed out.");
         break;
      case error.UNKNOWN_ERROR:
         alert("An unknown error occurred.");
         break;
   }
}

// const apiKey = 678719a5aeae44c0b14e7b4785518d6d;

async function showPosition(position) {
   const lat = position.coords.latitude;
   const long = position.coords.longitude;
   const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=678719a5aeae44c0b14e7b4785518d6d`;
   const promise = await fetch(url);
   const response = await promise.json();
   fillDetails(response);
}

function fillDetails(response) {
   document.querySelector(".tz").innerText = response.results[0].timezone.name;
   document.querySelector(".lat").innerText = response.results[0].lat;
   document.querySelector(".long").innerText = response.results[0].lon;
   document.querySelector(".std").innerText =
      response.results[0].timezone.offset_STD;
   document.querySelector(".std-sec").innerText =
      response.results[0].timezone.offset_STD_seconds;
   document.querySelector(".dst").innerText =
      response.results[0].timezone.offset_DST;
   document.querySelector(".dst-sec").innerText =
      response.results[0].timezone.offset_DST_seconds;
   document.querySelector(".country").innerText = response.results[0].country;
   document.querySelector(".postcode").innerText = response.results[0].postcode;
   document.querySelector(".city").innerText = response.results[0].city;
}

/*Search*/

// const err = document.createElement("h4");
// err.color = "red";
// err.setAttribute("class", "head");
// err.innerText = "Please enter a valid address!";
// document.querySelector(".search-division").appendChild(err);
// console.log(err.style.className);

document.querySelector(".search-btn").addEventListener("click", searchLocation);

async function searchLocation() {
   const searchStr = document.querySelector(".search").value.trim();
   if (searchStr.length === 0) {
      document.querySelector(".search-division").style.display = "none";
      document.querySelector(".head").style.display = "block";
   } else {
      const url = `https://api.geoapify.com/v1/geocode/search?text=${searchStr}&format=json&apiKey=678719a5aeae44c0b14e7b4785518d6d`;
      const promise = await fetch(url);
      const response = await promise.json();
      if (response.results.length === 0) {
         document.querySelector(".search-division").style.display = "none";
         document.querySelector(".search").value = "";
         document.querySelector(".head").style.display = "block";
      } else {
         document.querySelector(".search-division").style.display = "block";
         document.querySelector(".head").style.display = "none";
         const lat = response.results[0].lat;
         const lon = response.results[0].lon;
         const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=678719a5aeae44c0b14e7b4785518d6d`;
         const promise2 = await fetch(url);
         const response2 = await promise2.json();
         fillSearchDetails(response2);
      }
   }
}

function fillSearchDetails(response) {
   document.getElementById("search-tz").innerText =
      response.results[0].timezone.name;
   document.getElementById("search-lat").innerText = response.results[0].lat;
   document.getElementById("search-long").innerText = response.results[0].lon;
   document.getElementById("search-std").innerText =
      response.results[0].timezone.offset_STD;
   document.getElementById("search-std-sec").innerText =
      response.results[0].timezone.offset_STD_seconds;
   document.getElementById("search-dst").innerText =
      response.results[0].timezone.offset_DST;
   document.getElementById("search-dst-sec").innerText =
      response.results[0].timezone.offset_DST_seconds;
   document.getElementById("search-country").innerText =
      response.results[0].country;
   document.getElementById("search-postcode").innerText =
      response.results[0].postcode;
   document.getElementById("search-city").innerText = response.results[0].city;
}
