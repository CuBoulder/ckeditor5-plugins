/**
 * @file defines insertInvisibleCommand, which is executed when the Invisible
 * toolbar button is pressed.
 */
// cSpell:ignore simpleboxeditingimport { Command } from 'ckeditor5/src/core';
import { Command } from 'ckeditor5/src/core';


export default class InvisibleCommand extends Command {
  execute() {
    const model = this.editor.model;

    model.change(writer => {
      // Insert <ucb-invisible>*</ucb-invisible> at the current selection position
      // in a way that will result in creating a valid model structure.
      const invisible = addInvisible(writer);
      model.insertContent(invisible, model.document.selection);
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;

    // Determine if the cursor (selection) is in a position where adding a
    // Invisible is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'ucb-invisible'
    );

    // If the cursor is not in a location where a ucb-invisible can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function addInvisible(writer) {
  // Create instances of the element registered with the editor.

  const invisible = writer.createElement('ucb-invisible');

  // Return the element to be added to the editor.
  return invisible;
}

