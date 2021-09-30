import type { NextPage } from 'next'

import Head from 'next/head'
import { useMemo, useState } from 'react'

import ApiDictionary from '../core/components/ApiDictionary/ApiDictionary'
import ApiRegex from '../core/components/ApiRegex/ApiRegex'
import KanBan from '../core/components/KanBan/KanBan'
import CustomTheme from '../core/components/CustomTheme/CustomTheme'
import NexusTBCBuild from '../core/components/Nexus/nexus-tbc-builds'
import NexusBasicTable from '../core/components/Nexus/nexus-basic-table'
import BoltSVG from '../core/vectors/Bolt'
import BrightnessSVG from '../core/vectors/Brightness'
import CodeSVG from '../core/vectors/Code'
import GearSVG from '../core/vectors/Gear'
import ToolSVG from '../core/vectors/Tool'
import TableSVG from '../core/vectors/Table'
import LogoGithubSVG from '../core/vectors/LogoGithub'
import SiteTemplate from '../core/components/SiteTemplate/SiteTemplate'
import styles from '../styles/pages/index.module.sass'


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
    name: 'Dictionary Word Lookup',
    description: 'REST API',
    tags: ['Python', 'Django', 'DRF', 'API'],
    icon: <CodeSVG />,
    logos: [CodeSVG],
    url: 'https://github.com/felfire/dictionary-url',
    summary: "This sends a POST request to a Django DRF API "+
    "that returns a PyDictionary lookup.",
    renderComponent: () => <ApiDictionary />
  },
  {
    name: 'Python Regex',
    description: 'REST API Python Logic',
    tags: ['Python', 'Django', 'DRF', 'API'],
    icon: <GearSVG />,
    logos: [GearSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This sends a POST request to a Django DRF API "+
    "that returns a PyDictionary lookup.",
    renderComponent: () => <ApiRegex />
  },
  {
    name: 'KanBan Tasks',
    description: 'LocalStorage KanBan Task Manager',
    tags: ['React', 'Hooks', 'TypeScript', 'LocalStorage', 'Next.js', 'SASS'],
    icon: <ToolSVG />,
    logos: [GearSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This CRUD example uses a LocalStorage-based React Hook for "+
    "storing the tasks you create.",
    renderComponent: () => <KanBan />
  },
  {
    name: 'Site Theme',
    description: 'Custom CSS Properties & React Context API',
    tags: [
      'React', 'Context API', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <BrightnessSVG />,
    logos: [GearSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses LocalStorage, React's Context API, and Custom "+
    "CSS Properties to create a customizable site theme.",
    renderComponent: () => <CustomTheme />
  },
  {
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
  },
  {
    name: 'JSON Table',
    description: 'Adjustable Table Rows/Cols Stored in JSON',
    tags: [
      'React', 'Context API', 'TypeScript', 'LocalStorage', 'SASS',
      'CSS Properties'
    ],
    icon: <TableSVG />,
    logos: [TableSVG],
    url: 'https://github.com/felfire/regex-url',
    summary: "This example uses LocalStorage, React's Context API, and Custom "+
    "CSS Properties to create a customizable site theme.",
    renderComponent: () => <NexusBasicTable />
  },
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

const CodePage: NextPage = () => {

  const [projectIndex, setProjectIndex] = useState<number | null>(null)

  const project = useMemo(() : (CodeExampleType | null) => (
    projectIndex != null ? CODE_EXAMPLES[projectIndex] : null
  ), [projectIndex])

  const projectComponent = useMemo(() => (
    project && project.renderComponent()
  ), [project])

  return (
    <>

      <Head>
        <title>Zac Miller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SiteTemplate header={
        !project ?
          <div className={styles.codeExampleDetail}>
            <div className={styles.breadcrumb}>
              <div>
                <h4>Code Examples</h4>
              </div>
            </div>
          </div>
         :
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
              <ul>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
      }>
        {!project ?
          <ProjectList setProjectIndex={setProjectIndex} />
          :
          projectComponent
        }
      </SiteTemplate>

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
            <span className={styles.projectName}>
              {example.name}
            </span>
            <em className={styles.projectDescription}>
              {example.description}
            </em>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CodePage
