import React from "react";

export const useToast = (message) => {
  const [show, setShow] = React.useState(!!message);
  return { show, hide: () => setShow(false) };
};

export const useHide = (hide, time) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      hide();
    }, time);
    return () => clearTimeout(timer);
  }, []);
};
