import { useMemo, useState } from 'react'

import ApiDictionary from '../components/ApiDictionary/ApiDictionary'
import ApiVote from '../components/ApiVote/ApiVote'
import AuthLogin from '../components/AuthLogin/AuthLogin'
import KanBan from '../components/KanBan/KanBan'
import CustomTheme from '../components/CustomTheme/CustomTheme'
import NexusTBCBuild from '../components/Nexus/nexus-tbc-builds'
import NexusBasicTable from '../components/Nexus/nexus-basic-table'
import ScratchNView from '../components/ScratchNView/ScratchNView'
import BoltSVG from '../vectors/Bolt'
import BrightnessSVG from '../vectors/Brightness'
import CodeSVG from '../vectors/Code'
import GearSVG from '../vectors/Gear'
import PenSVG from '../vectors/Pen'
import ToolSVG from '../vectors/Tool'
import TableSVG from '../vectors/Table'
import UserSVG from '../vectors/User'
import LogoGithubSVG from '../vectors/LogoGithub'
import SiteTemplate from '../components/SiteTemplate/SiteTemplate'
import styles from './Examples.module.sass'


interface CodeExampleType {
  name: string
  description: string
  summary: string
  url: string
  tags: string[]
  icon: React.ReactNode,
  logos: React.ReactNode[],
  renderComponent: () => React.ReactNode
}

