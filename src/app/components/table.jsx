import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ selectedSort, onSort, columns, data }) => {
    return (
        <table className="table">
            <TableHeader
                selectedSort={selectedSort}
                onSort={onSort}
                columns={columns}
            />
            <TableBody data={data} columns={columns} />
        </table>
    );
};

export default Table;
