import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from "./AuthProvider";
import { useTable } from "react-table";
import axios from "axios";

function Client() {
    const auth = useAuth();
    const [clients, setClient] = useState();
    
    useEffect(()=>{
      axios.get(`/fmi/odata/v4/${process.env.REACT_APP_DATABASE}/${process.env.REACT_APP_TABLE}`,{
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Basic " + btoa(auth.user + ":" + auth.token)
          }})
        .then(res=> {
          const results = res.data.value.map(client => {
            return {
                  id: client.id,
                  first_name: client.first_name,
                  last_name: client.last_name,
                  email: client.email,
                  gender: client.gender,
                  country: client.country,
                  city: client.city,
              }
          })
          // set data to state
          setClient(results)
        })
    },[auth.user, auth.token]);
    const data = useMemo(()=> clients ?? [], [clients]);

    const columns = React.useMemo(() => [
      {
          Header: 'ID',
          accessor: 'id', // accessor is the "key" in the data
      },
      {
          Header: 'First Name',
          accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
      ],
      []
    )

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })

    return (
        <div className="container">
          <nav className="flex flex-row justify-end">
            <button id="logout" onClick={() => auth.logOut()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
          </nav>
        <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Clients</h1>
        <div className="p-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table {...getTableProps()} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (  
                <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  {row.cells.map(cell => {
                    return (
                      <td
                      className="px-6 py-4"
                      >
                      {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
        </div>
      </div>  
    )
}

export default Client