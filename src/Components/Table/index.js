import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles((theme) => ({
  tableHead: {
    fontSize: 30
  },
  tablePaper: {
    width: '100%',
    overflow: 'auto'
  },
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
}))

function CustomTable(props) {
  const { columns, dataSource, rowKey, tableProps, rowExpandable } = props
  const classes = useStyles()

  return (
    <Paper className={classes.tablePaper}>
      <Table {...tableProps}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {rowExpandable ? <TableCell /> : null}
            {columns.map(({ tableCellProps = {}, key, title }) => {
              return (
                <TableCell {...tableCellProps} key={key}>
                  {title}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {dataSource.map((record) => {
            return <Row {...props} key={rowKey(record)} record={record} />
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  rowKey: PropTypes.func,
  tableProps: PropTypes.object,
  rowExpandable: PropTypes.bool
}
CustomTable.defaultProps = {
  columns: [],
  dataSource: [],
  rowKey: (record) => record.id,
  tableProps: {},
  rowExpandable: false
}

export default CustomTable

function Row(props) {
  const { columns, rowKey, rowExpandable, expandedRowRender, record } = props
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  return (
    <React.Fragment>
      <TableRow className={classes.root} hover key={rowKey(record)}>
        {rowExpandable ? (
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        ) : null}
        {columns.map(({ tableCellProps = {}, key, render, dataIndex }) => {
          return (
            <TableCell {...tableCellProps} key={`${key}-${rowKey(record)}`}>
              {render ? render(record[dataIndex], record) : record[dataIndex]}
            </TableCell>
          )
        })}
      </TableRow>
      {rowExpandable ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan='100%'>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                {expandedRowRender && expandedRowRender(record)}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </React.Fragment>
  )
}
Row.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  rowKey: PropTypes.func,
  tableProps: PropTypes.object,
  rowExpandable: PropTypes.bool,
  expandedRowRender: PropTypes.func,
  record: PropTypes.object
}
