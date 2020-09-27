import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'

export const BorderedList = withStyles({
  root: {
    borderTop: '1px solid var(--silver)',
    borderBottom: '1px solid var(--silver)'
  }
})(List)

export default List
