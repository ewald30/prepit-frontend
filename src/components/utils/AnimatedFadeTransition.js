import { motion } from "framer-motion";

const animations = {
    initial: {opacity: 0, x:0},
    animate: {opacity: 1,  x:0},
    exit: {opacity:0, x:-100}
}

const AnimatedFadeTransition = ({children}) => {
    return (
        <motion.div 
        variants={animations} 
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedFadeTransition;