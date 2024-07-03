import * as React from 'react';
import contact from '../listes/contact.ts';
import { Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


  const rows = contact;

function UserTable() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .actions": { color: "text.secondary" },
        "& .textPrimary": { color: "text.primary" },
      }}>
      <h1>/Users</h1>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                  <TableRow>
                      <TableCell align="center" colSpan={3}>
                          Information
                      </TableCell>
                      <TableCell align="center" colSpan={2}>
                          Contact
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>Full Name</TableCell>
                      <TableCell align="right">Right</TableCell>
                      <TableCell align="right">Role</TableCell>
                      <TableCell align="right">Localisation</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Telephone</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  { rows ?
                      rows?.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">{row.name}</TableCell>
                          <TableCell align="right">{row.right}</TableCell>
                          <TableCell align="right">{row.role}</TableCell>
                          <TableCell align="right">{row.loc}</TableCell>
                          <TableCell align="right">{row.mail}</TableCell>
                          <TableCell align="right">{row.tel}</TableCell>
                      </TableRow> ))
                      :
                      <TableRowsLoader rNums={10} />
                    }
              </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  const TableRowsLoader = ({rNums}) => {
    return [...Array(rNums)].map((row, index) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        </TableRow>
      ));
    };

export default UserTable;