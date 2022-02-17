function setData(element, data){
  element.innerHTML = `
    <section class="result">
        <table class="table" style="vertical-align: middle;">
          <thead>
            <tr>
              <th scope="col">Location</th>
              <th scope="col">Temprature</th>
              <th scope="col">Wheather</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data.location.name}, ${data.location.region}, ${data.location.country}</td>
              <td>${data.current.temp_c} &#8451;</td>
              <td>${data.current.condition.text} <img src="https:${data.current.condition.icon}" alt="wheater icon"></td>
            </tr>
          </tbody>
        </table>
    </section>
  `;
}

function formSubmit() {

  const city = document.getElementById('city').value;
  const result = document.getElementById('result');

  fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      "x-rapidapi-key": "40da0fbf92mshfe7a448a5fbb967p17796ejsn5fe22c938fc1"
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.error && data.error.message) {
        throw new Error(data.error.message);
      } else {
        setData(result, data);
      }
    })
    .catch(err => {
      alert(err.message);
    });

}

const images = [
  '01-weather',
  '02-weather',
  '03-weather',
  '04-weather',
  '05-weather',
];
const setBodyBackground = (images) => {
  const item = images[Math.floor(Math.random()*images.length)];
  document.body.style.background = `url('https://raw.githubusercontent.com/OlhaHolovina/code-assignment/main/img/background/${item}.jpg') repeat`;
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('submit-button').addEventListener('click', formSubmit);
  setBodyBackground(images);
})