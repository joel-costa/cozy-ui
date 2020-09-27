import React, { useMemo } from 'react'
import merge from 'lodash/merge'
import MuiListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import PropTypes from 'prop-types'

const makeTypographyProp = (
  typographyProps,
  className,
  ellipsis,
  hasSecondaryIcon
) => {
  return merge({}, typographyProps, {
    classes: {
      root: cx(
        className,
        ellipsis ? 'u-ellipsis' : null,
        hasSecondaryIcon ? 'u-mr-1-half' : null
      )
    }
  })
}

const ListItemText = props => {
  const {
    primaryText,
    secondaryText,
    primaryTypographyProps: primaryTypographyPropsProp,
    secondaryTypographyProps: secondaryTypographyPropsProp,
    primaryTextClassName,
    secondaryTextClassName,
    hasSecondaryIcon,
    ellipsis,
    children,
    ...rest
  } = props

  const primaryTypographyProps = useMemo(() => {
    return makeTypographyProp(
      primaryTypographyPropsProp,
      primaryTextClassName,
      ellipsis,
      hasSecondaryIcon
    )
  }, [
    primaryTypographyPropsProp,
    primaryTextClassName,
    ellipsis,
    hasSecondaryIcon
  ])

  const secondaryTypographyProps = useMemo(() => {
    return makeTypographyProp(
      secondaryTypographyPropsProp,
      secondaryTextClassName,
      ellipsis,
      hasSecondaryIcon
    )
  }, [
    secondaryTypographyPropsProp,
    secondaryTextClassName,
    ellipsis,
    hasSecondaryIcon
  ])

  return (
    <MuiListItemText
      primary={primaryText || children}
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
