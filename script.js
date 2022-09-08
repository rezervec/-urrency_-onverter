input_value = document.querySelector('#input_value')
get_value = document.querySelector('#get_value')
select_into = document.querySelector('#select_into')
select_from = document.querySelector('#select_from')

info_into = document.querySelector('.info_into')
info_from = document.querySelector('.info_from')
app_name = document.querySelector('.app_name')

// определяем локаль браузера
var lang = navigator.language || navigator.userLanguage


// после загрузки DOM меняем соответствующие значения относительно локали
window.addEventListener('load', () => {
  if (lang == 'ru') {
    select_from.value = 'USD'
  }
  else {
    select_into.value = 'USD'
    info_into.innerHTML = 'Enter value'
    info_from.innerHTML = 'Result:'
    app_name.innerHTML = 'Currency Converter'
  }
  console.log(`Your language is: '${lang}'`)
})


let url = 'https://www.cbr-xml-daily.ru/daily_json.js'

// записываем актуальные данные в формате json в переменную rates
fetch(url).then(response => response.json()).then(function (data) {
  let rateUSD = data.Valute.USD.Value; // стоимость доллара
  let rateEUR = data.Valute.EUR.Value; // стоимость евро
  rates = {'USD':rateUSD, 'EUR':rateEUR, 'RUB':'1'} // словарь с валютами в json
})


input_value.addEventListener("input", () =>{ // при введении значения
  GetResult()
})
select_into.addEventListener("change", () =>{ // при выборе селекта 'из валюты'
  GetResult()
})
select_from.addEventListener("change", () =>{ // при выборе селекта 'в валюту'
  GetResult()
})

// обновление результата - введённое число * выбранное значение'из' / выбранное значение'в'
function GetResult() {
  get_value.innerHTML = ( input_value.value * rates[select_into.value] / rates[select_from.value] ).toFixed(4)
}