function setData(element, data){
  element.innerHTML = `
    <section class="result">
      <p>Location: ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
      <p>Temprature: ${data.current.temp_c} &#8451;</p>
      <p class="icon">Wheather: ${data.current.condition.text} <img src="https:${data.current.condition.icon}" alt="wheater icon"></p>
    </section>
  `;
}

function formSubmit(e) {
  e.preventDefault();

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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('form').addEventListener('submit', formSubmit);
})