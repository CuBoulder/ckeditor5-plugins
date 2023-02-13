import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertColumnContentCommand from './insertcolumncontentcommand';

export default class ColumnContentEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertTwoColumns',
      new InsertColumnContentCommand(this.editor),
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('twoColumns', {
      isObject: true, // Whether an item is "self-contained" and should be treated as a whole.
      allowWhere: '$block', // Allow everywhere where $block elements are allowed.
    });

    schema.register('column', {
      isLimit: true, // It can be understood as whether this element should not be split by "Enter".
      allowIn: 'twoColumns',
      allowContentOf: '$root', // Allow children of anything that is allowed in $root.
    });
  }

  _defineConverters() {
    this._defineColumnsContainerConverters();
    this._defineColumnConverters();
  }

  _defineColumnsContainerConverters() {
    const { conversion } = this.editor;

    const twoColumns = {
      model: 'twoColumns',
      view: {
        name: 'div',
        classes: 'row',
      },
    };

    // HTML content to model conversion.
    conversion.for('upcast').elementToElement(twoColumns);
    // Model to HTML content conversion when getting data out of the editor.
    conversion.for('dataDowncast').elementToElement(twoColumns);

    // Model to HTML conversion in the editing view (in WYSIWYG).
    conversion.for('editingDowncast').elementToElement({
      model: 'twoColumns',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'row',
        });

        return toWidget(div, viewWriter, { label: 'Two col layout widget' });
      }
    });
  }

  _defineColumnConverters() {
    const { conversion } = this.editor;

    const column = {
      model: 'column',
      view: {
        name: 'div',
        classes: 'col-6',
      },
    };

    // HTML content to model conversion.
    conversion.for('upcast').elementToElement(column);
    // Model to HTML content conversion when getting data out of the editor
    conversion.for('dataDowncast').elementToElement(column);

    // Model to HTML conversion in the editing view (in WYSIWYG).
    conversion.for('editingDowncast').elementToElement({
      model: 'column',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-6',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}

