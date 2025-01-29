
import { useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface CoverImageProps {
  url: string;
  height: string;
  width: string;
  style?: any;
}

export default function CoverImage({ url, height, width, style = {} }: CoverImageProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(false);
  }, [url]);

  if (!isLoaded) {
    return (
      <div
        style={{
          width: width,
          height: height,
          backgroundColor: theme.palette.primary.main,
          backgroundPosition: 'center',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          ...style,
        }}
      />
    )

  }

  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        ...style,
      }}
    />
  );
}
