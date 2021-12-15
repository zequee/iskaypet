export const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";

export const enqueueMessageDefault = message => enqueueSnackbar({ message });


export const enqueueMessageInfo = message =>
  enqueueSnackbar({
    message,
    options: {
      variant: "info"
    }
  });


export const enqueueMessageSuccess = message =>
  enqueueSnackbar({
    message,
    options: {
      variant: "success"
    }
  });

  export const enqueueMessageWarning = message =>
  enqueueSnackbar({
    message,
    options: {
      variant: "warning"
    }
  });

export const enqueueError = message =>
  enqueueSnackbar({
    message,
    options: {
      variant: "error"
    }
  });

export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  };
};

export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key
});
