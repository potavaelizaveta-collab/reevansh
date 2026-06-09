document.addEventListener('DOMContentLoaded', function () {
  // Проверяем, подключены ли Яндекс Карты и есть ли блок карты
  if (typeof ymaps !== 'undefined' && document.getElementById('map')) {
    ymaps.ready(initMap)
  }
})

function initMap() {
  const map = new ymaps.Map('map', {
    center: [55.7873, 37.641764],
    zoom: 16
  })

  const placemark = new ymaps.Placemark(
    [55.7873, 37.641764],
    {
      balloonContent: 'НИУ ВШЭ, ADC<br>Пантелеевская, 53'
    },
    {
      preset: 'islands#redIcon'
    }
  )

  map.geoObjects.add(placemark)
}
