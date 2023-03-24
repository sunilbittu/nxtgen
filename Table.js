import React, { useState } from 'react';

function Table(props) {
  const { columns, data, pageSize } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumns, setSearchColumns] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(0);

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!searchColumns[column] || searchColumns[column])
      )
    );
  }, [data, columns, searchTerm, searchColumns]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const pageCount = Math.ceil(sortedData.length / pageSize);
  const pages = [...Array(pageCount).keys()];

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleColumnSearchChange = (column, value) => {
    setSearchColumns((prevSearchColumns) => ({ ...prevSearchColumns, [column]: value }));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search all columns"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {columns.map((column, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Search ${column}`}
              value={searchColumns[column] || ''}
              onChange={(e) => handleColumnSearchChange(column, e.target.value)}
            />
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} onClick={() => setSortConfig({ key: column, direction: 'ascending' })}>
                {column}
                {sortConfig && sortConfig.key === column && (
                  <span>{sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={`${rowIndex}-${columnIndex}`}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul>
          {pages.map((pageIndex) => (
            <li key={pageIndex}>
              <button onClick={() => handlePageClick(pageIndex)}>{pageIndex + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

