import{i,S as l}from"./assets/vendor-18365dff.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();document.getElementById("search-form").addEventListener("submit",async function(s){s.preventDefault();const n=document.getElementById("query").value.trim();if(!n){i.warning({title:"Warning",message:"Please enter a search query."});return}d(n)});async function d(s){const a=`https://pixabay.com/api/?key=42175181-9f2e4ea0c75ffabf50c3ef9f9&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`;i.info({title:"Searching",message:"Fetching images...",timeout:!1,overlay:!0,id:"loading"});try{const e=await(await fetch(a)).json();e.hits.length>0?u(e.hits):i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"})}catch(r){console.error("Error fetching images:",r),i.error({title:"Error",message:"Failed to fetch images."})}finally{i.destroy(document.querySelector(".iziToast-overlay"))}}const m=new l({elements:"#gallery a"});function u(s){const n=document.getElementById("gallery");n.innerHTML="";const a=document.createDocumentFragment();s.forEach(r=>{const e=document.createElement("a");e.href=r.largeImageURL,e.setAttribute("data-lightbox","image-set"),e.setAttribute("data-title",r.tags);const t=document.createElement("img");t.src=r.webformatURL,t.alt=r.tags,e.appendChild(t);const o=document.createElement("div");o.className="info",o.innerHTML=`Likes: ${r.likes}, Views: ${r.views}, Comments: ${r.comments}, Downloads: ${r.downloads}`,e.appendChild(o);const c=document.createElement("div");c.className="image-card",c.appendChild(e),a.appendChild(c)}),n.appendChild(a),m.refresh()}
//# sourceMappingURL=commonHelpers.js.map
