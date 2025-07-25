function initTabSystem() {
  const wrappers = document.querySelectorAll('[data-tabs="wrapper"]')

  wrappers.forEach((wrapper) => {
    const contentItems = wrapper.querySelectorAll('[data-tabs="content-item"]')
    console.log(contentItems)
    const visualItems = wrapper.querySelectorAll('[data-tabs="visual-item"]')

    const autoplay = wrapper.dataset.tabsAutoplay === 'true'
    const autoplayDuration = parseInt(wrapper.dataset.tabsAutoplayDuration) || 5000
    const visualPosition = wrapper.dataset.tabsVisualPosition || 'left'

    let activeContent = null // keep track of active item/link
    let activeVisual = null
    let isAnimating = false
    let progressBarTween = null // to stop/start the progress bar
    let isHorizontal = false
    let visualIsRight = false

    function startProgressBar(index) {
      if (progressBarTween) progressBarTween.kill()
      const bar = contentItems[index].querySelector('[data-tabs="item-progress"]')

      if (!bar) return

      if (bar.classList.contains('is-horizontal')) isHorizontal = true
      if (visualPosition === 'right') {
        visualIsRight = true
      }

      // In this function, you can basically do anything you want, that should happen as a tab is active
      // Maybe you have a circle filling, some other element growing, you name it.
      gsap.set(bar, {
        scaleX: isHorizontal ? 0 : 1,
        scaleY: isHorizontal ? 1 : 0,
        transformOrigin: isHorizontal ? 'left center' : 'center top',
      })
      progressBarTween = gsap.to(bar, {
        scaleY: 1,
        scaleX: 1,
        duration: autoplayDuration / 1000,
        ease: 'linear',
        onComplete: () => {
          if (!isAnimating) {
            const nextIndex = (index + 1) % contentItems.length
            switchTab(nextIndex) // once bar is full, set next to active – this is important
          }
        },
      })
    }

    function switchTab(index) {
      if (isAnimating || contentItems[index] === activeContent) return

      isAnimating = true
      if (progressBarTween) progressBarTween.kill() // Stop any running progress bar here

      const outgoingContent = activeContent
      const outgoingVisual = activeVisual
      const outgoingBar = outgoingContent?.querySelector('[data-tabs="item-progress"]')

      const incomingContent = contentItems[index]
      const incomingVisual = visualItems[index]

      const incomingBar = incomingContent?.querySelector('[data-tabs="item-progress"]')

      outgoingContent?.classList.remove('active')
      outgoingVisual?.classList.remove('active')
      incomingContent?.classList.add('active')
      incomingVisual.classList.add('active')

      if (incomingContent) {
        const tl = gsap.timeline({
          defaults: { duration: 0.65, ease: 'power3.inOut' },
          onComplete: () => {
            activeContent = incomingContent
            activeVisual = incomingVisual
            isAnimating = false
            if (autoplay) startProgressBar(index) // Start autoplay bar here
          },
        })

        // Wrap 'outgoing' in a check to prevent warnings on first run of the function
        // Of course, during first run (on page load), there's no 'outgoing' tab yet!
        if (outgoingContent) {
          outgoingContent.classList.remove('active')
          outgoingVisual?.classList.remove('active')
          tl.set(outgoingBar, { transformOrigin: isHorizontal ? 'right center' : 'center bottom' })
            .to(outgoingBar, { scaleY: isHorizontal ? 1 : 0, scaleX: isHorizontal ? 1 : 0, duration: 0.3 }, 0)
            .to(outgoingVisual, { autoAlpha: 0, xPercent: visualIsRight ? 3 : -3 }, 0)
            .to(outgoingContent.querySelector('[data-tabs="item-details"]'), { height: 0 }, 0)
        }

        incomingContent.classList.add('active')
        incomingVisual.classList.add('active')
        tl.fromTo(incomingVisual, { autoAlpha: 0, xPercent: visualIsRight ? 3 : -3 }, { autoAlpha: 1, xPercent: 0 }, 0.3)
          .fromTo(incomingContent.querySelector('[data-tabs="item-details"]'), { height: 0 }, { height: 'auto' }, 0)
          .set(incomingBar, { scaleY: isHorizontal ? 1 : 0, scaleX: isHorizontal ? 0 : 1, transformOrigin: isHorizontal ? 'left center' : 'center top' }, 0)
      }
    }

    // on page load, set first to active
    // idea: you could wrap this in a scrollTrigger
    // so it will only start once a user reaches this section
    switchTab(0)

    // switch tabs on click
    contentItems.forEach((item, i) =>
      item.addEventListener('click', () => {
        if (item === activeContent) return // ignore click if current one is already active
        switchTab(i)
      })
    )
  })
}

export default initTabSystem
