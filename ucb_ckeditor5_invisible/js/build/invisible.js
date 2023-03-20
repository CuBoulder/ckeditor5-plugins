!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.invisible=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function i(o){var s=t[o];if(void 0!==s)return s.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,i),r.exports}i.d=(e,t)=>{for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};return(()=>{"use strict";i.d(o,{default:()=>d});var e=i("ckeditor5/src/core.js");class t extends e.Command{execute(){const e=this.editor.model;e.change((t=>{const i=function(e){const t=e.createElement("ucb-invisible");return t}(t);e.insertContent(i,e.document.selection)}))}refresh(){const e=this.editor.model,t=e.document.selection,i=e.schema.findAllowedParent(t.getFirstPosition(),"ucb-invisible");this.isEnabled=null!==i}}var s=i("ckeditor5/src/widget.js");class r extends e.Plugin{static get requires(){return[s.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("addInvisible",new t(this.editor))}_defineSchema(){this.editor.model.schema.register("ucb-invisible",{allowWhere:"$block",allowChildren:["paragraph","text","em"]})}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({view:{name:"span",classes:"sr-only"},model:(e,{writer:t})=>t.createElement("ucb-invisible")}),e.for("dataDowncast").elementToElement({model:"ucb-invisible",view:(t,{writer:i})=>{const o=i.createContainerElement("span",{class:"sr-only"});for(const s of t.getChildren()){const t=e.convertModelToView(s);i.insert(t,o)}return o}}),e.for("editingDowncast").elementToElement({model:"ucb-invisible",view:(t,{writer:i})=>{const o=i.createEditableElement("span",{class:"sr-only"});for(const s of t.getChildren()){const t=e.convertModelToView(s);i.insert(t,o)}return o}})}}var n=i("ckeditor5/src/ui.js");class c extends e.Plugin{init(){const e=this.editor;e.ui.componentFactory.add("invisible",(()=>{const t=e.commands.get("addInvisible"),i=new n.ButtonView;return i.label="Invisible",i.icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">\x3c!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --\x3e<path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/></svg>',i.tooltip=!0,i.withText=!0,i.bind("isOn","isEnabled").to(t,"value","isEnabled"),this.listenTo(i,"execute",(()=>e.execute("addInvisible"))),i}))}}class l extends e.Plugin{static get requires(){return[r,c]}static get pluginName(){return"ucb-invisible"}}const d={Invisible:l}})(),o=o.default})()));