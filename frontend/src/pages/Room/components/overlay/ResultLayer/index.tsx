import { Box, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import './index.scss';

interface Props {
  children: React.ReactNode;
  title: string | React.ReactNode;
}

const ResultLayer = ({ children, title }: Props) => {
  const variants = {
    initial: { opacity: 0, y: 30, scale: 0.85 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  return (
    <motion.div initial="initial" animate="visible" variants={variants} transition={{ duration: 0.3 }}>
      <Heading mb={5} color="white" textAlign="center">
        {title}
      </Heading>
      <Box bgColor="white" width="370px" borderRadius={6} padding={6}>
        {children}
      </Box>
    </motion.div>
  );
};

export default ResultLayer;
