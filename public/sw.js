if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/OgFK6DOkHt1U8nNs5SnZl/_buildManifest.js",revision:"150ab9b0bb24ff2875c1a5807c9dc33d"},{url:"/_next/static/OgFK6DOkHt1U8nNs5SnZl/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/160-8eba569dba92a8b8.js",revision:"8eba569dba92a8b8"},{url:"/_next/static/chunks/71-15ffb70c6fab6fae.js",revision:"15ffb70c6fab6fae"},{url:"/_next/static/chunks/cb355538-def627f3d322ff3e.js",revision:"def627f3d322ff3e"},{url:"/_next/static/chunks/fea29d9f-9c69d19ac56fd7ef.js",revision:"9c69d19ac56fd7ef"},{url:"/_next/static/chunks/framework-64ad27b21261a9ce.js",revision:"64ad27b21261a9ce"},{url:"/_next/static/chunks/main-ca16879f2814241f.js",revision:"ca16879f2814241f"},{url:"/_next/static/chunks/pages/_app-193b67660687a87e.js",revision:"193b67660687a87e"},{url:"/_next/static/chunks/pages/_error-77823ddac6993d35.js",revision:"77823ddac6993d35"},{url:"/_next/static/chunks/pages/dashboard-64df92f58fa537cc.js",revision:"64df92f58fa537cc"},{url:"/_next/static/chunks/pages/form-a7ae8140bcfefe09.js",revision:"a7ae8140bcfefe09"},{url:"/_next/static/chunks/pages/index-b309676429df8451.js",revision:"b309676429df8451"},{url:"/_next/static/chunks/pages/kelola_karyawan-f3f331277e625cdf.js",revision:"f3f331277e625cdf"},{url:"/_next/static/chunks/pages/laporan_harian-1abd4d7990e8e76b.js",revision:"1abd4d7990e8e76b"},{url:"/_next/static/chunks/pages/laporan_karyawan-629f12b16d5f7204.js",revision:"629f12b16d5f7204"},{url:"/_next/static/chunks/pages/login-13ec1bba57d08747.js",revision:"13ec1bba57d08747"},{url:"/_next/static/chunks/pages/profile-ad042ad4e1a5f22f.js",revision:"ad042ad4e1a5f22f"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-a2bf14f6d068cd3b.js",revision:"a2bf14f6d068cd3b"},{url:"/_next/static/css/02da3c3429e1f880.css",revision:"02da3c3429e1f880"},{url:"/_next/static/css/756d9b96e0d900be.css",revision:"756d9b96e0d900be"},{url:"/_next/static/css/83fa387320699e33.css",revision:"83fa387320699e33"},{url:"/_next/static/css/a4fcb384d0b9269e.css",revision:"a4fcb384d0b9269e"},{url:"/_next/static/css/ad1f99715dc44c09.css",revision:"ad1f99715dc44c09"},{url:"/_next/static/css/b53ef30981cf7dfa.css",revision:"b53ef30981cf7dfa"},{url:"/_next/static/css/b838121b8950cd90.css",revision:"b838121b8950cd90"},{url:"/_next/static/css/c9f420c4d847bdb5.css",revision:"c9f420c4d847bdb5"},{url:"/_next/static/css/d00136c188a9bd59.css",revision:"d00136c188a9bd59"},{url:"/_next/static/css/f2fd22980bababda.css",revision:"f2fd22980bababda"},{url:"/daiku/homepage.jpg",revision:"8743a630b54950f55c4f7aabd0cad674"},{url:"/daiku/logo.png",revision:"58b80954e040b8e1f3f4e25aa8cae01d"},{url:"/daiku/logodaiku.png",revision:"56b2b2414f2a2fa0acca35dc2d1437b2"},{url:"/daiku/profile.png",revision:"ed5a81cad909de0e7abbd6fb4e625091"},{url:"/daiku/threads.png",revision:"e6d91eda45712483069672abec2564a7"},{url:"/daiku/tim.jpg",revision:"4f407ae9970f71e2a12cca078664dbef"},{url:"/daiku/user-icon.png",revision:"4d8dbeb7d07373f6ad0c9a7ff7d6834b"},{url:"/manifest.json",revision:"590ad2a38f98c4de3062d47f240e6081"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/uploads/0a65b539b8bd506c8b8b9b900.6.2",revision:"2cde11855abbca232528d0ee003ad470"},{url:"/uploads/2e9403b8ca23c484e13a26105.docx",revision:"34105ada8ec46943830c538fabf44a78"},{url:"/uploads/2f7caef828f4a68b9374a3d00.docx",revision:"34105ada8ec46943830c538fabf44a78"},{url:"/uploads/af7e615bc4706a36873816900.6.2",revision:"2cde11855abbca232528d0ee003ad470"},{url:"/uploads/af7e615bc4706a36873816901.docx",revision:"34105ada8ec46943830c538fabf44a78"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
