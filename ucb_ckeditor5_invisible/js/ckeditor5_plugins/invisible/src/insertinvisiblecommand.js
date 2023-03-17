/**
 * @file defines insertInvisibleCommand, which is executed when the Invisible
 * toolbar button is pressed.
 */
// cSpell:ignore simpleboxeditingimport { Command } from 'ckeditor5/src/core';


export default class InvisibleCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(addInvisible(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // Invisible is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'ucb-invisible',
    );

    // If the cursor is not in a location where a simpleBox can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function addInvisible(writer) {
  // Create instances of the three elements registered with the editor in
  // simpleboxediting.js.
  const invisible = writer.createElement('ucb-invisible');

  // Append the title and description elements to the simpleBox, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(invisible);

  // Return the element to be added to the editor.
  return invisible;
}