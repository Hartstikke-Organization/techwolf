function initVimeoPlayer() {
  // ------------- MODAL --------------
  const modalGroup = document.querySelector('[data-modal-group-status]')
  const modals = document.querySelectorAll('[data-modal-name]')
  const modalTargets = document.querySelectorAll('[data-modal-target]')

  // Open modal
  modalTargets.forEach((modalTarget) => {
    modalTarget.addEventListener('click', function () {
      const modalTargetName = this.getAttribute('data-modal-target')

      // Close all modals
      modalTargets.forEach((target) => target.setAttribute('data-modal-status', 'not-active'))
      modals.forEach((modal) => modal.setAttribute('data-modal-status', 'not-active'))

      // Activate clicked modal
      document.querySelector(`[data-modal-target="${modalTargetName}"]`).setAttribute('data-modal-status', 'active')
      document.querySelector(`[data-modal-name="${modalTargetName}"]`).setAttribute('data-modal-status', 'active')

      // Set group to active
      if (modalGroup) {
        modalGroup.setAttribute('data-modal-group-status', 'active')
      }
    })
  })

  // Close modal
  document.querySelectorAll('[data-modal-close]').forEach((closeBtn) => {
    closeBtn.addEventListener('click', closeAllModals)
  })

  // Close modal on `Escape` key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeAllModals()
    }
  })

  // Function to close all modals
  function closeAllModals() {
    modalTargets.forEach((target) => target.setAttribute('data-modal-status', 'not-active'))

    if (modalGroup) {
      modalGroup.setAttribute('data-modal-group-status', 'not-active')
    }
  }

  // -
  // ------
  // -—---------
  // Select all elements that have [data-vimeo-player-init]
  const vimeoPlayers = document.querySelectorAll('[data-vimeo-player-init]')

  // Function: Play Video
  function vimeoPlayerPlay(vimeoElement, player) {
    vimeoElement.setAttribute('data-vimeo-activated', 'true')
    vimeoElement.setAttribute('data-vimeo-playing', 'true')
    player.play()
  }

  const playFunctionality = (playBtn, vimeoElement, player) => {
    playBtn &&
      playBtn.addEventListener('click', function () {
        // Always set volume to 0 first to avoid pop
        player.setVolume(0)
        vimeoPlayerPlay(vimeoElement, player)

        // If muted attribute is 'true', keep volume at 0, else 1
        if (vimeoElement.getAttribute('data-vimeo-muted') === 'true') {
          player.setVolume(0)
        } else {
          player.setVolume(1)
        }
      })
  }

  vimeoPlayers.forEach(function (vimeoElement, index) {
    // Add Vimeo URL ID to the iframe [src]
    // Looks like: https://player.vimeo.com/video/1019191082
    const vimeoVideoID = vimeoElement.getAttribute('data-vimeo-video-id')
    if (!vimeoVideoID) return
    const vimeoVideoURL = `https://player.vimeo.com/video/${vimeoVideoID}?api=1&background=1&autoplay=0&loop=0&muted=1`
    vimeoElement.querySelector('iframe').setAttribute('src', vimeoVideoURL)

    const modalParent = vimeoElement.closest('[data-modal-name]')

    // Assign an ID to each element
    const videoIndexID = 'vimeo-player-index-' + index
    vimeoElement.setAttribute('id', videoIndexID)

    const iframeID = vimeoElement.id
    const player = new Vimeo.Player(iframeID)

    // Update Aspect Ratio if [data-vimeo-update-size="true"]
    if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
      player.getVideoWidth().then(function (width) {
        player.getVideoHeight().then(function (height) {
          const beforeEl = vimeoElement.querySelector('.vimeo-player__before')
          if (beforeEl) {
            beforeEl.style.paddingTop = (height / width) * 100 + '%'
          }
        })
      })
    }

    // Loaded
    player.on('play', function () {
      vimeoElement.setAttribute('data-vimeo-loaded', 'true')
    })

    // Autoplay
    if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'false') {
      player.setVolume(1)
      player.pause()
    } else {
      player.setVolume(0)
      vimeoElement.setAttribute('data-vimeo-muted', 'true')

      // If paused-by-user === false, do scroll-based autoplay
      if (vimeoElement.getAttribute('data-vimeo-paused-by-user') === 'false') {
        function checkVisibility() {
          const rect = vimeoElement.getBoundingClientRect()
          const inView = rect.top < window.innerHeight && rect.bottom > 0
          inView ? vimeoPlayerPlay(vimeoElement, player) : vimeoPlayerPause()
        }

        // Initial check
        checkVisibility()

        // Handle scroll
        window.addEventListener('scroll', checkVisibility)
      }
    }

    // Function: Pause Video
    function vimeoPlayerPause() {
      vimeoElement.setAttribute('data-vimeo-playing', 'false')
      player.pause()
    }

    // Automatically play video from the modal
    modalTargets.forEach((modalTarget) => {
      modalTarget.addEventListener('click', function (e) {
        const modalTargetName = this.getAttribute('data-modal-target')
        const videoElement = document.querySelector(`[data-modal-name="${modalTargetName}"]`).querySelector('[data-vimeo-player-init]')

        console.log(modalTargetName)

        console.log(modalParent.getAttribute('data-modal-name'))
        if (modalTargetName === modalParent.getAttribute('data-modal-name')) {
          console.log('start playing')

          // Always set volume to 0 first to avoid pop
          player.setVolume(0)
          vimeoPlayerPlay(videoElement, player)

          // If muted attribute is 'true', keep volume at 0, else 1
          if (videoElement.getAttribute('data-vimeo-muted') === 'true') {
            player.setVolume(0)
          } else {
            player.setVolume(1)
          }
        }
      })
    })

    // Pause video when modal is closed
    document.querySelectorAll('[data-modal-close]').forEach((closeBtn) => {
      closeBtn.addEventListener('click', () => {
        vimeoPlayerPause()
        // If paused by user => kill the scroll-based autoplay
        if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'true') {
          vimeoElement.setAttribute('data-vimeo-paused-by-user', 'true')
          // Removing scroll listener (if you’d like)
          window.removeEventListener('scroll', checkVisibility)
        }
      })
    })
    // Close modal on `Escape` key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        vimeoPlayerPause()
        // If paused by user => kill the scroll-based autoplay
        if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'true') {
          vimeoElement.setAttribute('data-vimeo-paused-by-user', 'true')
          // Removing scroll listener (if you’d like)
          window.removeEventListener('scroll', checkVisibility)
        }
      }
    })

    // Click: Play
    const playBtn = vimeoElement.querySelector('[data-vimeo-control="play"]')
    playFunctionality(playBtn, vimeoElement, player)

    const setToPause = () => {
      pauseBtn.addEventListener('click', function () {
        vimeoPlayerPause()
        // If paused by user => kill the scroll-based autoplay
        if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'true') {
          vimeoElement.setAttribute('data-vimeo-paused-by-user', 'true')
          // Removing scroll listener (if you’d like)
          window.removeEventListener('scroll', checkVisibility)
        }
      })
    }

    const setToMute = () => {
      muteBtn.addEventListener('click', function () {
        if (vimeoElement.getAttribute('data-vimeo-muted') === 'false') {
          player.setVolume(0)
          vimeoElement.setAttribute('data-vimeo-muted', 'true')
        } else {
          player.setVolume(1)
          vimeoElement.setAttribute('data-vimeo-muted', 'false')
        }
      })
    }

    // Click: Pause
    const pauseBtn = vimeoElement.querySelector('[data-vimeo-control="pause"]')
    if (pauseBtn) {
      setToPause()
    }

    // Click: Mute
    const muteBtn = vimeoElement.querySelector('[data-vimeo-control="mute"]')
    if (muteBtn) {
      setToMute()
    }

    // Fullscreen
    // Check if Fullscreen API is supported
    const fullscreenSupported = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)

    const fullscreenBtn = vimeoElement.querySelector('[data-vimeo-control="fullscreen"]')

    // Hide the fullscreen button if not supported
    if (!fullscreenSupported && fullscreenBtn) {
      fullscreenBtn.style.display = 'none'
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const fullscreenElement = document.getElementById(iframeID)
        if (!fullscreenElement) return

        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement

        if (isFullscreen) {
          // Exit fullscreen
          vimeoElement.setAttribute('data-vimeo-fullscreen', 'false')
          ;(document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen).call(document)
        } else {
          // Enter fullscreen
          vimeoElement.setAttribute('data-vimeo-fullscreen', 'true')
          ;(
            fullscreenElement.requestFullscreen ||
            fullscreenElement.webkitRequestFullscreen ||
            fullscreenElement.mozRequestFullScreen ||
            fullscreenElement.msRequestFullscreen
          ).call(fullscreenElement)
        }
      })
    }

    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement

      vimeoElement.setAttribute('data-vimeo-fullscreen', isFullscreen ? 'true' : 'false')
    }

    // Add event listeners for fullscreen changes (with vendor prefixes)
    ;['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange'].forEach((event) => {
      document.addEventListener(event, handleFullscreenChange)
    })

    // Convert seconds to mm:ss
    function secondsTimeSpanToHMS(s) {
      let h = Math.floor(s / 3600)
      s -= h * 3600
      let m = Math.floor(s / 60)
      s -= m * 60
      return m + ':' + (s < 10 ? '0' + s : s)
    }

    // Duration
    const vimeoDuration = vimeoElement.querySelector('[data-vimeo-duration]')
    player.getDuration().then(function (duration) {
      if (vimeoDuration) {
        vimeoDuration.textContent = secondsTimeSpanToHMS(duration)
      }
      // Update timeline + progress max
      const timelineAndProgress = vimeoElement.querySelectorAll('[data-vimeo-control="timeline"], progress')
      timelineAndProgress.forEach((el) => {
        el.setAttribute('max', duration)
      })
    })

    // Timeline
    const timelineElem = vimeoElement.querySelector('[data-vimeo-control="timeline"]')
    const progressElem = vimeoElement.querySelector('progress')

    function updateTimelineValue() {
      player.getDuration().then(function () {
        const timeVal = timelineElem.value
        player.setCurrentTime(timeVal)
        if (progressElem) {
          progressElem.value = timeVal
        }
      })
    }

    if (timelineElem) {
      ;['input', 'change'].forEach((evt) => {
        timelineElem.addEventListener(evt, updateTimelineValue)
      })
    }

    // Progress Time & Timeline (timeupdate)
    player.on('timeupdate', function (data) {
      if (timelineElem) {
        timelineElem.value = data.seconds
      }
      if (progressElem) {
        progressElem.value = data.seconds
      }
      if (vimeoDuration) {
        vimeoDuration.textContent = secondsTimeSpanToHMS(Math.trunc(data.seconds))
      }
    })

    // Hide controls after hover on Vimeo player
    let vimeoHoverTimer
    vimeoElement.addEventListener('mousemove', function () {
      if (vimeoElement.getAttribute('data-vimeo-hover') === 'false') {
        vimeoElement.setAttribute('data-vimeo-hover', 'true')
      }
      clearTimeout(vimeoHoverTimer)
      vimeoHoverTimer = setTimeout(vimeoHoverTrue, 3000)
    })

    function vimeoHoverTrue() {
      vimeoElement.setAttribute('data-vimeo-hover', 'false')
    }

    // Video Ended
    function vimeoOnEnd() {
      vimeoElement.setAttribute('data-vimeo-activated', 'false')
      vimeoElement.setAttribute('data-vimeo-playing', 'false')
      player.unload()
    }
    player.on('ended', vimeoOnEnd)
  })
}

export default initVimeoPlayer
