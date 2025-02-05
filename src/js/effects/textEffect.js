// Import the TextSplitter class for handling text splitting.
import { TextSplitter } from '../textSplitter.js'

// Defines a class to create scroll-triggered animation effects on text.
export class BlurScrollEffect {
  constructor(textElement) {
    // Check if the provided element is valid.
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.')
    }

    this.textElement = textElement

    // Set up the effect for the provided text element.
    this.initializeEffect()
  }

  // Sets up the initial text effect on the provided element.
  initializeEffect() {
    // Callback to re-trigger animations on resize.
    const textResizeCallback = () => this.scroll()

    // Split text for animation and store the reference.
    this.splitter = new TextSplitter(this.textElement, {
      resizeCallback: textResizeCallback,
      splitTypeTypes: 'words, lines',
    })

    // Trigger the initial scroll effect.
    this.scroll()
  }

  // Animates text based on the scroll position.
  scroll() {
    // Query all individual characters in the line for animation.
    const chars = this.splitter.getChars()
    const words = this.splitter.getWords()
    const lines = this.splitter.getLines()
    gsap.fromTo(
      lines,
      {
        filter: 'blur(4px) brightness(0%)',
        willChange: 'filter',
      },
      {
        ease: 'none', // Animation easing.
        filter: 'blur(0px) brightness(100%)',
        //
        stagger: 0.1, // Delay between starting animations for each character.
        duration: 0.5,
        scrollTrigger: {
          trigger: this.textElement, // Element that triggers the animation.
          start: 'top bottom-=8%', // Animation starts when element hits bottom of viewport.
          end: 'bottom center+=15%', // Animation ends in the center of the viewport.
        },
      }
    )
  }
}
