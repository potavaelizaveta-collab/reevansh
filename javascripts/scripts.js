document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.mainMenu')
  const menuToggle = menu?.querySelector('.menu-toggle')
  const menuLinks = menu?.querySelectorAll('.mainMenuLink') ?? []

  function setMenuOpen(isOpen) {
    if (!menu || !menuToggle) return

    menu.classList.toggle('menu-open', isOpen)
    document.body.classList.toggle('mobile-menu-open', isOpen)
    menuToggle.setAttribute('aria-expanded', String(isOpen))
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню')
  }

  menuToggle?.addEventListener('click', function () {
    setMenuOpen(!menu.classList.contains('menu-open'))
  })

  menuLinks.forEach((link) => {
    link.addEventListener('click', function () {
      setMenuOpen(false)
    })
  })

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setMenuOpen(false)
    }
  })

  const sliders = document.querySelectorAll('.events-slider-wrapper')

  sliders.forEach((sliderWrapper) => {
    const slides = sliderWrapper.querySelectorAll('.events-slide')
    const dots = sliderWrapper.nextElementSibling?.classList.contains('events-dots')
      ? sliderWrapper.nextElementSibling.querySelectorAll('span')
      : []

    if (!slides.length) return

    let current = 0

    function updateSlider() {
      slides.forEach((slide) => {
        slide.classList.remove('left', 'active', 'right', 'hidden')
      })

      dots.forEach((dot) => {
        dot.classList.remove('active')
      })

      const left = (current - 1 + slides.length) % slides.length
      const center = current
      const right = (current + 1) % slides.length
      const hidden = (current + 2) % slides.length

      slides[left].classList.add('left')
      slides[center].classList.add('active')
      slides[right].classList.add('right')

      if (slides.length > 3) {
        slides[hidden].classList.add('hidden')
      }

      dots[current]?.classList.add('active')
    }

    updateSlider()

    setInterval(() => {
      current = (current + 1) % slides.length
      updateSlider()
    }, 3000)
  })
})
