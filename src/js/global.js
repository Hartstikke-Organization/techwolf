import nav from './nav'
import { BlurScrollEffect as BlurScrollEffect1 } from './effects/textEffect'

// Registers the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger)

function global() {
  const init = () => {
    const effects = [
      {
        selector: 'h1,h2,h3,h4,h5,.h1,.h2,.h3,.h4,.h5',
        effect: BlurScrollEffect1,
      },
    ]

    // Iterate over each effect configuration and apply the effect to all matching elements
    effects.forEach(({ selector, effect }) => {
      document.querySelectorAll(selector).forEach((el) => {
        new effect(el)
      })
    })
  }

  init()
  document.querySelector('body').classList.add('visible')
  //
  nav()
}

export default global
