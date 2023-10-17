import React, { useEffect, useState } from 'react'



export default function Translate() {

 const[scriptLoaded,setScriptLoaded] = useState(false);

  useEffect(() => {
    
    if(!scriptLoaded){
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js';
    script.async = true;
     script.onerror =() =>{
        console.error('error loading')
     }
     script.onload =() =>{
        new window.google.translate.TranslateElement({
            pageLanguage: 'en' },
         'google_translate_element'
        )
     };
   
     document.body.appendChild(script);
     setScriptLoaded(true)
    }
  }, [scriptLoaded]);



  return <div id="google_translate_element"></div>;
    
  
};
