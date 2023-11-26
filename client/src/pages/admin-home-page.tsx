import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Close from "@mui/icons-material/Close";
import { useAdmin } from "../hooks/use-admin";

export const AdminHomePage = (): JSX.Element => {
  const {
    openModal,
    closeModal,
    selectedRow,
    columns,
    courseColumns,
    isProfessorDetailModalOpen,
    professorSchedules,
  } = useAdmin();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        flexGrow: 1,
      }}
    >
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 4,
          gap: 2,
          overflow: "auto",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
        >
          <Typography variant="h6" color="black">
            Run scheduler with current professor preferences
          </Typography>
          <Button variant="contained">Run Scheduler</Button>
        </Box>
        <DataGrid
          columns={columns}
          rows={professorSchedules}
          onRowClick={({ row }) => openModal(row.id)}
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[10, 20, 30, 40, 50]}
          disableColumnMenu
          sx={{
            maxWidth: "100%",
            ".MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
        />
        <Dialog open={isProfessorDetailModalOpen} fullWidth maxWidth="xl">
          <DialogTitle>{`${selectedRow?.firstName} ${selectedRow?.lastName}'s Course Selections`}</DialogTitle>
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <DataGrid
              columns={courseColumns}
              rows={selectedRow ? selectedRow?.courses : []}
              disableColumnMenu
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10, 20, 30, 40, 50]}
              disableRowSelectionOnClick
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};
