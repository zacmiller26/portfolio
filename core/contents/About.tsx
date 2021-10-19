import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import styles from './About.module.sass'

const About = () => {
  
  const age = useMemo(() => {
    const ageYear = Number(process.env.NEXT_PUBLIC_YEAR_OF_BIRTH || 1989)
    const ageDifMs = Date.now() - ageYear
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - ageYear)
  }, [])

  return (
    <div className={styles.cols}>
      <div className={styles.colsLeft}>
        <ProfilePicture />
        <div className={styles.profileAbout}>
          <h3>
            {process.env.NEXT_PUBLIC_FIRST_NAME}{' '}
            {process.env.NEXT_PUBLIC_LAST_NAME}
           </h3>
           <h4>
             {age} - {process.env.NEXT_PUBLIC_LOCATION}
           </h4>
        </div>
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
      I love the full-stack process of taking
      a new concept and forging it into reality.
      Especially the front-end: It's all about the UI/UX being seamless, 
      intuitive and purposeful.
    </p>
    <p>In the last ten years, <Tag>my projects</Tag> have seen 
    metrics like <Tag>1.1 billion</Tag> <em>page views</em>,
    <Tag>70 million</Tag> <em>unique users</em>, and 
    <Tag>3.5 million</Tag> <em>unique monthly users</em>.
    </p>
    <p>
      I've learned a lot through my self-employed endeavors, 
      and am looking  to continue learning and growing in a team
      environment. Let's connect!
    </p>
  </>
)

const PICTURE_GALLERY = [
  'hanoi.png',
  'portland.png',
  'cycling.png',
  'prerace.png',
  'racing.png',
  'podium.png'
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
