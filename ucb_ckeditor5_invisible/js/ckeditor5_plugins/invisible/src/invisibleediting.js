// WHERE YOU SETUP SCHEMA, translates into HTML

import { Plugin } from 'ckeditor5/src/core';

export default class InvisibleEditing extends Plugin {
	init() {
		this._defineSchema();
		this._defineConverters();
	}
	_defineSchema() {
		const schema = this.editor.model.schema;
    	// Extend the text node's schema to accept the tooltip attribute.
		schema.register( 'ucb-invisible', {
			inheritAllFrom: '$text'
		} );
	}
	_defineConverters() {
		const conversion = this.editor.conversion;
		
        // Conversion from a model attribute to a view element
		conversion.for( 'downcast' ).elementToElement( {
			model: 'ucb-invisible',

            // Callback function provides access to the model attribute value
			// and the DowncastWriter
			view: {
				name: 'span',
				classes: 'sr-only',
			}
		} );

		// Conversion from a view element to a model attribute
		conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'span',
				classes:  'sr-only'
			},
			model: 'ucb-invisible',
		} );
	}
}