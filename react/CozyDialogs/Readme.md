Pre-built modals ready to be directly used in applications, based on MUI Dialog.

* Dialog : default Cozy modal
* ConfirmDialog : used for confirmation popups
* IllustrationDialog : used for illustration as title
* FixedDialog : default one but with both title/actions fixed
* FixedActionsDialog : default one but with title fluid and actions fixed

Will automatically:

* Be aria-labelled via the title
* Switch to fullscreen on mobile unless the size is small

### Props

* size : `<string>` Can be "s", "m" (default) or "l"
* opened : `<boolean>` (required) To open/close the modal
* onClose : `<function>` (required) Triggered function on modal close action
* title : `<node>` Title of the modal
* content : `<node>` Content of the modal
* actions : `<node>` Actions of the modal
* actionsLayout : `<string>` Can be "row" or "column"

Additionally, all the CozyDialogs support [MUI Dialog's props](https://v3.material-ui.com/api/dialog/).

```jsx
import {
  Dialog,
  ConfirmDialog,
  IllustrationDialog,
  FixedDialog,
  FixedActionsDialog
} from  'cozy-ui/transpiled/react/CozyDialogs'

import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Typography from 'cozy-ui/transpiled/react/Typography'

const handleClose = () => setState({ modalOpened: !state.modalOpened })

const DialogComponent = state.modal

const ExampleDialogActions = () => {
  return (
    <>
      <Button
        theme="secondary"
        onClick={handleClose}
        label={'Close Modal'}
      />
      <Button
        theme="primary"
        label='Do something'
        onClick={() => alert('click')}
      />
    </>
  )
}

const ConfirmDialogActions = () => {
  return (
    <>
      <Button
        theme="secondary"
        onClick={handleClose}
        label={'Close Modal'}
      />
      <Button
        theme="danger"
        label='Do something destructive'
        onClick={() => alert('click')}
      />
    </>
  )
}

const dialogTitles = {
  ConfirmDialog: "Are you sure ?",
  IllustrationDialog: <Icon icon="cloud" size="140" />,
  FixedDialog: 'Fixed Dialog',
  FixedActionsDialog: 'Fixed Actions Dialog',
  Dialog: 'Dialog'
}

const dialogContents = {
  ConfirmDialog: "Content of a confirm dialog, precising what the actions will do, and asking the user if she is sure.",
  IllustrationDialog: "An IllustrationDialog contains short content." + content.ada.short,
  FixedDialog: "A FixedDialog can contain very long content. Actions are at the bottom of the content are not visible to the user if she has not scrolled to the bottom. " + content.ada.long,
  FixedActionsDialog: "A FixedActionsDialog can contain very long content. Actions are visible even without scrolling. " + content.ada.long,
  Dialog: "A normal Dialog should contain short content. " + content.ada.short
}

const dialogActions = {
  ConfirmDialog: <ConfirmDialogActions />,
  IllustrationDialog: <ExampleDialogActions />,
  FixedDialog: <ExampleDialogActions />,
  FixedActionsDialog: <ExampleDialogActions />,
  Dialog: <ExampleDialogActions />
}

const dialogs = [
  Dialog,
  ConfirmDialog,
  IllustrationDialog,
  FixedDialog,
  FixedActionsDialog
];

const StateRadio = ({ name, ...props }) => {
  return <input
    type='radio'
    name={name}
    checked={state[name] == props.value}
    onChange={() => setState({ [name]: props.value })}
    {...props}
  />
}

const toggleDialog = dialog => {
  setState({
    modalOpened: !state.modalOpened,
    modal: dialog
  })
}

initialState = {
  modalOpened: true,
  modal: Dialog,
  size: 'medium',
  actionsLayout: 'row',
  content: 'default',
  theme: 'normal'
};

<>
  <BreakpointsProvider>
    <p>Content:
      <StateRadio value='default' name='content' /> default{' '}
      <StateRadio value='short' name='content' /> short{' '}
      <StateRadio value='long' name='content' /> long
    </p><p>Size:
      <StateRadio value='small' name='size' /> small {' '}
      <StateRadio value='medium' name='size' /> medium {' '}
      <StateRadio value='large' name='size' /> large
    </p><p>Actions layout:
      <StateRadio value='row' name='actionsLayout' /> row{' '}
      <StateRadio value='column' name='actionsLayout' /> column
    </p>
    <DialogComponent
      size={DialogComponent !== ConfirmDialog ? state.size : undefined}
      open={state.modalOpened}
      onClose={handleClose}
      title={dialogTitles[DialogComponent.name]}
      content={
        <Typography variant='body1' color='textPrimary'>
          { state.content == 'default'
          ? dialogContents[DialogComponent.name]
          : state.content == 'long'
            ? content.ada.long
            : content.ada.short}
        </Typography>}
      actions={dialogActions[DialogComponent.name]}
      actionsLayout={state.actionsLayout}
    />
  </BreakpointsProvider>
  {dialogs.map(dialog => (
    <button key={`open-btn-${dialog.name}`} data-test-id={`open-btn-${dialog.name}`} onClick={() => toggleDialog(dialog)}>
      Open {dialog.name}
    </button>
  ))}
</>
```
