import React from 'react'

import Icon from '../Icon'
import CloudBrokenIcon from '../Icons/CloudBroken'
import Button from '../Button'

import { withViewerLocales } from './withViewerLocales'
import styles from './styles.styl'

const NoNetworkViewer = ({ t, onReload }) => (
  <div className={styles['viewer-canceled']}>
    <Icon icon={CloudBrokenIcon} width={160} height={140} />
    <h2>{t('Viewer.error')}</h2>
    <Button onClick={onReload} label={t('Viewer.retry')} />
  </div>
)

export default withViewerLocales(NoNetworkViewer)
