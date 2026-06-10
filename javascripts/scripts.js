document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.mainMenu')
  let menuToggle = menu?.querySelector('.menu-toggle')

  if (menu && !menuToggle) {
    menuToggle = document.createElement('button')
    menuToggle.className = 'menu-toggle'
    menuToggle.type = 'button'
    menuToggle.setAttribute('aria-label', 'Открыть меню')
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.innerHTML = '<span></span><span></span><span></span>'
    menu.prepend(menuToggle)
  }

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

  const spaceSliders = document.querySelectorAll('.space-page .longread-left')

  spaceSliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('img'))

    if (slides.length < 2) return

    const dots = document.createElement('div')
    dots.className = 'space-slider-dots'

    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === 0)

      const dot = document.createElement('button')
      dot.type = 'button'
      dot.setAttribute('aria-label', `Показать изображение ${index + 1}`)
      dot.classList.toggle('active', index === 0)
      dots.append(dot)
    })

    slider.append(dots)

    const dotButtons = Array.from(dots.querySelectorAll('button'))
    let current = 0
    let touchStartX = 0
    let touchStartY = 0
    let autoplay

    function showSlide(index) {
      current = index
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === current)
      })
      dotButtons.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === current)
      })
    }

    function restartAutoplay() {
      clearInterval(autoplay)
      autoplay = setInterval(() => {
        showSlide((current + 1) % slides.length)
      }, 3000)
    }

    dotButtons.forEach((dot, index) => {
      dot.addEventListener('click', function () {
        showSlide(index)
        restartAutoplay()
      })
    })

    slider.addEventListener(
      'touchstart',
      function (event) {
        touchStartX = event.touches[0].clientX
        touchStartY = event.touches[0].clientY
      },
      { passive: true }
    )

    slider.addEventListener(
      'touchend',
      function (event) {
        const touchEndX = event.changedTouches[0].clientX
        const touchEndY = event.changedTouches[0].clientY
        const distanceX = touchEndX - touchStartX
        const distanceY = touchEndY - touchStartY

        if (Math.abs(distanceX) < 40 || Math.abs(distanceX) <= Math.abs(distanceY)) {
          return
        }

        const nextSlide =
          distanceX < 0
            ? (current + 1) % slides.length
            : (current - 1 + slides.length) % slides.length

        showSlide(nextSlide)
        restartAutoplay()
      },
      { passive: true }
    )

    restartAutoplay()
  })
})
