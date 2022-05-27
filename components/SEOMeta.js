import React, { useEffect, useState } from "react";
import Head from "next/head";

const faviconPath = "https://fiendz-nextjs-fafz.vercel.app/favicon.ico";
const ogImagePath =
  "https://fiendz-nextjs-fafz.vercel.app/images/titles/logo-small.png";

const SEOMeta = ({
  title,
  description,
  favicon = faviconPath,
  ogImage = ogImagePath,
  path,
  twitterHandle = "@ftmAlphaFiendz",
}) => {
  const [url, setUrl] = useState("https://www.fafz.app");
  useEffect(() => {
    setUrl(url + path);
  }, [path]);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta property="og:site_name" content={url} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:creator" content={twitterHandle} />
      <link rel="icon" type="image/png" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href="" />
    </Head>
  );
};

export default SEOMeta;
