import './App.css'
import Papa from 'papaparse'
import { useState } from 'react';
import { Title } from './components/Title';

export default function App() {

  const [parsedData, setParsedData] = useState([]);
  const [tableCols, setTableCols] = useState([]);
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,

      complete: function (results) {
        const columnsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          columnsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setParsedData(results.data);
        setTableCols(columnsArray[0]);
        setValues(valuesArray);

      },
    })
  }

  return (
    <>
      <Title name='Exiba sua planilha de forma amigável'/>
      <div>
        <p>Importe somente aquivos .csv</p>
        <input
          type="file"
          accept=".csv"
          onChange={changeHandler}
        />
        {/* JSON file converted */}
        {console.log(parsedData)}
      </div>
      <br />
      <table>
        <thead>
          <tr>
            {tableCols.map((cols, id) => {
              return <th key={id}>{cols}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, id) => {
                  return <td key={id}>{val}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}