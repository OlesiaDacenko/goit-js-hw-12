import{a as v,S as M,i as n}from"./assets/vendor-BjRz3xa9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const w="25313829-c54e0cdb371427617e83b262e",B="https://pixabay.com/api/";async function g(r,t=1){try{return(await v.get(B,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}catch(s){throw console.log(s.message),s}}const p=document.querySelector(".gallery");let E=new M(".gallery a",{captionsData:"alt",captionDelay:250});function m(r){const t=r.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:l,comments:L,downloads:b})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img class="gallery-image" src="${s}" alt="${e}" />
        </a>
        <div class="info">
         <div class="info-block">
          <p class="label" >Likes: </p>
          <p class="value" >${o}</p> </div>
           <div class="info-block">
          <p class="label">Views:</p>
          <p class="value" >${l}</p> </div>
           <div class="info-block">
          <p class="label">Comments:</p>
          <p class="value" >${L}</p> </div>
           <div class="info-block">
          <p class="label">Downloads:</p>
          <p class="value" >${b}</p></div>
        </div>
      </li>`).join("");p.insertAdjacentHTML("beforeend",t),E.refresh()}function R(){p.innerHTML=" "}function S(){document.getElementById("loader").classList.remove("is-hidden")}function q(){document.getElementById("loader").classList.add("is-hidden")}const f=document.getElementById("load-more-btn");function h(){f.classList.remove("is-hidden")}function u(){f.classList.add("is-hidden")}const y=document.querySelector(".form");document.querySelector(".gallery");const i=document.getElementById("load-more-btn");u();let c=1,d=" ";y.addEventListener("submit",H);async function H(r){if(r.preventDefault(),u(),d=y.elements["search-text"].value.trim(),!d){n.error({message:"Поле пошуку не може бути порожнім. Введіть запит!",position:"topRight"});return}R(),S(),await g(d,c).then(t=>{if(t.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const s=Math.ceil(t.totalHits/15);m(t.hits),c<s?h():(u(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}).catch(t=>{n.error({message:"Не вдалося завантажити зображення. Спробуйте пізніше.",position:"topRight"}),console.log(t.message)}).finally(()=>{q(),r.target.reset()})}i.addEventListener("click",P);async function P(r){c++,i.disabled=!0,i.innerHTML="Loading...";try{const t=await g(d,c);m(t.hits),i.disabled=!1,i.innerHTML="Load more";const s=Math.ceil(t.totalHits/15);c<s?h():(u(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const a=document.querySelector(".gallery-item");console.log(a.getBoundingClientRect());const e=a.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}catch(t){console.log(t.message),n.error({message:"Не вдалося завантажити ще зображень.",position:"topRight"})}finally{i.disabled=!1,i.innerHTML="Load more"}}
//# sourceMappingURL=index.js.map
