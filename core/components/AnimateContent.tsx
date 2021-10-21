import React, { useMemo } from 'react'
import { motion } from "framer-motion"

import useViewportMeta from '../hooks/useViewportMeta'
import styles from './AnimateContent.module.sass'


interface Props {
  children: React.ReactNode
}

const SiteMain: React.FC<Props> = props => {

    const { isMobile } = useViewportMeta()

    const variants = useMemo(() => {
        if(isMobile) {
            return {
                hidden: { opacity: 0, y: -100 },
                enter: { opacity: 1, x: 0, y: 0 },
                exit: { opacity: 0, y: -100 }
            }
        }
        return {
            hidden: { opacity: 0, x: 100, y: 0 },
            enter: { opacity: 1, x: 0, y: 0 },
            exit: { opacity: 0, x: 0, y: 100 }
        }
    }, [isMobile])

    return (
        <div className={styles.root}>
            <motion.div 
                key={isMobile ? 'mobileContent' : 'desktopContent'}
                className={styles.content}
                variants={variants}
                initial="hidden"
                animate="enter" 
                exit="exit"
                transition={{ 
                    type: 'linear',
                    duration: .25
                }}
            >
                {props.children}
            </motion.div>
        </div>
    )
}

export default SiteMain
