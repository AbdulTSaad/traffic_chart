import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));


const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    console.log({ row, name, onChange })
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};
const TrafficTable = ({data,setData,type}) => {
    const [rows, setRows] = React.useState([...data]);
    const [previous, setPrevious] = React.useState({});
    const classes = useStyles();

    useEffect(()=>{
        setRows(data)
    },[type])
    console.log({data,setData,type})
    const onToggleEditMode = id => {
        setRows(state => {
            const  clone =[...rows]
            return clone.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const  clone =[...rows]
        const newRows = clone.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        // console.log(data);
        // console.log(newRows)
        setData(newRows);
        setRows(newRows);
    };

    const onRevert = id => {
        const  clone =[...rows]
        const newRows = clone.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };
    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="caption table" size="small">
                <caption>Change data dynamically</caption>
                <TableHead>
                    <TableRow>

                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Traffic</TableCell>
                        <TableCell align="left">{type}</TableCell>
                        <TableCell align="left" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <CustomTableCell {...{ row, name: "date", onChange }} />
                            <CustomTableCell {...{ row, name: "traffic", onChange }} />
                            <CustomTableCell {...{ row, name:type, onChange }} />
                            <TableCell className={classes.selectTableCell}>
                                {row.isEditMode ? (
                                    <>
                                        <IconButton
                                            aria-label="done"
                                            onClick={() => onToggleEditMode(row.id)}
                                        >
                                            <DoneIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="revert"
                                            onClick={() => onRevert(row.id)}
                                        >
                                            <RevertIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => onToggleEditMode(row.id)}
                                    >

                                        <EditIcon />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default TrafficTable;

