function searchFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search-input');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myIndexList");
  li = ul.getElementsByClassName('anilink');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function searchnotesFunction() {
  // Declare variables
  var input, filter, ul, li, tampung, a, i, nf, txtValue;
  input = document.getElementById('search-input');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myIndexList");
  li = ul.getElementsByClassName('mr-20');
  nf = document.getElementById("nofound");
  tampung = [];

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
      tampung.push(i);
    }
  }

  if (tampung.length === li.length) {
    nf.style.display = "block";
  } else {
    nf.style.display = "none";
  }
}