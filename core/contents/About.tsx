import React from 'react'


import styles from './About.module.sass'

const About = () => {

  return (
    <div className={styles.root}>
      <p>
        I'm a full-stack web developer, and I love the process of taking
        a <Tag>new</Tag> concept and forging it into <Tag>reality.</Tag>
      </p>
      <p>In the last ten years, <Tag>my projects</Tag> have seen some
      neat metrics, like:
      </p>
      <ul>
        <li><span>1.1 billion <em>page views</em></span></li>
        <li><span>70 million <em>unique users</em></span></li>
        <li><span>3.5 million <em>unique monthly users</em></span></li>
      </ul>
      <p>
        A lot was learned in the process, and I'm looking to learn
        more in a <Tag>good team.</Tag> Got one?
      </p>
      <p>
        Let's get in <Tag>touch!</Tag>
      </p>
      <p>
        <strong>
          <b />
          <i>-Zac</i>
        </strong>
      </p>
    </div>
  )

}

interface Props {
  children: React.ReactNode
}

const Tag: React.FC<Props> = (props) => (
  <em className={styles.tag}><i>{props.children}</i></em>
)

export default About
