import * as React from 'react';
import changes from '../listes/changes.ts';
import { Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const rows = changes;

function ChangeTable() {
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                "& .actions": { color: "text.secondary" },
                "& .textPrimary": { color: "text.primary" },
            }}>
            <h1>/Change</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                App name
                            </TableCell>
                            <TableCell align="center">
                                New value
                            </TableCell>
                            <TableCell align="center">
                                Old value
                            </TableCell>
                            <TableCell align="center">
                                Change type
                            </TableCell>
                            <TableCell align="center">
                                Change date
                            </TableCell>
                            <TableCell align="center">
                                Changed by
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ?
                            rows?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.new.key}: {row.new.value}</TableCell>
                                    <TableCell align="right">{row.old.key}: {row.old.value}</TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.refdate}</TableCell>
                                    <TableCell align="right">{row.user}</TableCell>
                                </TableRow>))
                            :
                            <TableRowsLoader rNums={10} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

const TableRowsLoader = ({ rNums }) => {
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

export default ChangeTable;