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

const Table = ({columns, data}) => {
  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(query.toLowerCase());
    });
  };

  const pages = [5, 10, 20];
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[pageIndex]);

  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const [searchQuery, setSearchQuery] = useState();
  const filteredPosts = filterPosts(data, searchQuery);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPageIndex(0);
  };

  const handleSortRequest = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
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
              <TableRow key={index}>
                <TableCell>
                  {new Date(item.date).toLocaleDateString("pt-br")}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.cpf}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  {new Date(item.birth).toLocaleDateString("pt-br")}
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
            rowsPerPage={rowsPerPage}
            count={filteredPosts.length}
            onPageChange={(e, newPage) => setPageIndex(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </>
  );
};

export default Table;