const CODE_EXAMPLES: CodeExampleType[] = [
  {
    name: 'KanBan Tasks',
    description: 'LocalStorage KanBan Task Manager',
    tags: ['React', 'Portal', 'Modals', 'TypeScript', 'Next.js', 'Modals'],
    icon: <BoltSVG />,
    logos: [GearSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This CRUD example uses a LocalStorage-based React Hook for "+
    "storing the tasks you create.",
    renderComponent: () => <KanBan />
  },
  {
    name: 'Dictionary Word Lookup',
    description: 'Get word definition using Django REST API (DRF)',
    tags: ['Python', 'Django', 'DRF', 'API', 'POST'],
    icon: <CodeSVG />,
    logos: [CodeSVG],
    url: 'https://github.com/felfire/dictionary-url',
    summary: "This sends a POST request to a Django DRF API "+
    "that returns a PyDictionary lookup.",
    renderComponent: () => <ApiDictionary />
  },
  {
    name: 'Site Theme',
    description: 'Customizable Site Theme Colors',
    tags: [
      'React', 'Context API', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <BrightnessSVG />,
    logos: [GearSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses LocalStorage, React's Context API, and Custom "+
    "CSS Properties to create customizable site theme colors.",
    renderComponent: () => <CustomTheme />
  },
  /*{
    name: 'Game Widget',
    description: 'Interactive Game UX with strict logic',
    tags: [
      'React', 'Context API', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <BoltSVG />,
    logos: [GearSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses LocalStorage, React's Context API, and Custom "+
    "CSS Properties to create a customizable site theme.",
    renderComponent: () => <NexusTBCBuild />
  },*/
  {
    name: 'JSON Table',
    description: 'Dynamic Table With JSON & CSV Outputs',
    tags: [
      'React', 'Context API', 'TypeScript', 'LocalStorage', 'JSON',
      'CSV'
    ],
    icon: <TableSVG />,
    logos: [TableSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses LocalStorage, React's Context API, and Custom "+
    "CSS Properties to create a customizable site theme.",
    renderComponent: () => <NexusBasicTable />
  },
  {
    name: 'User Sessions',
    description: 'User Registration, Authentication & Sessions',
    tags: [
      'React', 'Context API', 'Firebase', 'Authentication', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <UserSVG />,
    logos: [TableSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses a Context Hook with all the basic functionality "+
    "for user sessions using Firebase Auth. By using React Context, the "+
    "`authUser` object is readily accessible to any component that needs it.",
    renderComponent: () => <AuthLogin />
  },
  /*{
    name: 'Membership Subscriptions',
    description: 'Stripe Subscription Products',
    tags: [
      'React', 'Stripe', 'Subscriptions', 'Firebase', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <BoltSVG />,
    logos: [TableSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses LocalStorage, React's Context API, and Custom "+
    "CSS Properties to create a customizable site theme.",
    renderComponent: () => <AuthLogin />
  },*/
  {
    name: 'Scratch n\' View',
    description: 'Scratch off paint to view picture',
    tags: [
      'React', 'Stripe', 'Subscriptions', 'Firebase', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <PenSVG />,
    logos: [TableSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses LocalStorage, React's Context API, and Custom "+
    "CSS Properties to create a customizable site theme.",
    renderComponent: () => <ScratchNView />
  },
  /*{
    name: 'Voting Mechanism',
    description: 'Vote using a Django API',
    tags: [
      'React', 'Stripe', 'Subscriptions', 'Firebase', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <TableSVG />,
    logos: [TableSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses a Django DRF API to send and store your "+
    "vote, which utilizes request throttling, rate and total limits to the amount of votes, and shows total voting statistics.",
    renderComponent: () => <ApiVote />
  },*/
  /*{
    name: 'Sending Emails',
    description: 'Python / Django / DRF / API',
    summary: "This project demonstrates my ability to replicate a "+
    "given design. I chose Twitter because it's widely used and a fun design.",
    renderComponent: () => <><LogoDjangoSVG />OMG its an API!</>
  },
  {
    name: 'Image Crop & Resize',
    description: 'AWS / S3 / Python / Django / DRF / API',
    summary: "This project demonstrates my ability to replicate a "+
    "given design. I chose Twitter because it's widely used and a fun design.",
    renderComponent: () => <>OMG its KanBan!</>
  },
  {
    name: 'Twitter Look-alike',
    description: 'Next.js / React / Firebase',
    summary: "This project demonstrates my ability to replicate a "+
    "given design. I chose Twitter because it's widely used and a fun design.",
    renderComponent: () => <LookAlike />
  },
  {
    name: 'React Form Components',
    description: 'React / NPM',
    summary: "This project demonstrates my ability to replicate a "+
    "given design. I chose Twitter because it's widely used and a fun design.",
    renderComponent: () => <>OMG its React Form Components!</>
  },
  {
    name: 'React Mouseover Tooltips',
    description: 'React',
    summary: "This project demonstrates my ability to replicate a "+
    "given design. I chose Twitter because it's widely used and a fun design.",
    renderComponent: () => <>OMG its React Form Components!</>
  },*/
]

const CodePage = () => {

  const [projectIndex, setProjectIndex] = useState<number | null>(null)

  const project = useMemo(() : (CodeExampleType | null) => (
    projectIndex != null ? CODE_EXAMPLES[projectIndex] : null
  ), [projectIndex])

  const projectComponent = useMemo(() => (
    project && project.renderComponent()
  ), [project])

  return (
    <>
      {!project ?
        <>
          <ProjectList setProjectIndex={setProjectIndex} />
        </>
        :
        <>
          <div className={styles.codeExampleDetail}>
            <div className={styles.breadcrumb}>
              <div>
                <button type="button" onClick={() => setProjectIndex(null)}>
                  &larr;
                </button>
                <h4>{project.name}</h4>
                <a href={project.url} target="_blank">
                  <LogoGithubSVG />
                </a>
              </div>
              <p>{project.summary}</p>
              {/*<ul>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>*/}
            </div>
          </div>
          {projectComponent}
        </>
      }
    </>

  )

}

interface ProjectListProps {
  setProjectIndex: Function
}

const ProjectList: React.FC<ProjectListProps> = props => {
  return (
    <ul className={styles.codeExampleList}>
      {CODE_EXAMPLES.map((example, i) => (
        <li key={example.name}>
          <button
            className={styles.codeExampleBtn}
            type="button"
            onClick={() => props.setProjectIndex(i)}
          >
            <i className={styles.projectIcon}>
              {example.icon}
            </i>
            <span className={styles.contents}>
              <h5 className={styles.projectName}>
                {example.name}
              </h5>
              <em className={styles.projectDescription}>
                {example.description}
              </em>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CodePage
