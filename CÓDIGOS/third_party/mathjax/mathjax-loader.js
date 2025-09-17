// Local-first MathJax loader
// Behavior:
// 1) If a local MathJax bundle exists at ./es5/tex-chtml.js, load it with defer.
// 2) Otherwise, fall back to the CDN.

(function(){
  var localPath = './es5/tex-chtml.js';
  var cdn = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';

  function inject(src, isModule){
    var s = document.createElement('script');
    s.src = src;
    if(isModule) s.type = 'module';
    s.defer = true;
    document.head.appendChild(s);
  }

  // Try to fetch the local file with a HEAD request to avoid downloading big assets.
  // Some servers (file://) won't allow fetch; in that case, attempt to load local directly.
  function tryLocalThenCdn(){
    if(location.protocol === 'file:'){
      // When served from the filesystem, HEAD via fetch often fails due to CORS.
      // Try to load local directly; if it errors, fall back to CDN via onerror.
      var s = document.createElement('script');
      s.src = localPath;
      s.defer = true;
      s.onerror = function(){
        console.warn('Local MathJax failed to load, falling back to CDN');
        inject(cdn);
      };
      document.head.appendChild(s);
      return;
    }

    // Attempt a HEAD request to check for local presence.
    fetch(localPath, {method: 'HEAD', cache: 'no-store'}).then(function(resp){
      if(resp && resp.ok){
        inject(localPath);
      } else {
        console.info('Local MathJax not found, using CDN');
        inject(cdn);
      }
    }).catch(function(){
      // Network or CORS error: try local and fall back on error
      var s = document.createElement('script');
      s.src = localPath;
      s.defer = true;
      s.onerror = function(){
        console.warn('Local MathJax failed to load (CORS or missing). Falling back to CDN');
        inject(cdn);
      };
      document.head.appendChild(s);
    });
  }

  tryLocalThenCdn();
})();
