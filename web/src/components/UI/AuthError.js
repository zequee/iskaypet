import React from 'react';
import ForbiddenError from './ForbiddenError';

const authError = () => {
  return (
    <ForbiddenError message="Ha ocurrido un error al intentar iniciar la sesión." />
  );
};

export default authError;
