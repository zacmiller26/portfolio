import React from 'react'
import Image from 'next/image'

import styles from './About.module.sass'

const About = () => {

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
             32 - SLC, UT
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
      I'm a full-stack web developer, and I love the process of taking
      a <Tag>new</Tag> concept and forging it into <Tag>reality.</Tag>
    </p>
    <p>In the last ten years, <Tag>my projects</Tag> have seen some
    neat metrics, like <Tag>1.1 billion <em>page views</em>,</Tag> 
    <Tag>70 million <em>unique users</em>,</Tag> and 
    <Tag>3.5 million <em>unique monthly users</em></Tag>
    </p>
    <p>
      A lot was learned in the process, and I'm looking to learn
      more in a <Tag>good team.</Tag> Got one?
    </p>
  </>
)

const ProfilePicture = () => {

  return (
    <div className={styles.profilePicture}>

      <span className={styles.corner1} />
      <span className={styles.corner2} />

      <i className={styles.image}>
        <Image 
          src="/images/thumbnail.png" 
          width={200}
          height={200}
        />
      </i>

    </div>
  )
}

export default About
