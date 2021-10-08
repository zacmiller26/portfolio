import React from 'react'


import styles from './About.module.sass'

const About = () => {

  return (
    <div className={styles.root}>
      <div className={styles.avatar}><div /></div>
      <p>
        <i>Oh, hi!</i><br /><br />
        I'm Zac, a <Tag>full-stack</Tag> web developer, and I love the process of taking
        a <Tag>raw</Tag> concept and forging it into <Tag>reality.</Tag>
      </p>
      <p>
        I've learned a <Tag>ton</Tag> about that process
        through my own projects, which have accumulated over
        <Tag>1.1 billion</Tag> page views,
        {' '}<Tag>25 million</Tag>
        {' '}unique users, and peaked at over <Tag>3.5 million</Tag> users per
        month.
      </p>
      <p>
        Let's get in <Tag>touch!</Tag>
        <br /><br />
        <i>-Zac</i>
      </p>
    </div>
  )

}

interface Props {
  children: React.ReactNode
}

const Tag: React.FC<Props> = (props) => (
  <em><i>{props.children}</i></em>
)

export default About
