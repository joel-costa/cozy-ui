The `Viewer` component can be used to display the content of various file types. In order to download and display the files, it will need a `cozy-client` instance in the React context.

Once rendered, the `Viewer` will take up all the available space in it's container (using `position: absolute`). It can be paired with the `Overlay` component to take up the whole screen.

The `Viewer` can display an **information panel** to show additional information about the current file (e.g. whether a file is certified).

```jsx
import Variants from 'docs/components/Variants';
import Card from 'cozy-ui/transpiled/react/Card';
import Checkbox from 'cozy-ui/transpiled/react/Checkbox';
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme';
import Viewer from 'cozy-ui/transpiled/react/Viewer';
import Stack from 'cozy-ui/transpiled/react/Stack';
import Paper from 'cozy-ui/transpiled/react/Paper';
import Typography from 'cozy-ui/transpiled/react/Typography';
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media';
import Icon from 'cozy-ui/transpiled/react/Icon';
// The DemoProvider inserts a fake cozy-client in the React context.
import DemoProvider from './docs/DemoProvider';
import Overlay from 'cozy-ui/transpiled/react/Overlay';

// We provide a collection of (fake) io.cozy.files to be rendered
const files = [
  {
    _id: 'audio',
    class: 'audio',
    name: 'Sample.mp3',
    mime: 'audio/mp3'
  },
  {
    _id: 'pdf',
    class: 'pdf',
    name: 'Demo.pdf',
    mime: 'application/pdf'
  },
  {
    _id: 'text',
    class: 'text',
    name: 'Demo.txt',
    mime: 'text/plain'
  },
  {
    _id: 'image',
    class: 'image',
    name: 'Demo.jpg',
    mime: 'image/jpg'
  },
  {
    _id: 'none',
    class: 'unknown',
    name: 'Unsupported file type',
    mime: '???/???'
  }
];

// The host app will usually need a small wrapper to display the Viewer. This is a very small example of such a wrapper that handles opening, closing, and navigating between files.
initialState = {
  viewerOpened: isTesting(),
  currentFileIndex: 0,
  showToolbarCloseButton: true
};

const initialVariants = [
  { navigation: true, toolbar: true }
];

const toggleViewer = () => setState({ viewerOpened: !state.viewerOpened });
const handleToggleToolbarClose = () => setState({ showToolbarCloseButton: !state.showToolbarCloseButton });
const onFileChange = (file, nextIndex) => setState({ currentFileIndex: nextIndex });

const PanelContent = ({ currentFile }) => {
  return (
    <Stack
      spacing="s"
      className="u-flex u-flex-column u-h-100"
    >
      <Paper className={'u-ph-2 u-flex u-flex-items-center u-h-3'} elevation={2} square>
        <Typography variant="h4">Informations utiles</Typography>
      </Paper>
      <Paper className={'u-ph-2 u-pv-1-half'} elevation={2} square>
        <Typography variant="body1">Titre du fichier : {currentFile.name}</Typography>
      </Paper>
      <Paper className={'u-ph-2 u-pv-1-half u-flex-grow-1'} elevation={2} square>
        <Typography variant="h4">
          <Media className="u-mb-half">
            <Img>
              <Icon icon="carbonCopy" className="u-mr-half" />
            </Img>
            <Bd>
              <Typography variant="body1">Copie conforme</Typography>
            </Bd>
          </Media>
          <Typography variant="caption">Ce document a été fourni par Grand Lyon. Il est défini “authentique et original” par Cozy Cloud, hébergeur de votre Cozy, car il peut affirmer qu'il provient directement du service du Grand Lyon, sans qu’il n’ait subit aucune modification.</Typography>
        </Typography>
      </Paper>
    </Stack>
  )
};

<MuiCozyTheme>
  <DemoProvider>
    <Variants initialVariants={initialVariants}>{
        variant => (
          <>
            {variant.toolbar && (
              <Card className="u-mb-1">
                <div className="u-dib u-mr-1">Toolbar props :</div>
                <Checkbox
                  className="u-dib"
                  label="Close"
                  checked={state.showToolbarCloseButton}
                  onChange={handleToggleToolbarClose}
                />
              </Card>
            )}
            <button onClick={toggleViewer}>Open viewer</button>
            {state.viewerOpened && (
              <Overlay>
                <Viewer
                  files={files}
                  currentIndex={state.currentFileIndex}
                  onCloseRequest={toggleViewer}
                  onChangeRequest={onFileChange}
                  showNavigation={variant.navigation}
                  toolbarProps={{
                    showToolbar: variant.toolbar,
                    showClose: state.showToolbarCloseButton
                  }}
                  panelInfoProps={{
                    showPanel: ({ currentFile }) => currentFile.class === "pdf" || currentFile.class === "audio",
                    PanelContent: PanelContent
                  }}
                />
              </Overlay>
            )}
          </>
        )
      }
    </Variants>
  </DemoProvider>
</MuiCozyTheme>
```

### Using a worker for pdfjs

For performance reasons, it is important to use a web worker when showing PDF files in the viewer. If you use webpack, you should add the following alias in your configuration :

```diff
+ resolve: {
+   alias: {
+     'react-pdf$' : 'react-pdf/dist/entry.webpack.js'
+   }
+ }
```

With this alias, a specific JS file for the worker will be created in the build directory. By design, this directory is only accessible (ie. served by the stack) if you are logged in. If you need the viewer on a public page, you must tell webpack to create the worker in a public folder, that will be served by the stack even if the user is not logged in.

One way to do this is to explicitly load the web worker in your application like this:

```js static
import createWorker from 'react-pdf/dist/pdf.worker.entry.js'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerPort = createWorker()
```

And then configure the [webpack worker-loader](https://github.com/webpack-contrib/worker-loader) to output the file in a publicly served directory:

```js static
{
  test: /\.worker\.entry\.js$/,
  issuer: { not: [/node_modules\//] }, // only for the worker loaded by the app, leave the workers created by dependencies alone
  use: [{
    loader: 'worker-loader',
    options: {
      name: 'public-folder/[name].[hash].worker.js'
    }
  }]
}
```

### Only works with React

The `Viewer` can be used only in a `React` Application. You can't use it with `Preact`.
