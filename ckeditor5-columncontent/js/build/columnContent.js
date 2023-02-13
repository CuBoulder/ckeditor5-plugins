!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.CKEditor5=n():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.columnContent=n())}(self,(()=>(()=>{var __webpack_modules__={"./js/ckeditor5_plugins/columnContent/src/columncontent.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ColumnContent)\n/* harmony export */ });\n/* harmony import */ var _columncontentediting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columncontentediting */ "./js/ckeditor5_plugins/columnContent/src/columncontentediting.js");\n/* harmony import */ var _columncontentui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./columncontentui */ "./js/ckeditor5_plugins/columnContent/src/columncontentui.js");\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/**\n * @file This is what CKEditor refers to as a master (glue) plugin. Its role is\n * just to load the “editing” and “UI” components of this Plugin. Those\n * components could be included in this file, but\n *\n * I.e, this file\'s purpose is to integrate all the separate parts of the plugin\n * before it\'s made discoverable via index.js.\n */\n// cSpell:ignore columncontentediting columncontentui\n\n// The contents of ColumnContentUI and ColumnContent editing could be included in this\n// file, but it is recommended to separate these concerns in different files.\n\n\n\n\n// Note that ColumnContentEditing and ColumnContentUI also extend `Plugin`, but these\n  // are not seen as individual plugins by CKEditor 5. CKEditor 5 will only\n  // discover the plugins explicitly exported in index.js.\n  class ColumnContent extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.Plugin {\n    static get requires() {\n      return [_columncontentediting__WEBPACK_IMPORTED_MODULE_0__["default"], _columncontentui__WEBPACK_IMPORTED_MODULE_1__["default"]];\n    }\n  }\n  \n\n//# sourceURL=webpack://CKEditor5.columnContent/./js/ckeditor5_plugins/columnContent/src/columncontent.js?')},"./js/ckeditor5_plugins/columnContent/src/columncontentediting.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ColumnContentEditing)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/widget */ \"ckeditor5/src/widget.js\");\n/* harmony import */ var _insertcolumncontentcommand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insertcolumncontentcommand */ \"./js/ckeditor5_plugins/columnContent/src/insertcolumncontentcommand.js\");\n\n\n\n\n\nclass ColumnContentEditing extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  static get requires() {\n    return [ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.Widget];\n  }\n\n  init() {\n    this._defineSchema();\n    this._defineConverters();\n\n    this.editor.commands.add(\n      'insertTwoColumns',\n      new _insertcolumncontentcommand__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.editor),\n    );\n  }\n\n  _defineSchema() {\n    const schema = this.editor.model.schema;\n\n    schema.register('twoColumns', {\n      isObject: true, // Whether an item is \"self-contained\" and should be treated as a whole.\n      allowWhere: '$block', // Allow everywhere where $block elements are allowed.\n    });\n\n    schema.register('column', {\n      isLimit: true, // It can be understood as whether this element should not be split by \"Enter\".\n      allowIn: 'twoColumns',\n      allowContentOf: '$root', // Allow children of anything that is allowed in $root.\n    });\n  }\n\n  _defineConverters() {\n    this._defineColumnsContainerConverters();\n    this._defineColumnConverters();\n  }\n\n  _defineColumnsContainerConverters() {\n    const { conversion } = this.editor;\n\n    const twoColumns = {\n      model: 'twoColumns',\n      view: {\n        name: 'div',\n        classes: 'row',\n      },\n    };\n\n    // HTML content to model conversion.\n    conversion.for('upcast').elementToElement(twoColumns);\n    // Model to HTML content conversion when getting data out of the editor.\n    conversion.for('dataDowncast').elementToElement(twoColumns);\n\n    // Model to HTML conversion in the editing view (in WYSIWYG).\n    conversion.for('editingDowncast').elementToElement({\n      model: 'twoColumns',\n      view: (modelElement, { writer: viewWriter }) => {\n        const div = viewWriter.createContainerElement('div', {\n          class: 'row',\n        });\n\n        return (0,ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.toWidget)(div, viewWriter, { label: 'Two col layout widget' });\n      }\n    });\n  }\n\n  _defineColumnConverters() {\n    const { conversion } = this.editor;\n\n    const column = {\n      model: 'column',\n      view: {\n        name: 'div',\n        classes: 'col-6',\n      },\n    };\n\n    // HTML content to model conversion.\n    conversion.for('upcast').elementToElement(column);\n    // Model to HTML content conversion when getting data out of the editor\n    conversion.for('dataDowncast').elementToElement(column);\n\n    // Model to HTML conversion in the editing view (in WYSIWYG).\n    conversion.for('editingDowncast').elementToElement({\n      model: 'column',\n      view: (modelElement, { writer: viewWriter }) => {\n        const div = viewWriter.createEditableElement('div', {\n          class: 'col-6',\n        });\n        return (0,ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.toWidgetEditable)(div, viewWriter);\n      },\n    });\n  }\n}\n\n\n\n//# sourceURL=webpack://CKEditor5.columnContent/./js/ckeditor5_plugins/columnContent/src/columncontentediting.js?")},"./js/ckeditor5_plugins/columnContent/src/columncontentui.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ColumnContentUI)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var _icons_two_columns_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../icons/two-columns.svg */ \"./icons/two-columns.svg\");\n\n\n\n\nclass ColumnContentUI extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  init() {\n    const editor = this.editor;\n\n    editor.ui.componentFactory.add('columnContent', (locale) => {\n      const insertColumnContentCommandName = 'insertTwoColumns';\n      const command = editor.commands.get(insertColumnContentCommandName);\n      const buttonView = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonView(locale);\n\n      buttonView.set({\n        label: editor.t('Two Col'),\n        icon: _icons_two_columns_svg__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n        tooltip: true\n      });\n\n      // The button will be enabled only when the command will be.\n      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');\n\n      this.listenTo(buttonView, 'execute', () => {\n        editor.execute(insertColumnContentCommandName);\n      });\n\n      return buttonView;\n    });\n  }\n}\n\n//# sourceURL=webpack://CKEditor5.columnContent/./js/ckeditor5_plugins/columnContent/src/columncontentui.js?")},"./js/ckeditor5_plugins/columnContent/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _columncontent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columncontent */ "./js/ckeditor5_plugins/columnContent/src/columncontent.js");\n/**\n * @file The build process always expects an index.js file. Anything exported\n * here will be recognized by CKEditor 5 as an available plugin. Multiple\n * plugins can be exported in this one file.\n *\n * I.e. this file\'s purpose is to make plugin(s) discoverable.\n */\n// cSpell:ignore columncontent\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  ColumnContent: _columncontent__WEBPACK_IMPORTED_MODULE_0__["default"]\n});\n\n\n//# sourceURL=webpack://CKEditor5.columnContent/./js/ckeditor5_plugins/columnContent/src/index.js?')},"./js/ckeditor5_plugins/columnContent/src/insertcolumncontentcommand.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InsertColumnContentCommand)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n\n\nclass InsertColumnContentCommand extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Command {\n  // Runs only when the command is executed.\n  execute() {\n    const { model } = this.editor;\n\n    model.change((writer) => {\n      const twoCol = writer.createElement('twoColumns');\n      const col1 = writer.createElement('column');\n      const col2 = writer.createElement('column');\n\n      writer.append(col1, twoCol);\n      writer.append(col2, twoCol);\n\n      // [UX enhancement] \n      // Here we intentionally insert an empty paragraph to which we will later move the selection.\n      // This way the user will be able to immediately start typing in the newly created column.\n      const paragraph = writer.createElement('paragraph');\n      writer.append(paragraph, col1);\n      writer.appendElement('paragraph', col2);\n\n      model.insertContent(twoCol);\n\n      writer.setSelection(paragraph, 'in');\n    });\n  }\n\n  // Runs every time changes are made to the model, including changing the selection.\n  refresh() {\n    const { model } = this.editor;\n    const { selection } = model.document;\n    const allowedIn = model.schema.findAllowedParent(\n      selection.getFirstPosition(),\n      'twoColumns',\n    );\n\n    // Command is enabled whenever the <twoCol> is allowed in the current selection.\n    this.isEnabled = allowedIn !== null;\n  }\n}\n\n\n//# sourceURL=webpack://CKEditor5.columnContent/./js/ckeditor5_plugins/columnContent/src/insertcolumncontentcommand.js?")},"./icons/two-columns.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" clip-rule=\\"evenodd\\" d=\\"M1.95154 2.6825C1.95154 2.13021 2.39925 1.6825 2.95154 1.6825H17.0484C17.6007 1.6825 18.0484 2.13021 18.0484 2.6825V17C18.0484 17.5523 17.6007 18 17.0484 18H2.95154C2.39925 18 1.95154 17.5523 1.95154 17V2.6825ZM3.49994 4.34131C3.49994 3.78902 3.94765 3.34131 4.49994 3.34131H9.49994V16.3413H4.49994C3.94765 16.3413 3.49994 15.8936 3.49994 15.3413V4.34131ZM15.5 3.34131H10.5V16.3413H15.5C16.0523 16.3413 16.5 15.8936 16.5 15.3413V4.34131C16.5 3.78902 16.0523 3.34131 15.5 3.34131Z\\" fill=\\"black\\"/></svg>\\n");\n\n//# sourceURL=webpack://CKEditor5.columnContent/./icons/two-columns.svg?')},"ckeditor5/src/core.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/core.js");\n\n//# sourceURL=webpack://CKEditor5.columnContent/delegated_./core.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/ui.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/ui.js");\n\n//# sourceURL=webpack://CKEditor5.columnContent/delegated_./ui.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/widget.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/widget.js");\n\n//# sourceURL=webpack://CKEditor5.columnContent/delegated_./widget.js_from_dll-reference_CKEditor5.dll?')},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var o=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](o,o.exports,__webpack_require__),o.exports}__webpack_require__.d=(e,n)=>{for(var o in n)__webpack_require__.o(n,o)&&!__webpack_require__.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./js/ckeditor5_plugins/columnContent/src/index.js");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})()));