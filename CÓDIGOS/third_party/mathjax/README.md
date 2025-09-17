MathJax local bundling (optional)

Purpose
-------
This folder is an optional place to put a local copy of the MathJax es5 bundle so the site can work on networks that block CDNs.

Expected layout
---------------
Place the MathJax es5 distribution under this folder using the following structure:

CÓDIGOS/third_party/mathjax/
  es5/
    tex-chtml.js
    (and the rest of the es5 distribution files and directories)

How to get MathJax
------------------
1) Download the MathJax v3 es5 distribution (recommended) from the official CDN or GitHub release.
   Example (from a machine with internet):

   curl -L -o mathjax-es5.zip "https://github.com/mathjax/MathJax/archive/refs/tags/3.2.2.zip"
   # Unzip and place the 'es5' folder into this directory and rename to 'es5'

2) Alternatively, use npm to fetch a copy (requires Node.js):

   npm pack mathjax@3
   # This will create a tarball which you can unpack and copy the es5 folder.

How the loader works
--------------------
The page includes `mathjax-loader.js` which attempts to load `./es5/tex-chtml.js` from this folder first. If the file is missing or fails to load, the loader falls back to the CDN automatically.

Notes
-----
- If you host the site via GitHub Pages, include the `es5` folder in your repo (it will increase repo size considerably). Serving large binary/text files from GitHub is allowed, but consider using a smaller subset or a dedicated hosting if size is a concern.
- If you serve the site via file:// (opening index.html locally), the loader will try to insert the local script and will fall back to CDN on error.
