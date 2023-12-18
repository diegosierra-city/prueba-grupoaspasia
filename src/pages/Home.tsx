import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import type { Book, AppState } from '../redux/interfaces'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allBooks } from "../redux/actions";



const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}




export default function Home() {
  const dispatch:any = useDispatch();
  const rerender = React.useReducer(() => ({}), {})[1]

  const data = useSelector((store: AppState) => store.listBooks);
  const listAuthors = useSelector((store: AppState) => store.listAuthors);
  const filter = useSelector((store: AppState) => store.filter);

  const [sorting, setSorting] = React.useState<SortingState>([])

  useEffect(() => {
    dispatch(allBooks());
   //dispatch({ type: "FETCH_AUTHORS" });
  }
  , []);

  const columns = React.useMemo<ColumnDef<Book>[]>(
    () => [
      
          {
            accessorKey: 'name',
            header: () => 'Titulo',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            header: () =>  'Authors', 
            accessorKey: 'authors', 
            accessorFn: (row) => row.authors.join(", "), 
          },
          {
            accessorKey: 'country',
            header: () => 'País',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            accessorKey: 'numberOfPages',
            header: () => 'Paginas',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
                  
    ],
    []
  )

  

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div>{table.getRowModel().rows.length} Libros</div>
    </div>
  )
}