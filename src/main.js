import global from './js/global'
import $ from 'jquery'

import home from './js/pages/home'
import './css/style.css'
import initVimeoPlayer from './js/effects/vimeoPlayer'
import initModalBasic from './js/effects/modal'
import initTabSystem from './js/effects/tabSystem'

// Main function to determine which scripts to run
function main() {
  const pageWrapper = document.querySelector('body')
  global()
  initVimeoPlayer()
  initModalBasic()
  initTabSystem()

  $('.video-slider_wrap').each(function () {
    let slider = $(this)
    let slides = $(this).find('.video-slider_item')

    function makeActive(index) {
      slides.removeClass('is-active')
      let activeSlide = slides.eq(index).addClass('is-active')

      slides.find('video').each(function () {
        $(this)[0].pause()
      })

      activeSlide.find('video')[0] && activeSlide.find('video')[0].play()
    }
    makeActive(1)

    slides.on('mouseenter', function () {
      let slideIndex = $(this).index()
      makeActive(slideIndex)
      console.log('made active')
    })
  })

  /**
   *
   *
   */
  // Testing
  /**
   *
   *
   */
  document.querySelectorAll('.text-rich-text blockquote').forEach((quote) => {
    console.log(quote)
    if (!quote) return

    const newContainer = document.createElement('div') // New wrapper
    newContainer.classList.add('quote-detail_component')

    let quoteTextWrap = document.createElement('div') // Wrapper for quote text
    quoteTextWrap.classList.add('quote-detail_quote-wrap')

    let maxWidthDiv = document.createElement('div') // New div for max width constraint
    maxWidthDiv.classList.add('max-width-medium')

    let attributionDiv = document.createElement('div') // Wrapper for author info
    attributionDiv.classList.add('author_item')

    let authorDetails = document.createElement('div') // New div inside author_item
    authorDetails.classList.add('author_details')

    let isFirstAuthorText = true // Track first author element

    // Create the quote marks container
    const quoteMarksDiv = document.createElement('div')
    quoteMarksDiv.classList.add('quote-detail_quote-marks', 'icon-embed-xsmall', 'w-embed')
    quoteMarksDiv.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.82 14.1746C3.86 14.1746 3.04667 13.9479 2.38 13.4946C1.74 13.0413 1.26 12.4413 0.94 11.6946C0.646666 10.9479 0.5 10.1479 0.5 9.29461C0.5 8.06794 0.753333 6.90794 1.26 5.81461C1.79333 4.72127 2.47333 3.76128 3.3 2.93461C4.15333 2.08128 5.07333 1.42794 6.06 0.974609L8.82 3.01461C8.1 3.33461 7.42 3.72128 6.78 4.17461C6.14 4.60128 5.58 5.08128 5.1 5.61461C4.64667 6.14794 4.3 6.69461 4.06 7.25461L4.26 7.37461C4.42 7.26794 4.59333 7.18794 4.78 7.13461C4.99333 7.08128 5.27333 7.05461 5.62 7.05461C6.1 7.05461 6.58 7.17461 7.06 7.41461C7.56667 7.65461 7.98 8.01461 8.3 8.49461C8.64667 8.97461 8.82 9.58794 8.82 10.3346C8.82 11.1613 8.63333 11.8679 8.26 12.4546C7.88667 13.0146 7.39333 13.4413 6.78 13.7346C6.16667 14.0279 5.51333 14.1746 4.82 14.1746ZM14.62 14.1746C13.66 14.1746 12.8467 13.9479 12.18 13.4946C11.54 13.0413 11.06 12.4413 10.74 11.6946C10.4467 10.9479 10.3 10.1479 10.3 9.29461C10.3 8.06794 10.5533 6.90794 11.06 5.81461C11.5933 4.72127 12.2733 3.76128 13.1 2.93461C13.9533 2.08128 14.8733 1.42794 15.86 0.974609L18.62 3.01461C17.9 3.33461 17.22 3.72128 16.58 4.17461C15.94 4.60128 15.38 5.08128 14.9 5.61461C14.4467 6.14794 14.1 6.69461 13.86 7.25461L14.06 7.37461C14.22 7.26794 14.3933 7.18794 14.58 7.13461C14.7933 7.08128 15.0733 7.05461 15.42 7.05461C15.9 7.05461 16.38 7.17461 16.86 7.41461C17.3667 7.65461 17.78 8.01461 18.1 8.49461C18.4467 8.97461 18.62 9.58794 18.62 10.3346C18.62 11.1613 18.4333 11.8679 18.06 12.4546C17.6867 13.0146 17.1933 13.4413 16.58 13.7346C15.9667 14.0279 15.3133 14.1746 14.62 14.1746Z" fill="currentColor"></path>
      </svg>
    `

    // Add the quote marks before the quote content
    maxWidthDiv.appendChild(quoteMarksDiv)

    quote.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        const textParagraph = document.createElement('p')
        textParagraph.textContent = node.textContent.trim()
        textParagraph.classList.add('quote-detail_quote')
        maxWidthDiv.appendChild(textParagraph)
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName.startsWith('H')) {
          node.classList.add('margin-bottom', 'margin-small')
        }

        if (node.tagName === 'P') {
          node.classList.add('tc-grey')
        }

        if (node.tagName === 'STRONG' || node.tagName === 'CODE') {
          const authorParagraph = document.createElement('div')
          authorParagraph.textContent = node.textContent.trim()

          if (isFirstAuthorText) {
            authorParagraph.classList.add('author_name', 'text-weight-semibold', 'tc-primary')
            isFirstAuthorText = false
          } else {
            authorParagraph.classList.add('author_text')
          }

          authorDetails.appendChild(authorParagraph)
        } else {
          maxWidthDiv.appendChild(node.cloneNode(true))
        }
      }
    })

    // Append max-width wrapper inside quote text wrap
    if (maxWidthDiv.childNodes.length > 0) {
      quoteTextWrap.appendChild(maxWidthDiv)
    }

    if (quoteTextWrap.childNodes.length > 0) {
      newContainer.appendChild(quoteTextWrap)
    }

    if (authorDetails.childNodes.length > 0) {
      attributionDiv.appendChild(authorDetails)
    }

    if (attributionDiv.childNodes.length > 0) {
      newContainer.appendChild(attributionDiv)
    }

    quote.replaceWith(newContainer)
  })

  /**
   *
   *
   */
  // testing -- STOP
  /**
   *
   *
   */

  // const uspContainer = document.getElementById('usp-items') // Single element
  // const destination = document.getElementById('usp-destination')

  // if (!destination || !uspContainer) return

  // const items = []
  // let currentItem = null

  // Array.from(uspContainer.children).forEach((node) => {
  //   if (node.tagName === 'P' && node.textContent.trim() === '') {
  //     node.remove() // 🔥 Remove empty <p> elements
  //   } else if (node.tagName.startsWith('H')) {
  //     if (currentItem) items.push(currentItem)
  //     currentItem = { title: node.textContent.trim(), description: '', iconSrc: '' }
  //   } else if (node.tagName === 'P' && currentItem) {
  //     currentItem.description = node.textContent.trim()
  //   } else if (node.tagName === 'FIGURE' && currentItem) {
  //     const img = node.querySelector('img')
  //     if (img) currentItem.iconSrc = img.src
  //   }
  // })

  // // Push last item if exists
  // if (currentItem) items.push(currentItem)

  // // Create and append new elements to the destination div
  // items.forEach((item) => {
  //   const iconboxItem = document.createElement('div')
  //   iconboxItem.classList.add('iconbox_item')

  //   const wrap = document.createElement('div')
  //   wrap.classList.add('iconbox_item-wrap', 'iconbox_padding')

  //   const icon = document.createElement('img')
  //   icon.classList.add('iconbox_icon')
  //   if (item.iconSrc) icon.setAttribute('src', item.iconSrc)

  //   const marginDiv = document.createElement('div')
  //   marginDiv.classList.add('margin-bottom', 'margin-large')

  //   const contentDiv = document.createElement('div')
  //   contentDiv.classList.add('benefits_item-content')

  //   const title = document.createElement('h3')
  //   title.classList.add('iconbox_title', 'h5')
  //   title.textContent = item.title

  //   const description = document.createElement('p')
  //   description.textContent = item.description

  //   contentDiv.appendChild(title)
  //   contentDiv.appendChild(description)
  //   wrap.appendChild(icon)
  //   wrap.appendChild(marginDiv)
  //   wrap.appendChild(contentDiv)
  //   iconboxItem.appendChild(wrap)
  //   destination.appendChild(iconboxItem)
  // })
  // uspContainer.innerHTML = ''

  if (pageWrapper.classList.contains('home')) {
    home()
  } else if (pageWrapper.classList.contains('customer-stories-detail')) {
    // flipRelatedImages()
  }
}

main()
