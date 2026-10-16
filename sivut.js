// Lisäsivujen kieli ja teema: samat localStorage-asetukset kuin pääsivulla.
(function(){
  const lue = k => { try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } };
  const t = lue("teema"); if(t==="dark"||t==="light") document.documentElement.dataset.theme = t;
  function kieli(k){
    document.documentElement.lang = k;
    document.querySelectorAll("[data-kieli]").forEach(e=>{ e.hidden = e.dataset.kieli!==k; });
    document.querySelectorAll(".kielet button").forEach(b=>b.setAttribute("aria-pressed", String(b.dataset.k===k)));
    const o = document.querySelector('[data-kieli="'+k+'"] h1'); if(o) document.title = o.textContent+" – "+(k==="en"?"Daily Facts":"Päivän tieto");
  }
  document.querySelectorAll(".kielet button").forEach(b=>b.addEventListener("click",()=>{
    try{ localStorage.setItem("kieli", JSON.stringify(b.dataset.k)); }catch(e){}
    kieli(b.dataset.k);
  }));
  kieli(lue("kieli")==="en" ? "en" : "fi");
})();
