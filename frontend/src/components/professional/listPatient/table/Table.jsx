import {useState} from "react";
import styles from "./Table.module.css";
import {
  Table as TableMUI,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Paper,
} from "@material-ui/core";
import SearchBar from "../../searchBar/SearchBar";
import Report from "../../report/Report";

const Table = ({columns, data, token}) => {
  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.patient.name.toLowerCase();
      return postName.includes(query.toLowerCase());
    });
  };

  const pages = [5, 10, 20];
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[pageIndex]);

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("daysToAppointment");

  const [searchQuery, setSearchQuery] = useState();
  const filteredPosts = filterPosts(data, searchQuery);

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPageIndex(0);
  };

  const handleSortRequest = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  const handleClickCell = (id) => {
    setOpenPopup(true);
    setSelectedId(id);
  };

  const GetSortOrder = (order, orderBy) => {
    if (order === "asc") {
      return function (a, b) {
        if (a[orderBy] > b[orderBy]) {
          return 1;
        } else if (a[orderBy] < b[orderBy]) {
          return -1;
        }
        return 0;
      };
    } else {
      return function (a, b) {
        if (a[orderBy] > b[orderBy]) {
          return -1;
        } else if (a[orderBy] < b[orderBy]) {
          return 1;
        }
        return 0;
      };
    }
  };

  const dataSlicer = () => {
    const finalData = filteredPosts
      .sort(GetSortOrder(order, orderBy))
      .slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage);

    return finalData;
  };

  return (
    <>
      <Paper className={styles.tableContainer} elevation={3}>
        <Toolbar>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            name="search"
            label="Procure Paciente"
            placeholder=""
          />
        </Toolbar>

        <TableMUI className={styles.table}>
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCell
                  key={item.id}
                  sortDirection={orderBy === item.id ? order : false}
                >
                  {item.disableSorting ? (
                    item.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === item.id}
                      direction={orderBy === item.id ? order : "asc"}
                      onClick={() => handleSortRequest(item.id)}
                    >
                      {item.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dataSlicer().map((item, index) => (
              <TableRow key={index} onClick={() => handleClickCell(item._id)}>
                <TableCell>
                  {item.daysToAppointment > 0
                    ? item.daysToAppointment + " dias"
                    : "Finalizado"}
                </TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString("pt-br")}
                </TableCell>
                <TableCell>{item.patient.name}</TableCell>
                <TableCell>{item.patient.email}</TableCell>
                <TableCell>{item.patient.cpf}</TableCell>
                <TableCell>{item.patient.phone}</TableCell>
                <TableCell>
                  {new Date(item.patient.birth).toLocaleDateString("pt-br")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableMUI>

        <div>
          <TablePagination
            className={styles.paginationContainer}
            component="div"
            page={pageIndex}
            rowsPerPageOptions={pages}
            labelRowsPerPage="Itens por página"
            rowsPerPage={rowsPerPage}
            count={filteredPosts.length}
            onPageChange={(e, newPage) => setPageIndex(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>

      <Report
        id={selectedId}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        token={token}
      />
    </>
  );
};

export default Table;
