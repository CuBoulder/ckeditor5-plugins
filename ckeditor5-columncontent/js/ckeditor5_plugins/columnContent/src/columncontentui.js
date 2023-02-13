import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/two-columns.svg';

export default class ColumnContentUI extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('columnContent', (locale) => {
      const insertColumnContentCommandName = 'insertTwoColumns';
      const command = editor.commands.get(insertColumnContentCommandName);
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: editor.t('Two Col'),
        icon,
        tooltip: true
      });

      // The button will be enabled only when the command will be.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => {
        editor.execute(insertColumnContentCommandName);
      });

      return buttonView;
    });
  }
}