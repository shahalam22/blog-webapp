import React from 'react'
import styles from './feature.module.css'
import Image from 'next/image'


function Feature() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}><b>Hey, Daily Dev here!</b> Discover my stories and creative ideas.</h1>
      <div className={styles.post}>
        <div className={styles.imageContainer}>
          <Image src="/p1.jpeg" alt=''fill className={styles.image}/>
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
          <p className={styles.postDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo reprehenderit omnis pariatur consequuntur illo aperiam unde assumenda deserunt officia quasi illum facilis aspernatur porro, commodi, ducimus dignissimos animi nobis tempora.</p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default Feature