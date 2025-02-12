gsap.registerPlugin(ScrollTrigger)

function nav() {
  let originalTheme = { ...colorThemes.getTheme('dark') }

  $('[data-wf--switch-to-theme--variant]').each(function () {
    // let originalTheme = $(this).attr('data-wf--switch-to-theme--variant') // Store original theme
    let currentTheme = originalTheme // Keep track of current theme

    ScrollTrigger.create({
      trigger: $(this),
      start: 'top 10%',
      end: 'bottom 10%',
      onToggle: ({ self, isActive }) => {
        if (isActive) {
          let newTheme = colorThemes.getTheme(
            $(this).attr('data-wf--switch-to-theme--variant')
          )
          currentTheme = newTheme // Update to the new theme
          gsap.to('.nav_component', {
            ...newTheme,
            duration: 0.2,
          })
          if ($(this).siblings('.section_wrap').length > 0) {
            gsap.to('.nav_bg', {
              width: 'calc(100vw - 1.25rem)',
              duration: 0.3,
            })
          } else {
            gsap.to('.nav_bg', {
              width: '100vw',
              duration: 0.3,
            })
          }
        } else {
          // Animate back to the original theme
          gsap.to('.nav_component', {
            ...colorThemes.getTheme('dark'),
            duration: 0.2,
          })

          gsap.to('.nav_bg', {
            width: '100vw', // Reset width or adjust accordingly
            duration: 0.3,
          })
        }
      },
    })
  })

  const navbarMenu = document.querySelector('.nav_component')
  const offsetY = 100
  const scrollThreshold = offsetY + 300 // 100px (offsetY) + 300px = 400px
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

    if (
      window.scrollY > scrollThreshold &&
      window.scrollY > oldScroll &&
      navbarMenu.classList.contains('is-active')
    ) {
      // when scrolling DOWN
      navbarMenu.classList.add('is-scrolled')
    } else {
      // when scrolling UP or below the threshold
      navbarMenu.classList.remove('is-scrolled')
    }

    oldScroll = window.scrollY
  })
}

export default nav
