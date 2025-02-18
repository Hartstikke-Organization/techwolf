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
    }
    makeActive(1)

    slides.on('mouseenter', function () {
      let slideIndex = $(this).index()
      makeActive(slideIndex)
      console.log('made active')
    })
  })

  if (pageWrapper.classList.contains('home')) {
    home()
  } else if (pageWrapper.classList.contains('customer-stories-detail')) {
    // flipRelatedImages()
  }
}

main()
