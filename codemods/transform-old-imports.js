const transformImports = require('@cozy/codemods/src/transform-imports')

const transformOldImports = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  transformImports(j, root, {
    imports: {
      Dialog: {
        importPath: 'cozy-ui/transpiled/react/Dialog',
        defaultImport: true
      },
      DialogFile: {
        importPath: 'cozy-ui/transpiled/react/Dialog',
        defaultImport: false
      },
      DialogContent: {
        importPath: 'cozy-ui/transpiled/react/Dialog',
        defaultImport: false
      },
      DialogTitle: {
        importPath: 'cozy-ui/transpiled/react/Dialog',
        defaultImport: false
      },
      DialogActions: {
        importPath: 'cozy-ui/transpiled/react/Dialog',
        defaultImport: false
      },
      DialogContentText: {
        importPath: 'cozy-ui/transpiled/react/Dialog',
        defaultImport: false
      },
      DialogCloseButton: {
        importPath: 'cozy-ui/transpiled/react/Dialog',
        defaultImport: false
      },
      Divider: {
        importPath: 'cozy-ui/transpiled/react/Divider',
        defaultImport: true
      },
      ExpansionPanel: {
        importPath: 'cozy-ui/transpiled/react/ExpansionPanel',
        defaultImport: true
      },
      ExpansionPanelDetails: {
        importPath: 'cozy-ui/transpiled/react/ExpansionPanelDetails',
        defaultImport: true
      },
      ExpansionPanelSummary: {
        importPath: 'cozy-ui/transpiled/react/ExpansionPanelSummary',
        defaultImport: true
      },
      Grid: {
        importPath: 'cozy-ui/transpiled/react/Grid',
        defaultImport: true
      },
      List: {
        importPath: 'cozy-ui/transpiled/react/List',
        defaultImport: true
      },
      ListItem: {
        importPath: 'cozy-ui/transpiled/react/ListItem',
        defaultImport: true
      },
      ListItemIcon: {
        importPath: 'cozy-ui/transpiled/react/ListItemIcon',
        defaultImport: true
      },
      ListItemSecondaryAction: {
        importPath: 'cozy-ui/transpiled/react/ListItemSecondaryAction',
        defaultImport: true
      },
      ListSubheader: {
        importPath: 'cozy-ui/transpiled/react/ListSubheader',
        defaultImport: true
      },
      Switch: {
        importPath: 'cozy-ui/transpiled/react/Switch',
        defaultImport: true
      },
      TextField: {
        importPath: 'cozy-ui/transpiled/react/TextField',
        defaultImport: true
      }
    }
  })

  return root.toSource({ quote: 'single' })
}

module.exports = transformOldImports
