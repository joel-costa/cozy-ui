import React, { useMemo } from 'react'
import MuiListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Text, Caption } from '../Text'
import styles from './styles.styl'

const ListItemText = props => {
  const {
    primaryText,
    secondaryText,
    className,
    primaryTextClassName,
    secondaryTextClassName,
    hasSecondaryIcon,
    ellipsis,
    children,
    ...rest
  } = props

  const primaryTypographyProps = useMemo(() => {
    return {
      classes: {
        root: cx(
          primaryTextClassName,
          ellipsis ? 'u-ellipsis' : null,
          hasSecondaryIcon ? 'u-mr-1-half' : null
        )
      }
    }
  }, [primaryTextClassName, ellipsis])

  const secondaryTypographyProps = useMemo(() => {
    return {
      classes: {
        root: cx(
          secondaryTextClassName,
          ellipsis ? 'u-ellipsis' : null,
          hasSecondaryIcon ? 'u-mr-1-half' : null
        )
      }
    }
  }, [secondaryTextClassName, ellipsis])

  return (
    <MuiListItemText
      primary={primaryText}
      primaryTypographyProps={primaryTypographyProps}
      secondary={secondaryText}
      secondaryTypographyProps={secondaryTypographyProps}
      {...rest}
    />
  )
}

ListItemText.propTypes = {
  children: PropTypes.node,
  primaryText: PropTypes.node,
  primaryTextClassName: PropTypes.string,
  secondaryText: PropTypes.node,
  secondaryTextClassName: PropTypes.string,
  className: PropTypes.string,
  ellipsis: PropTypes.bool
}

ListItemText.defaultProps = {
  ellipsis: true
}

export default withStyles({
  root: {
    paddingLeft: 0
  }
})(ListItemText)
