import styles from './Photo.module.scss'
import React, { useRef, useState, useEffect } from 'react'

let modes = {
  EMPTY: 0,
  CAMERA: 1,
  PHOTO: 2,
}

let after = {
  [modes.EMPTY]: modes.CAMERA,
  [modes.CAMERA]: modes.PHOTO,
  [modes.PHOTO]: modes.EMPTY,
}

export default ({ label, children, ...props }) => {

  let videoRef = useRef()
  let [mode, setMode] = useState(modes.EMPTY)
  let [photo, setPhoto] = useState()

  let onSnap = e => {
    e.stopPropagation()
    e.preventDefault()
    setMode(after[mode])
  }

  let onCapture = e => {
    e.stopPropagation()
    e.preventDefault()

    let videoEl = videoRef.current
    let stream = videoEl.srcObject
    let videoTrack = stream.getVideoTracks()[0]
    let streamSettings = videoTrack.getSettings()

    // console.log(`streamSettings ${JSON.stringify(streamSettings)}`)

    let { width, height } = streamSettings

    // console.log(`vid ${width}x${height}`)

    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    let context = canvas.getContext('2d')
    context.drawImage(videoEl, 0, 0, width, height)

    let data = canvas.toDataURL('image/png')
    setPhoto(data)

    videoTrack.stop()

    setMode(after[mode])
  }

  useEffect(
    () => {
      alert(`${label}-mode ${mode}`)
    },
    [mode]
  )

  let Empty = (
    <span>
      {label}
    </span>
  )

  let Camera = (
    <video
      id={styles.Buffer}

      ref={async ref => {
        if (!ref) return
        let videoEl = videoRef.current = ref

        let stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment'
          }
        })

        videoEl.srcObject = stream
      }}

      autoPlay
      playsInline

      onClick={onCapture}
      onTouchStart={onCapture}
    />
  )

  let Photo = (
    <img
      id={styles.Buffer}
      src={photo}
      alt={`game-${label}-photo`}
    />
  )

  let State = {
    [modes.EMPTY]: Empty,
    [modes.CAMERA]: Camera,
    [modes.PHOTO]: Photo,
  }

  return (
    <div
      className={styles.Photo}
      onClick={onSnap}
      onTouchStart={onSnap}
      {...props}
    >
      {State[mode]}
      {children}
    </div>
  )
}
