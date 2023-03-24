function App() {
  const columns = ['Name', 'Age', 'Gender'];
  const data = [
    { Name: 'John', Age: 30, Gender: 'Male' },
    { Name: 'Jane', Age: 25, Gender: 'Female' },
    { Name: 'Bob', Age: 40, Gender: 'Male' },
    { Name: 'Mary', Age: 28, Gender: 'Female' },
    { Name: 'Alice', Age: 35, Gender: 'Female' },
  ];
  const pageSize = 2;

  return (
    <div>
      <h1>Table Example</h1>
      <Table columns={columns} data={data} pageSize={pageSize} />
    </div>
  );
}
