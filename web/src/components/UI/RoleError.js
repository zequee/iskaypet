import React from 'react';
import ForbiddenError from './ForbiddenError';

const roleError = () => {
  return (
    <ForbiddenError message="Su usuario no posee los roles necesarios para utilizar el sistema." />
  );
};

export default roleError;
