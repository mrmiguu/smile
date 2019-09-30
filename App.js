import styles from './App.module.scss'
import React, { useState } from 'react'
import Photo from './Photo'

export default () => {

  let [xy, setXy] = useState([100, 100])

  return (
    <div
      id={styles.App}
    // onDragOver={e => {
    //   console.log([e.pageX, e.pageY])
    //   setXy([e.pageX, e.pageY])
    // }}
    >

      <Photo
        id={styles.Board}
        label="Board"
      >

        {/* <Photo
          id={styles.Piece}
          label="Piece"
          style={{
            left: `${xy[0]}px`,
            top: `${xy[1]}px`,
          }}
          draggable
        >
        </Photo> */}

      </Photo>

    </div>
  )
}
