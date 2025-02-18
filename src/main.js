import global from './js/global'
import $ from 'jquery'

import home from './js/pages/home'
import './css/style.css'
import initVimeoPlayer from './js/effects/vimeoPlayer'
import initModalBasic from './js/effects/modal'

// Main function to determine which scripts to run
function main() {
  const pageWrapper = document.querySelector('body')
  global()
  initVimeoPlayer()
  initModalBasic()

  $('.video-slider_wrap').each(function () {
    let slider = $(this)
    let slides = $(this).find('.video-slider_item')

    function makeActive(index) {
      slides.removeClass('is-active')
      let activeSlide = slides.eq(index).addClass('is-active')

      slides.find('video').each(function () {
        $(this)[0].pause()
      })

      activeSlide.find('video')[0].play()

      slider.css('--transform', index * -100 + '%')
    }
    makeActive(1)

    slides.on('mouseenter', function () {
      let slideIndex = $(this).index()
      makeActive(slideIndex)
      console.log('made active')
    })

    let startX
    let endX
    slider.on('touchstart', function (e) {
      startX = e.originalEvent.touches[0].pageX
    })
    slider.on('touchend', function (e) {
      endX = e.originalEvent.changedTouches[0].pageX
      let activeIndex = slides.filter('.is-active').index()

      if (startX - endX < -10 && activeIndex > 0) {
        makeActive(activeIndex - 1)
      } else if (startX - endX > 10 && activeIndex < slides.length - 1) {
        makeActive(activeIndex + 1)
      }
    })
  })

  if (pageWrapper.classList.contains('home')) {
    home()
  } else if (pageWrapper.classList.contains('customer-stories-detail')) {
    // flipRelatedImages()
  }
}

main()
