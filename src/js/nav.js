gsap.registerPlugin(ScrollTrigger)

function nav() {
  const body = document.querySelector('body')
  let originalThemeColor
  if (body.classList.contains('u-theme-dark')) {
    originalThemeColor = 'dark'
  } else {
    originalThemeColor = 'light'
  }
  let originalTheme = { ...colorThemes.getTheme(originalThemeColor) }

  $('[data-animate-theme-to]').each(function () {
    let currentTheme = originalTheme // Keep track of current theme

    const defaultDuration = 0.1

    ScrollTrigger.create({
      trigger: $(this),
      start: 'top 5%',
      end: 'bottom 5%',
      onToggle: ({ self, isActive }) => {
        if (isActive) {
          let newTheme = colorThemes.getTheme($(this).attr('data-animate-theme-to'))
          currentTheme = newTheme // Update to the new theme
          gsap.to('.nav_component', {
            ...newTheme,
            duration: defaultDuration,
          })
          if ($(this).siblings('.section_wrap').length > 0) {
            gsap.to('.nav_bg', {
              width: 'calc(100vw - 1.25rem)',
              duration: defaultDuration,
            })
          } else {
            gsap.to('.nav_bg', {
              width: '100vw',
              duration: defaultDuration,
            })
          }
        } else {
          // Animate back to the original theme
          gsap.to('.nav_component', {
            ...colorThemes.getTheme(originalThemeColor),
            duration: defaultDuration,
          })

          gsap.to('.nav_bg', {
            width: '100vw', // Reset width or adjust accordingly
            duration: defaultDuration,
          })
        }
      },
    })
  })

  const navbarMenu = document.querySelector('.nav_component')
  const offsetY = 20
  const scrollThreshold = offsetY + 2000 // 100px (offsetY) + 300px = 400px
  let oldScroll = 0

  window.addEventListener('load', function () {
    if (window.scrollY > offsetY) {
      navbarMenu.classList.add('is-active')
    } else {
      navbarMenu.classList.remove('is-active')
    }
  })

  window.addEventListener('scroll', () => {
    if (window.scrollY > offsetY) {
      navbarMenu.classList.add('is-active')
    } else {
      navbarMenu.classList.remove('is-active')
    }

    if (window.scrollY > scrollThreshold && window.scrollY > oldScroll && navbarMenu.classList.contains('is-active')) {
      // when scrolling DOWN
      navbarMenu.classList.add('is-scrolled')
    } else {
      navbarMenu.classList.remove('is-scrolled')
    }

    oldScroll = window.scrollY
  })
}

export default nav
