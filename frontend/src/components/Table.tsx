import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    GridRowModel,
    GridRowsProp,
    GridToolbarContainer,
    GridToolbarExport,
    GridSlots,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import contact from "../listes/contact.ts"
import location from "../listes/location.ts"
import applicationData from "../listes/application.ts";

const listLocation = () => {
    return location.map((loc) => loc.name);
};

const listContact = () => {
    return contact.map((con) => con.name);
};

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [
            ...oldRows,
            {
                id,
                name: "",
                trigram: "",
                mep: new Date(),
                availability: 0,
                ref: false,
                location: "",
                isNew: true,
            },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add an application
            </Button>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function Grid() {
    const [rows, setRows] = React.useState(applicationData);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        if (params.reason === "rowFocusOut") {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 150,
            editable: true,
            preProcessEditCellProps: (params) => {
                const hasError = !/^[A-Z0-9]*$/.test(params.props.value);
                return {
                    ...params.props,
                    error: hasError
                        ? "Only uppercase letters and numbers are allowed"
                        : undefined,
                };
            },
        },
        {
            field: "trigram",
            headerName: "Tri",
            width: 70,
            align: "center",
            headerAlign: "center",
            editable: true,
            preProcessEditCellProps: (params) => {
                const hasError = !/^[A-Z 0-9]{3}$/.test(params.props.value);
                return {
                    ...params.props,
                    error: hasError
                        ? "Must be exactly 3 uppercase letters or numbers"
                        : undefined,
                };
            },
        },
        {
            field: "mep",
            headerName: "Date mep",
            type: "date",
            width: 100,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "availability",
            headerName: "Dispo",
            type: "number",
            width: 100,
            align: "center",
            headerAlign: "center",
            editable: true,
        },
        {
            field: "location",
            headerName: "Localisation",
            type: "singleSelect",
            valueOptions: listLocation,
            width: 180,
            editable: true,
        },
        {
            field: "role",
            headerName: "Contact",
            width: 150,
            editable: true,
            type: "singleSelect",
            valueOptions: listContact,
        },
        {
            field: "ref",
            headerName: "BIA",
            width: 80,
            editable: true,
            type: "boolean",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{ color: "primary.main" }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                "& .actions": { color: "text.secondary" },
                "& .textPrimary": { color: "text.primary" },
            }}
        >
            <h1>/Application</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                keepNonExistentRowsSelected
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: EditToolbar as GridSlots["toolbar"] }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                pagination
            />
        </Box>
    );
}

export default Grid;