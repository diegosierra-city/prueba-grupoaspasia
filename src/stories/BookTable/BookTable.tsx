import { useEffect, useState, useMemo, InputHTMLAttributes } from 'react';
import './BookTable.css';
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

import {
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'

import type { Book} from '../../redux/interfaces'
import { Link } from 'react-router-dom';

import { BiSolidBookHeart, BiBookHeart, BiSolidHeart } from "react-icons/bi";
import { toggleToCookie } from '../../utilities/cookie';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}



export default function BookTable(listBook: any) {
 //const data = listBook.listBook 
 const [data, setData] = useState(listBook.listBook)

 console.log('DataFavTable:',listBook)
 const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
  []
)
const [globalFilter, setGlobalFilter] = useState('')

const columns = useMemo<ColumnDef<Book>[]>(
 () => [
   
       {
         accessorKey: 'name',
         header: () => 'Titulo',
         cell: info => info.getValue(),
         footer: props => props.column.id,
       },
       {
         header: () =>  'Autor', 
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
         header: () => 'Cant. Páginas',
         cell: info => info.getValue(),
         footer: props => props.column.id,
       },
       {
         accessorKey: 'favorite',
         header: () => <BiSolidHeart />,
         cell: info => info.getValue(),
         footer: props => props.column.id,
       },
               
 ],
 []
)


   
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  useEffect(() => {
    if (data && table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])


  function toggleFavorite(position:number){
    //console.log('Row',data[position])
    //console.log(data[position]['favorite'])
    const isbn:string = data[position]['isbn'];     
   toggleToCookie('favorities',isbn)
   const updatedBooks = [...data];
//console.log('fzz',position,updatedBooks[position]['favorite'])
   updatedBooks[position]['favorite'] = !updatedBooks[position]['favorite'];
   //console.log('fx',updatedBooks)
   setData([...updatedBooks])   
  }

  return (
    <div className="p-2">
      <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <table className='tabla-primary'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
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
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            //console.log('LinkROW:',row.original['url'])
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  //console.log('celda:',cell)
                  return (cell.column.id === 'name'? (
                    <td key={cell.id}>
                      <Link className='links' to={`/detail/${row?.original['url']?.split('/').slice(-1)[0]}`}>{flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}</Link>
                                            
                    </td>) : (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {cell.column.id === 'favorite' && (cell.getValue()? <BiSolidBookHeart size='25px' color="#ff0000" className="cursor-pointer" onClick={()=> toggleFavorite(Number(cell.id.split('_')[0]))} /> : <BiBookHeart size='25px' color="#444" className="cursor-pointer" onClick={()=> toggleFavorite(Number(cell.id.split('_')[0]))} />)}
                      
                    </td>)                   
                )}
                )}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="mt-4" />
      <div className="flex items-center justify-center gap-2 ">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
</div>

<div className="mt-3 flex items-center justify-center gap-2 ">
        <div className="flex items-center gap-1">
          <div>Pagina</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de {' '}
            {table.getPageCount()}
          </strong>
        </div>
        
        <span className="flex items-center gap-1">
          | Ir a la página:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="w-12"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className='text-center text-gray'><small>Total resultados: {table.getPrePaginationRowModel().rows.length} Libros</small></div>
            
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : column.id === 'favorite' ? null : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}