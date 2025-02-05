import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function global() {
  // Animate the HERO
  const animateHero = () => {}

  // Animate the FOOTER
  const animateFooter = () => {}

  const mm = gsap.matchMedia() // Create a matchMedia instance

  const init = () => {
    mm.add('(min-width: 479px)', () => {
      animateHero()
      animateFooter()
    })
  }
  init()
}

export default global
