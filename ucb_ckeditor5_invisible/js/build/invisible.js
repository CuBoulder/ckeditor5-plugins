!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.invisible=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/ui.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function s(i){var o=t[i];if(void 0!==o)return o.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,s),n.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};return(()=>{"use strict";s.d(i,{default:()=>l});var e=s("ckeditor5/src/core.js");class t extends e.Command{refresh(){const{model:e}=this.editor,{selection:t}=e.document,s=e.schema.findAllowedParent(t.getFirstPosition(),"ucb-invisible");this.isEnabled=null!==s}execute(){const{model:e}=this.editor,{selection:t}=this.document;e.change((t=>{e.insertContent(addInvisible(t))}))}}class o extends e.Plugin{init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("addInvisible",new t(this.editor))}_defineSchema(){this.editor.model.schema.register("ucb-invisible",{isContent:!0})}_defineConverters(){const e=this.editor.conversion;e.for("downcast").attributeToElement({model:"ucb-invisible",view:{name:"span",classes:"sr-only"}}),e.for("upcast").elementToElement({model:{key:"ucb-invisible",value:!1},view:{name:"span",classes:"sr-only"}})}}var n=s("ckeditor5/src/ui.js");class r extends e.Plugin{init(){const e=this.editor;e.t;e.ui.componentFactory.add("invisible",(()=>{const e=new n.ButtonView;return e.label="Invisible",e.icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">\x3c!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --\x3e<path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/></svg>',e.tooltip=!0,e.withText=!0,e}))}}class c extends e.Plugin{static get requires(){return[o,r]}}const l={Invisible:c}})(),i=i.default})()));