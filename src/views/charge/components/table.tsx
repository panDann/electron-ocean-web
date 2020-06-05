import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  prop: 'number' | 'name' | 'total' | 'profit'
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: Column[] = [
  { prop: 'number', label: '账务编号', minWidth: 50 },
  { prop: 'name', label: '账务类别', minWidth: 100 },
  { prop: 'total', label: '营收', minWidth: 50 },
  { prop: 'profit', label: '利润', minWidth: 50 },
];

export interface Data {
  number: number;
  name: string;
  total: number;
  profit: number;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({rows}:{rows:Data[]}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.prop}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.prop} align={column.align}>
                          <span className={`${column.prop=='profit'&&'success-color'}`}>{row[column.prop]}</span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
