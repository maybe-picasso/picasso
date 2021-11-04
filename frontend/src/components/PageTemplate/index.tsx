import React from 'react';
import './index.scss';

interface Props {
  children: React.ReactNode;
  id?: string;
}

const PageTemplate = ({ children, id }: Props) => {
  return (
    <div className="page-template" id={id}>
      {children}
    </div>
  );
};

export default PageTemplate;
