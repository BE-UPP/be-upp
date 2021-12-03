import {useContext} from "react";
import {Controller, useForm} from "react-hook-form";
import {FormContext} from "../FormContext";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
  TableContainer,
} from "@material-ui/core";

const Table = ({questionId, questionLabel, row, col, answer, type, error}) => {
  const {control} = useForm();
  const {addAnswer} = useContext(FormContext);

  const updateAnswer = (rowId, colId) => {
    if (typeof answer === "undefined") {
      answer = {
        type: type,
        value: {},
      };
    }

    answer.value[rowId] = {
      colId: colId,
      colLabel: col[colId],
      rowLabel: row[rowId],
    };

    return answer;
  };

  const isChecked = (rowId, colId) => {
    if (typeof answer === "undefined") return false;

    return answer.value[rowId]?.colId === colId;
  };

  return (
    <FormControl
      component="fieldset"
      style={styles.questionContainer}
      error={error?.value}
    >
      <FormLabel component="legend" style={styles.labelText}>
        {questionLabel}
      </FormLabel>
      <TableContainer>
        <TableUI>
          <TableHead>
            <TableRow>
              <TableCell />
              {Object.entries(col).map(([colId, colLabel]) => (
                <TableCell key={`${questionId}-col1-${colId}`} align="center">
                  {colLabel}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(row).map(([rowId, rowLabel]) => (
              <TableRow
                key={`${questionId}-row-${rowId}`}
                onChange={(event) =>
                  addAnswer(questionId, updateAnswer(rowId, event.target.value))
                }
              >
                <TableCell>{rowLabel}</TableCell>
                <Controller
                  name={rowId}
                  control={control}
                  render={({field: {...field}}) =>
                    Object.entries(col).map(([colId]) => (
                      <TableCell
                        key={`${questionId}-col2-${colId}`}
                        style={{textAlign: "center"}}
                      >
                        <Radio
                          {...field}
                          checked={isChecked(rowId, colId)}
                          value={colId}
                        />
                      </TableCell>
                    ))
                  }
                />
              </TableRow>
            ))}
          </TableBody>
        </TableUI>
        <FormHelperText> {error?.errorText} </FormHelperText>
      </TableContainer>
    </FormControl>
  );
};

const styles = {
  labelText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    margin: "auto",
  },
  questionContainer: {
    flex: 1,
    border: "2px solid gray",
    borderRadius: 15,
    padding: 20,
    width: "50%",
    marginBottom: 50,
  },
};

export default Table;
