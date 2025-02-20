gsap.registerPlugin(ScrollTrigger)

function nav() {
  let originalTheme = { ...colorThemes.getTheme('dark') }

  // document.querySelectorAll('.link-list__dropdown-toggle').forEach((element) => {
  //   const navMenu = document.querySelector('.nav_wrap')

  //   // Function to check if any dropdown is still open
  //   const toggleThemeClass = () => {
  //     let dropdownExists = document.querySelector('.link-list__dropdown-toggle.w--open')
  //     if (!dropdownExists) {
  //       gsap.to('.nav_wrap', {
  //         ...colorThemes.getTheme('light'),
  //         duration: 0.3,
  //       })
  //     }
  //   }

  //   // Click Event - Check if any dropdown remains open
  //   element.addEventListener('click', () => {
  //     setTimeout(toggleThemeClass, 50) // Delay slightly to wait for Webflow's class update
  //   })

  //   // Hover Events
  //   element.addEventListener('mouseenter', () => {
  //     // navMenu.classList.add('u-theme-light-text')
  //     gsap.to('.nav_wrap', {
  //       ...colorThemes.getTheme('light'),
  //       duration: 0.3,
  //     })
  //   })

  //   element.addEventListener('mouseleave', () => {
  //     gsap.to('.nav_wrap', {
  //       ...colorThemes.getTheme('dark'),
  //       duration: 0.3,
  //     })
  //   })
  // })

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
            ...colorThemes.getTheme('dark'),
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
  const offsetY = 100
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
      // when scrolling UP or below the threshold
      navbarMenu.classList.remove('is-scrolled')
    }

    oldScroll = window.scrollY
  })
}

export default nav
