export const staticAsset = (filename: string) => {
  let origin: string;

  const env = process.env.NODE_ENV;

  if (env === 'production') {
    origin = process.env.BEGIN_STATIC_EDGE; // CDN
  } else if (env === 'staging') {
    origin = process.env.BEGIN_STATIC_ORIGIN; // Preview
  } else {
    origin = '/_static'; // Handles local use cases
  }
  return `${origin}/${filename}`;
};
