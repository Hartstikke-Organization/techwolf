import nav from './nav'
import { BlurScrollEffect as BlurScrollEffect1 } from './effects/textEffect'

// Registers the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger)

function global() {
  const faq = () => {
    document.querySelectorAll('.accordion_list-wrap').forEach((cmsWrap, listIndex) => {
      if (cmsWrap.dataset.scriptInitialized) return
      cmsWrap.dataset.scriptInitialized = 'true'

      const closePrevious = cmsWrap.getAttribute('data-close-previous') !== 'false'
      const closeOnSecondClick = cmsWrap.getAttribute('data-close-on-second-click') !== 'false'
      const openOnHover = cmsWrap.getAttribute('data-open-on-hover') === 'true'
      const openByDefault =
        cmsWrap.getAttribute('data-open-by-default') !== null && !isNaN(+cmsWrap.getAttribute('data-open-by-default')) ? +cmsWrap.getAttribute('data-open-by-default') : false

      let previousIndex = null,
        closeFunctions = []

      cmsWrap.querySelectorAll('.accordion_component').forEach((thisCard, cardIndex) => {
        const button = thisCard.querySelector('.accordion_toggle_button')
        const content = thisCard.querySelector('.accordion_content_wrap')
        const icon = thisCard.querySelector('.accordion_toggle_icon')

        if (!button || !content || !icon) return console.warn('Missing elements:', thisCard)

        button.setAttribute('aria-expanded', 'false')
        button.setAttribute('id', 'accordion_button_' + listIndex + '_' + cardIndex)
        content.setAttribute('id', 'accordion_content_' + listIndex + '_' + cardIndex)
        button.setAttribute('aria-controls', content.id)
        content.setAttribute('aria-labelledby', button.id)
        content.style.display = 'none'

        const refresh = () => {
          tl.invalidate()
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh()
        }
        const tl = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: 'power1.inOut' }, onComplete: refresh, onReverseComplete: refresh })
        tl.set(content, { display: 'block' })
        tl.fromTo(content, { height: 0 }, { height: 'auto' })
        tl.fromTo(icon, { rotate: 0 }, { rotate: -180 }, '<')

        const closeAccordion = () =>
          thisCard.classList.contains('is-opened') && (thisCard.classList.remove('is-opened'), tl.reverse(), button.setAttribute('aria-expanded', 'false'))
        closeFunctions[cardIndex] = closeAccordion

        const openAccordion = (instant = false) => {
          if (closePrevious && previousIndex !== null && previousIndex !== cardIndex) closeFunctions[previousIndex]?.()
          previousIndex = cardIndex
          button.setAttribute('aria-expanded', 'true')
          thisCard.classList.add('is-opened')
          instant ? tl.progress(1) : tl.play()
        }
        if (openByDefault === cardIndex) openAccordion(true)

        button.addEventListener('click', () => (thisCard.classList.contains('is-opened') && closeOnSecondClick ? (closeAccordion(), (previousIndex = null)) : openAccordion()))
        if (openOnHover) button.addEventListener('mouseenter', () => openAccordion())
      })
    })
  }

  const init = () => {
    faq()
    // const effects = [
    //   {
    //     selector: 'h1,h2,h3,h4,h5,.h1,.h2,.h3,.h4,.h5',
    //     effect: BlurScrollEffect1,
    //   },
    // ]

    // // Iterate over each effect configuration and apply the effect to all matching elements
    // effects.forEach(({ selector, effect }) => {
    //   document.querySelectorAll(selector).forEach((el) => {
    //     new effect(el)
    //   })
    // })
  }

  init()
  document.querySelector('body').classList.add('visible')
  nav()
}

export default global
