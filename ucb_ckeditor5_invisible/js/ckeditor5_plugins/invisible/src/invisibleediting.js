import { Plugin } from 'ckeditor5/src/core';
import InvisibleCommand from './insertinvisiblecommand';
import { Widget } from 'ckeditor5/src/widget';

export default class InvisibleEditing extends Plugin {
	static get requires() {
		return [Widget];
	  }	

	init() {
		this._defineSchema();
		this._defineConverters();
		this.editor.commands.add(
			'addInvisible',
			new InvisibleCommand(this.editor),
		  );
	}
	_defineSchema() {
		const schema = this.editor.model.schema;
    	// Extend the text node's schema to accept the tooltip attribute.
		schema.register( 'ucb-invisible', {
			allowIn: '$root',
			allowWhere: '$text',
			allowChildren: '$text'
		} );

		schema.extend( '$text', {
			allowAttributes: [ 'ucb-invisible' ]
		} );
	}
	_defineConverters() {
		const {conversion} = this.editor;

		// Conversion from a view element to a model attribute
		conversion.for( 'upcast' ).elementToElement( {
			model: 'ucb-invisible',
			view: {
				name: 'span',
				classes:  'sr-only'
			},
		} );

        // Conversion from a model attribute to a view element
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'ucb-invisible',

            // Callback function provides access to the model attribute value
			// and the DowncastWriter
			view: {
				name: 'span',
				classes: 'sr-only',
			}
		} );


	}
}