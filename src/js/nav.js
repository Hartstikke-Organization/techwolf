import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function nav() {
  const navbarMenu = document.querySelector('.nav_wrap')
  const offsetY = 100
  const scrollThreshold = offsetY + 300 // 100px (offsetY) + 300px = 400px
  let oldScroll = 0

  if (navbarMenu) {
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
  } else {
    console.warn('Navbar menu element not found!')
  }
}

export default nav
