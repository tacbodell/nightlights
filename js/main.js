const input = document.querySelector('#input');
const button = document.querySelector('#button');
const intro = document.querySelector('.intro');
const content = document.querySelector('#content');
const picTitle = document.querySelector('#title');
const picCopyright = document.querySelector('#copyright');
const picDate = document.querySelector('#date');
const picExplanation = document.querySelector('#explanation');
const picLink = document.querySelector('#link');
const vid = document.querySelector('#video');
const vidContainer = document.querySelector('#vidContainer');
const pic = document.querySelector('#image');

button.addEventListener('click', run);

function run() {
  let date = input.value

  if(!date) {
    alert('Please select a date!');
    return false;
  }
  
  intro.style.display = 'none'
  content.style.display = 'block';

  fetch(`https://api.nasa.gov/planetary/apod?api_key=XKjOkdsnFQ85aMXgVFrg5TWWHAwoYr4ODuE6azOT&date=${date}`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data);
    picDate.innerHTML = reformatDate(date);
    picTitle.innerHTML = data.title;
    !data.copyright ?
      picCopyright.innerHTML = '' :
      picCopyright.innerHTML = data.copyright;
    picExplanation.innerHTML = data.explanation;
    picLink.href = data.hdurl;

    if (data.media_type === 'image') {
      vid.src = '';
      vidContainer.style.display = 'none';
      pic.src = data.hdurl;
    } else { 
      pic.src = '';
      vidContainer.style.display = 'block';
      vid.src = data.url;
    };
  })
  .catch(err => {
    console.log(`error ${err}`)
  })
}


function reformatDate(date) { // Reformats date from 'yyyy-mm-dd' to 'mm-dd-yyyy'
  let split = date.split('-');
  let newDate = [];
  newDate.push(split[1],split[2],split[0]);
  return newDate.join('/');
}
