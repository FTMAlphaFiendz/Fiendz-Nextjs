import React, { useEffect, useState } from "react";
import Head from "next/head";

const faviconPath = "https://fiendz-nextjs-fafz.vercel.app/favicon.ico";
const ogImagePath =
  "https://fiendz-nextjs-fafz.vercel.app/images/titles/logo-small.png";

const siteName = "FAFZ";
const baseUrl = "https://www.fafz.app";

const SEOMeta = ({
  page,
  description,
  favicon = faviconPath,
  ogImage = ogImagePath,
  path,
  twitterHandle = "@FtmAlphaFiendz",
}) => {
  const [url, setUrl] = useState("https://www.fafz.app");

  useEffect(() => {
    setUrl(url + path);
  }, [path]);

  return (
    <Head>
      <title>
        {page} | {siteName}
      </title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={siteName} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta property="og:site_name" content={baseUrl} />
      <meta property="og:url" content={`${baseUrl}${path}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={`${baseUrl}${path}`} />
      <meta name="twitter:creator" content={twitterHandle} />
      <link rel="icon" type="image/png" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
      <meta
        property="og:image"
        content={`https://www.linkpicture.com/q/logo-small_1.png`}
      />
      <meta
        name="twitter:image"
        content={`https://www.linkpicture.com/q/banner-twitter.jpg`}
      />
      <link rel="canonical" href="" />
    </Head>
  );
};

export default SEOMeta;
