import React, { useLayoutEffect } from 'react';


const useTheme = (theme) => {
  useLayoutEffect(
    () => {
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme]
  );
};
