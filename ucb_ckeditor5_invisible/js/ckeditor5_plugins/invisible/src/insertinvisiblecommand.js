// Not required to work. Form editing - command js for Box, adds butotns to add paragraphs before or after
import { Command } from 'ckeditor5/src/core';


export default class InvisibleCommand extends Command {
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

  execute() {
    const { model } = this.editor;
    const {selection } = this.document;

    model.change((writer) => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(addInvisible(writer));
    });
  }

}
