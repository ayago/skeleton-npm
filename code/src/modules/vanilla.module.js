function minifyHTML(html){
    return html.replace(/>( |\n|\t)*</g, '><').trim();
}

export { minifyHTML };