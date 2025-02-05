import global from './js/global'

import home from './js/pages/home'
import './css/style.css'

// Main function to determine which scripts to run
function main() {
  console.log('hi')
  const pageWrapper = document.querySelector('body')
  global()

  if (pageWrapper.classList.contains('home')) {
    home()
  } else if (pageWrapper.classList.contains('product')) {
    // product()
  }
}

main()
