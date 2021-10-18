import { useMemo, useState } from 'react'

import ApiDictionary from '../components/ApiDictionary/ApiDictionary'
import AuthLogin from '../components/AuthLogin/AuthLogin'
import Calculator from '../components/Calculator/Calculator'
import KanBan from '../components/KanBan/KanBan'
import CustomTheme from '../components/CustomTheme/CustomTheme'
import NexusBasicTable from '../components/Nexus/nexus-basic-table'
import ScratchNView from '../components/ScratchNView/ScratchNView'
import BoltSVG from '../vectors/Bolt'
import BrightnessSVG from '../vectors/Brightness'
import CodeSVG from '../vectors/Code'
import GearSVG from '../vectors/Gear'
import PenSVG from '../vectors/Pen'
import TableSVG from '../vectors/Table'
import UserSVG from '../vectors/User'
import LogoGithubSVG from '../vectors/LogoGithub'
import useViewportMeta from '../hooks/useViewportMeta'
import styles from './Examples.module.sass'


interface CodeExampleType {
  name: string
  description: string
  summary: string
  url: string
  tags: string[]
  icon: React.ReactNode,
  logos: React.ReactNode[],
  mobileSupport: boolean,
  renderComponent: () => React.ReactNode
}

const CODE_EXAMPLES: CodeExampleType[] = [
  {
    name: 'Site Theme',
    description: 'Customizable Site Theme Colors',
    tags: [
      'React', 'Context API', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <BrightnessSVG />,
    logos: [GearSVG],
    url: 'https://github.com/felfire/portfolio/blob/main/core/components/SiteTemplate/ThemeBar.tsx',
    summary: "This example uses LocalStorage, React's Context API, and Custom "+
    "CSS Properties to create customizable site theme colors.",
    mobileSupport: true,
    renderComponent: () => <CustomTheme />
  },
  {
    name: 'KanBan Tasks',
    description: 'LocalStorage KanBan Task Manager',
    tags: ['React', 'Portal', 'Modals', 'TypeScript', 'Next.js', 'Modals'],
    icon: <BoltSVG />,
    logos: [GearSVG],
    url: 'https://github.com/felfire/portfolio/blob/main/core/components/KanBan/KanBan.tsx',
    summary: "This KanBan example is a basic CRUD component without a back-end"+
    " (changes are stored in state). It uses React Portal to handle Modal "+
    "needs for editing/deleting tasks, and `react-beautiful-dnd` to assist "+
    "with drag-and-drop functionality.",
    mobileSupport: false,
    renderComponent: () => <KanBan />
  },
  {
    name: 'Dictionary Word Lookup',
    description: 'Lookup the definition of a word using a public Dictionary API.',
    tags: ['Python', 'Django', 'DRF', 'API', 'POST'],
    icon: <CodeSVG />,
    logos: [CodeSVG],
    url: 'https://github.com/felfire/portfolio/blob/main/core/components/ApiDictionary/ApiDictionary.tsx',
    summary: "This sends a POST request to a Next.js API route that then "+
    "makes a GET request to a Dictionary API, returning the short definition." +
    " The two requests are redundant, but I wanted to feed two birds with one" +
    " scone. Show ability to create own API routes, and to utilize an external." +
    " Plus, this way API keys aren't exposed. :)",
    mobileSupport: true,
    renderComponent: () => <ApiDictionary />
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
    name: 'Dynamic Table',
    description: 'Dynamic Table With JSON & CSV Outputs',
    tags: [
      'React', 'Context API', 'TypeScript', 'LocalStorage', 'JSON',
      'CSV'
    ],
    icon: <TableSVG />,
    logos: [TableSVG],
    url: 'https://github.com/felfire/portfolio/blob/main/core/components/Nexus/nexus-basic-table/Tables.tsx',
    summary: "This example is a dynamic table that can expand in rows and "+
    "columns up to the preset limit, with tabs to view the JSON or CSV output."+
    " This uses basic React functionality.",
    mobileSupport: true,
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
    url: 'https://github.com/felfire/portfolio/blob/main/core/components/AuthLogin/AuthLogin.tsx',
    summary: "This example uses a Context Hook with all the basic functionality "+
    "for user sessions using Firebase Auth. By using React Context, the "+
    "`authUser` object is readily accessible to any component that needs it.",
    mobileSupport: true,
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
    url: 'https://github.com/felfire/portfolio/blob/main/core/components/ScratchNView/ScratchNView.tsx',
    summary: "This example lets you run your mouse over the image to reveal it."+
    " A `mouseover` event listener is activated on the panels covering the"+
    " image, which reduces their opacity to 0 when the event is triggered.",
    mobileSupport: false,
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

  const { isMobile } = useViewportMeta()
  const [projectIndex, setProjectIndex] = useState<number | null>(null)

  const project = useMemo(() : (CodeExampleType | null) => (
    projectIndex != null ? CODE_EXAMPLES[projectIndex] : null
  ), [projectIndex])

  const projectComponent = useMemo(() => (
    project && project.renderComponent()
  ), [project])

  return (
    <>
      {!project || (isMobile && !project.mobileSupport) ?
        <>
          <ProjectList
            setProjectIndex={setProjectIndex}
            isMobile={isMobile}
          />
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
  isMobile: boolean
}

const ProjectList: React.FC<ProjectListProps> = props => {

  const showEx = (example: CodeExampleType) => {
    return (!props.isMobile || props.isMobile && example.mobileSupport)
  }

  return (
    <ul className={styles.codeExampleList}>
      {CODE_EXAMPLES.map((example, i) => showEx(example) && (
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
