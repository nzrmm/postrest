import { get } from "lodash";

import { cn } from "@/utils/style";

export type IColumnType<T> = {
  key: string;
  title: string;
  render?: (column: IColumnType<T>, item: T) => void;
};

type ITableProps<T> = {
  data: T[];
  columns: IColumnType<T>[];
};

const Table = <T,>({ data, columns }: ITableProps<T>) => {
  return (
    <div className={cn("relative overflow-x-auto rounded-lg")}>
      <table className={cn("w-full text-left")}>
        <thead
          className={cn(
            "bg-neutral-100 text-neutral-900 uppercase tracking-widest"
          )}
        >
          <tr>
            {columns.map((column, columnIndex) => (
              <th key={columnIndex} scope="col" className={cn("px-6 py-3")}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={cn("bg-white text-gray-700")}>
          {data.map((item, itemIndex) => (
            <tr key={itemIndex} className={cn("border-b border-b-neutral-200")}>
              {columns.map((column, columnIndex) => {
                const value = get(item, column.key);
                return (
                  <td key={columnIndex} className={cn("px-6 py-4")}>
                    {column.render ? column.render(column, item) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
