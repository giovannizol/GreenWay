import React from "react";
import "./Table.css";

const Table = ({ headers, data, className = "" }) => {
  if (!headers || headers.length === 0) return null;

  return (
    <div className={`table-container ${className}`}>
      <table className="default-table aaa">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index} 
                style={header.width ? { width: header.width } : {}}
              >
                {typeof header === "string" ? header : header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => {
                  const key = typeof header === "string" ? header : header.key;
                  return (
                    <td key={colIndex}>
                      {row[key] !== undefined ? row[key] : "-"}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} style={{ textAlign: "center" }}>
                Nessun dato presente
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
