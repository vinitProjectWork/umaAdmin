import DataTable from "react-data-table-component";

const Table = ({
  columns,
  data,
  paginationData,
  handlePerRowsChange,
  handlePageChange,
  isSelectableRows = false,
}) => {
  const { pagination } = paginationData ?? [];
  return (
    <DataTable
      columns={columns}
      data={data}
      responsive
      pagination
      paginationServer
      selectableRows={isSelectableRows}
      paginationTotalRows={pagination?.total}
      onChangeRowsPerPage={(e) => handlePerRowsChange(e)}
      onChangePage={(e) => handlePageChange(e)}
    />
  );
};

export default Table;
