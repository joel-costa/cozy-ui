import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { BaseText } from '../Text'
import Icon, { iconPropType } from '../Icon'
import styles from './styles.styl'
import Stack from '../Stack'

import Typography from 'cozy-ui/transpiled/react/Typography'

export const Empty = ({
  icon,
  title,
  text,
  children,
  className,
  ...restProps
}) => {
  return (
    <Stack
      className={cx(className, styles.Empty, 'u-ta-center')}
      {...restProps}
    >
      <Icon
        className={styles.EmptyImage}
        icon={icon}
        width="100%"
        height="100%"
      />
      {title && (
        <Typography
          tag="h2"
          className={styles.EmptyTitle}
          variant="h3"
          component="h1"
        >
          {title}
        </Typography>
      )}
      {text && (
        <Typography variant="body1" color="textSecondary" component="p">
          {text}
        </Typography>
      )}
      <div className={styles.EmptyText}>{children}</div>
    </Stack>
  )
}

Empty.propTypes = {
  icon: iconPropType.isRequired,
  title: PropTypes.node.isRequired,
  text: PropTypes.node,
  className: PropTypes.string
}

export default Empty
