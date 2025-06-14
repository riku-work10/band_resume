import React from 'react';

function Contact() {
  return (
    <div className="flex flex-col items-center my-2">
      <div className="w-full max-w-3xl">
        <div className="relative w-full" style={{ paddingTop: '160%' }}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScFX46WFqJe-5-HE5nf2-IOVchj1lVaS8hX5HOAdNn_SlV87Q/viewform?embedded=true"
            className="absolute top-0 left-0 w-full h-full border-0"
            title="Google Form"
          >
            読み込んでいます…
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
