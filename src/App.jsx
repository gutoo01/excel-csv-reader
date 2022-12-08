import './App.css'
import Papa from 'papaparse'
import { useState } from 'react';
import { Title } from './components/Title';

export default function App() {

  const [parsedData, setParsedData] = useState([]);
  const [parsedCsv, setParsedCsv] = useState([]);

  const [tableCols, setTableCols] = useState([]);
  const [tableColsCsv, setTableColsCsv] = useState([]);

  const [values, setValues] = useState([]);
  const [valuesCsv, setValuesCsv] = useState([]);
  
  // PAPAPARSE
  const changeHandler = (event) => {
    Papa.unparse(event.target.files[0], {
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

  // UNPARSE
  const changeCsvHandler = (event) => {
    Papa.parse(event.target.files[0], {
      quotes: false, //or array of booleans
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ",",
      header: true,
      newline: "\r\n",
      skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
      columns: null, //or array of strings 

      complete: function (results) {
        const columnsArrayCsv = [];
        const valuesArrayCsv = [];

        results.data.map((d) => {
          columnsArrayCsv.push(Object.keys(d));
          valuesArrayCsv.push(Object.values(d));
        });

        setParsedCsv(results.data);
        setTableColsCsv(columnsArrayCsv[0]);
        setValuesCsv(valuesArrayCsv);
      },
    })
  }


  return (
    <>
      {/* PAPARSED */}
      <div>
        <Title name='Converta seu JSON em CSV' />
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
      </div>

      {/* UNPARSED */}
      <div>
        <Title name='Converta seu CSV em JSON' />
        <div>
          <p>Importe somente aquivo .json</p>
          <input
            type="file"
            accept=".json"
            onChange={changeCsvHandler}
          />
          {/* CSV file converted */}
          {console.log(parsedCsv)}
        </div>
        <br />
        <table>
          <thead>
            <tr>
              {tableColsCsv.map((cols, id) => {
                return <th key={id}>{cols}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {valuesCsv.map((value, index) => {
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
      </div>
    </>
  )
}

// tentar tratar dados com Regex