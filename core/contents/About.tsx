import React from 'react'


import styles from './About.module.sass'

const About = () => {

  return (
    <div className={styles.root}>
      <p>
        <i>Oh, hi!</i><br /><br />
        I'm Zac, a <Tag>full-stack</Tag> web developer, and I love the process of taking
        a <Tag>raw</Tag> concept and forging it into <Tag>reality.</Tag>
      </p>
      <ul>
        <li><span>1.1 billion <em>page views</em></span></li>
        <li><span>25 million <em>unique users</em></span></li>
        <li><span>3.5 million <em>unique monthly</em> users</span></li>
        <li><span>5,000 requests <em>per second</em></span></li>
      </ul>
      <p>
        These are some <Tag>metrics</Tag> I've seen from my own projects in the past ten
        years. It might go without saying, but I've <Tag>learned</Tag> a ton
        through all of it.
      </p>
      <p>
        I'd love to bring my <Tag>experience</Tag> to your team. <br />
        Let's get in <Tag>touch!</Tag>
        <br /><br />
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
