// Simple loader que busca traducciones en un JSON local y aplica por data-key
(function(){
  const translations = {
    es: {
      plastico_title: 'Proyecto Bioplásticos',
      plastico_principal: 'Proyecto: Elaboración de Bioplásticos Caseros',
      fund_tit: 'Fundamento teórico',
      ecua_tit: 'Ecuación general simplificada',
      obj_gen: 'Objetivo general',
      obj_esp: 'Objetivos específicos',
      conceptos_tit: 'Conceptos clave',
      mat_tit: 'Materiales utilizados',
      proc_tit: 'Procedimiento general',
      res_tit: 'Resultados obtenidos (resumen)',
      obs_gen: 'Observaciones generales',
      analisis_tit: 'Análisis científico',
      conc_tit: 'Conclusiones',
  colaboradores_tit: 'Colaboradores'
    },
    en: {
      plastico_title: 'Bioplastics Project',
      plastico_principal: 'Project: Homemade Bioplastics',
      fund_tit: 'Theoretical background',
      ecua_tit: 'General simplified equation',
      obj_gen: 'General objective',
      obj_esp: 'Specific objectives',
      conceptos_tit: 'Key concepts',
      mat_tit: 'Materials used',
      proc_tit: 'General procedure',
      res_tit: 'Results obtained (summary)',
      obs_gen: 'General observations',
      analisis_tit: 'Scientific analysis',
      conc_tit: 'Conclusions',
  colaboradores_tit: 'Collaborators'
    }
  };

  function apply(lang){
    document.querySelectorAll('[data-key]').forEach(el=>{
      const k = el.getAttribute('data-key');
      const v = translations[lang] && translations[lang][k];
      if(v) el.innerText = v;
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const lang = localStorage.getItem('idioma') || 'es';
    apply(lang);
    const btnEn = document.getElementById('EN');
    const btnEs = document.getElementById('SP');
    if(btnEn) btnEn.addEventListener('click', ()=>{ apply('en'); localStorage.setItem('idioma','en'); });
    if(btnEs) btnEs.addEventListener('click', ()=>{ apply('es'); localStorage.setItem('idioma','es'); });
  });
})();
