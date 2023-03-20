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
			allowWhere: '$block',
			allowChildren: ['paragraph', 'text', 'em'] // add 'em' to allowChildren
		} );
	}
	_defineConverters() {
		const { conversion } = this.editor;
	  
		// Conversion from a view element to a model attribute
		conversion.for('upcast').elementToElement({
		  view: {
			name: 'span',
			classes: 'sr-only'
		  },
		  model: (viewElement, { writer: modelWriter }) => {
			// Create a `ucb-invisible` model element with an empty text node
			return modelWriter.createElement('ucb-invisible');
		  }
		});
	  
		// Conversion from a model element to a view element
		conversion.for('dataDowncast').elementToElement({
		  model: 'ucb-invisible',
		  view: (modelElement, { writer: viewWriter }) => {
			// Create a `span` view element with the `sr-only` class
			const spanElement = viewWriter.createContainerElement('span', {
			  class: 'sr-only'
			});
			// Iterate through the child nodes of the `ucb-invisible` model element
			// and add them to the `span` view element
			for (const childNode of modelElement.getChildren()) {
			  const viewChildNode = conversion.convertModelToView(childNode);
			  viewWriter.insert(viewChildNode, spanElement);
			}
			return spanElement;
		  }
		});
	  
		// Conversion from a model element to a view element
		conversion.for('editingDowncast').elementToElement({
		  model: 'ucb-invisible',
		  view: (modelElement, { writer: viewWriter }) => {
			// Create a `span` view element with the `sr-only` class
			const spanElement = viewWriter.createEditableElement('span', {
			  class: 'sr-only'
			});
			// Iterate through the child nodes of the `ucb-invisible` model element
			// and add them to the `span` view element
			for (const childNode of modelElement.getChildren()) {
			  const viewChildNode = conversion.convertModelToView(childNode);
			  viewWriter.insert(viewChildNode, spanElement);
			}
			return spanElement;
		  }
		});
	  }
	}	  