import { motion } from 'framer-motion';
import { Box, Heading } from '@chakra-ui/react';

import './index.scss';

interface Props {
  children?: React.ReactNode;
  title: string | React.ReactNode;
  bgColor?: string;
}

const variants = {
  initial: { opacity: 0, y: 30, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const ResultLayer = ({ children, title, bgColor = 'white' }: Props) => {
  return (
    <motion.div initial="initial" animate="visible" variants={variants} transition={{ duration: 0.3 }}>
      <Heading mb={5} color="white" textAlign="center">
        {title}
      </Heading>
      {children && (
        <Box bgColor={bgColor} minWidth={370} minHeight={200} borderRadius={6} padding={6} marginX="auto">
          {children}
        </Box>
      )}
    </motion.div>
  );
};

export default ResultLayer;
