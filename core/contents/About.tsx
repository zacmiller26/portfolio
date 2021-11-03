import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'


import styles from './About.module.sass'

const About = () => {

  return (
    <div className={styles.cols}>
      <div className={styles.colsLeft}>
        <ProfilePicture />
      </div>
      <div className={styles.colsRight}>
        <AboutMeText />
      </div>
      
    </div>
  )

}

interface Props {
  children: React.ReactNode
}

const Tag: React.FC<Props> = (props) => (
  <em className={styles.tag}><i>{props.children}</i></em>
)

const AboutMeText = () => (
  <>
    <p>
    {process.env.NEXT_PUBLIC_FIRST_NAME} is a freelance and a full-stack developer based in 
    {' '}{process.env.NEXT_PUBLIC_LOCATION} with a passion for bringing ideas
     to life.
    </p>
    <p>From his own projects, he's accumulated metrics like
    {' '}<Tag>1.1 billion</Tag> <em>page views</em>,
    {' '}<Tag>70 million</Tag> <em>unique users</em>, and 
    {' '}<Tag>3.5 million</Tag> <em>unique monthly users</em>.
    </p>
    <p>
      When not online, he loves all things two-wheels, whether that's racing 
      motorcycles or climbing a canyon on the bicycle. 
    </p>
  </>
)

const PICTURE_GALLERY = [
  'reeds.png',
  'portland.png',
  'vietnam.png',
  'prerace.png',
  'racing.png'
]

const ProfilePicture = () => {

  const [image, setImage] = useState(0)

  const changeImage = useCallback((index?: number) => {
    if(index !== undefined) setImage(index)
    else {
      setImage(prev => {
        if(prev < PICTURE_GALLERY.length - 1) {
          return prev + 1
        }
        return 0
      })
    }
  }, [])

  const getPercentage = (whole: number, part: number, dec?: number) => (
    whole === 0 ? 0 : parseFloat((100 * (part / whole)).toFixed(dec ? dec : 2))
  )

  useEffect(() => {
    const amount = 10000
    const timeout = setTimeout(() => {
      changeImage()
    }, amount)
    return () => clearTimeout(timeout)
  }, [image])


  return (
    <>
      <div className={styles.profilePicture}>

        <span className={styles.corner1} />
        <span className={styles.corner2} />

        <div className={styles.imagesWrapper}>
          <div 
            className={styles.imagesContainer}
            style={{
              width: PICTURE_GALLERY.length * 100 + '%',
              left: '-' + ((image) * 100) + '%'
            }}
          >
            {PICTURE_GALLERY.map((fileName, index) => (
              <i 
                className={styles.image} 
                key={fileName} 
                data-active={index === image}
              >
                <Image 
                  src={`/images/profile/${fileName}`}
                  width={250}
                  height={250}
                  quality={100}
                />
            </i>
            ))}
          </div>
        </div>


      </div>
      <div className={styles.galleryTracker}>
        {PICTURE_GALLERY.map((fileName, index) => (
          <button 
            key={fileName}
            className={styles.galleryBtn}
            onClick={( ) => changeImage(index)}
            type="button"
            data-active={index === image}
          >
          </button>
        ))}
      </div>
    </>
  )
}

export default About
