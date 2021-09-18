import React from "react";

const TableHeader = ({ selectedSort, onSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }

        console.log(selectedSort);
    };

    const arrow = (
        <i
            className={
                "bi bi-caret-" +
                (selectedSort.order === "asc" ? "down-fill" : "up-fill")
            }
        ></i>
    );

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        scope="col"
                        {...{ role: columns[column].path && "button" }}
                    >
                        {columns[column].name}
                        {selectedSort.path === columns[column].path
                            ? arrow
                            : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
