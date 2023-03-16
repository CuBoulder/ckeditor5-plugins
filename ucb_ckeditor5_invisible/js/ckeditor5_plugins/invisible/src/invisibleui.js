// Handles the admin side where youre adding buttons to toolbar
// Also handles the format and display during editing
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/eye-slash-solid.svg'

export default class InvisibleUI extends Plugin {
	init() {
		const editor = this.editor;
	
		// This will register the simpleBox toolbar button.
		editor.ui.componentFactory.add('invisible', () => {
		  const command = editor.commands.get('addInvisible');
		  const buttonView = new ButtonView();
	
		  // Create the toolbar button.
		  buttonView.set({
			label: 'Invisible',
			icon: icon,
			tooltip: true,
		  });
	
		  // Bind the state of the button to the command.
		  buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');
	
		  // Execute the command when the button is clicked (executed).
		  this.listenTo(buttonView, 'execute', () =>
			editor.execute('addInvisible'),
		  );
	
		  return buttonView;
		});
	  }
	}
	