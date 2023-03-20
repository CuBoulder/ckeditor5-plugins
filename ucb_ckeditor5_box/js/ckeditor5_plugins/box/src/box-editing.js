import { Plugin } from 'ckeditor5/src/core';
import BoxCommand from './box-command';

export default class BoxEditing extends Plugin {
	init() {
		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add(
			'addBox', new BoxCommand(this.editor)
		);
	}
	_defineSchema() {
		const schema = this.editor.model.schema;

		// Extend the text node's schema to accept the tooltip attribute.
		schema.extend('$text', {
			allowAttributes: ['ucb-box']
		});
	}
	_defineConverters() {
		const conversion = this.editor.conversion;

		// Conversion from a model attribute to a view element
		conversion.for('downcast').attributeToElement({
			model: 'ucb-box',

			// Callback function provides access to the model attribute value
			// and the DowncastWriter
			view: (modelAttributeValue, conversionApi) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement('div', {
					title: modelAttributeValue
				});
			}
		});

		// Conversion from a view element to a model attribute
		conversion.for('upcast').elementToAttribute({
			view: {
				name: 'div',
				attributes: ['title']
			},
			model: {
				key: 'ucb-box',

				// Callback function provides access to the view element
				value: viewElement => {
					const title = viewElement.getAttribute('title');
					return title;
				}
			}
		});
	}
}
