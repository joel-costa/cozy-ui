import React from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/flow'

import { withClient } from 'cozy-client'

import { FileDoctype } from '../../proptypes'
import Button from '../../Button'

import { withViewerLocales } from '../withViewerLocales'
import styles from '../styles.styl'

const DownloadButton = ({ t, client, file }) => (
  <Button
    className={styles['viewer-noviewer-download']}
    onClick={() => client.collection('io.cozy.files').download(file)}
    label={t('Viewer.download')}
  />
)

DownloadButton.propTypes = {
  t: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  file: FileDoctype
}

export default flow(
  withClient,
  withViewerLocales
)(DownloadButton)
