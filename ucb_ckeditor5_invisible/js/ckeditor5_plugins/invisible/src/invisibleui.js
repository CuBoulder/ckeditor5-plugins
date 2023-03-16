// Handles the admin side where youre adding buttons to toolbar
// Also handles the format and display during editing
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import invisibleIcon from '../../../../icons/invisible.svg'

export default class InvisibleUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		// Add strikethrough button to feature components.
		editor.ui.componentFactory.add( 'invisible', () => {
	
			const button = new ButtonView();

			button.label = 'Invisible';
			button.icon = invisibleIcon;
			button.tooltip = true;
			button.withText = true;

			return button;
		} );
	}
}
	