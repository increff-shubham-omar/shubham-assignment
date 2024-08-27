"use client";

import { useState, useMemo, useCallback } from "react";

import { Button, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination, Selection, ChipProps, SortDescriptor } from "@nextui-org/react";
import { TripDataMap, TripDataProps, columns, statusOptions } from "@/types";

const INITIAL_VISIBLE_COLUMNS = [
  "tripId",
  "transporter",
  "source",
  "dest",
  "phoneNumber",
  "tripEndTime",
  "distanceRemaining",
  "currenStatus",
  "tatStatus",
];

export const TableSection = ({ data }: { data: TripDataProps[] }) => {

//   const [filterValue, setFilterValue] = useState("");
//   const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
//   const [statusFilter, setStatusFilter] = useState<Selection>("all");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
//     column: "age",
//     direction: "ascending",
//   });

//   const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => { return columns; }, [columns]);

    const classNames = useMemo(
        () => ({
          base: "max-h-[600px] overflow-scroll",
          table: "min-h-[300px]",
          wrapper: ["max-h-[382px]", "max-w-3xl"],
          tr: ["border-b"],
          th: ["bg-white", "text-md", "text-default-700", "font-semibold", "border-divider"],
          td: [
            // changing the rows border radius
            // first
            "group-data-[first=true]:first:before:rounded-none",
            "group-data-[first=true]:last:before:rounded-none",
            // middle
            "group-data-[middle=true]:before:rounded-none",
            // last
            "group-data-[last=true]:first:before:rounded-none",
            "group-data-[last=true]:last:before:rounded-none",
          ],
        }),
        [],
      );

//   const filteredItems = useMemo(() => {
//     let filteredUsers = [...users];

//     if (hasSearchFilter) {
//       filteredUsers = filteredUsers.filter((user) =>
//         user.name.toLowerCase().includes(filterValue.toLowerCase()),
//       );
//     }
//     if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
//       filteredUsers = filteredUsers.filter((user) =>
//         Array.from(statusFilter).includes(user.status),
//       );
//     }

//     return filteredUsers;
//   }, [users, filterValue, statusFilter]);

//   const items = useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = useMemo(() => {
//     return [...items].sort((a: User, b: User) => {
//       const first = a[sortDescriptor.column as keyof User] as number;
//       const second = b[sortDescriptor.column as keyof User] as number;
//       const cmp = first < second ? -1 : first > second ? 1 : 0;

//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);


const renderCell = useCallback((trip: TripDataProps, columnKey: React.Key) => {
    // console.log("columnKey = ", columnKey);
    // console.log("headerColumns = ", headerColumns);
    const [colKey, valueKey] = (columnKey + '').split('-');
    const ogValue = trip[colKey as keyof TripDataProps],
    fallbackValue = trip[(valueKey || colKey) as keyof TripDataProps];
    const cellValue = ogValue || fallbackValue;

    // console.log("colKey = ", colKey, "valueKey = ", valueKey, "fallbackValue = ", fallbackValue, "ogValue = ", ogValue);
    switch (colKey) {
      case "tripId":
        return (
            <div className="text-primary text-ellipsis overflow-hidden">{cellValue}</div>
        );
      case "currenStatus":
        return (
            <Chip
            variant="flat"
            radius="sm"
            color={cellValue === 'Delayed' ? 'warning' : (/.*(Booked|In Transit).*/.test(cellValue + '') ? 'primary': 'success')}
            className="text-base px-4"
            >
                {cellValue}
            </Chip>
        );
      case "tatStatus":
        return (
            <Chip
            variant="flat"
            radius="sm"
            color={cellValue === 'Delayed' ? 'danger' : (cellValue === 'Others' ? 'default': 'success')}
            className="text-base px-4"
            >
                {cellValue === 'Others' ? cellValue.slice(0, -1) : cellValue}
            </Chip>
        );
      case "tripEndTime":
        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            timeZone: '+05:30',
          }).format(new Date(cellValue as string));
      default:
        return cellValue;
    }
  }, []);


// const topContent = useMemo(() => {
//     return (
//       <div className="flex flex-col gap-4">
//         <div className="flex justify-between gap-3 items-end">
//           <Input
//             isClearable
//             classNames={{
//               base: "w-full sm:max-w-[44%]",
//               inputWrapper: "border-1",
//             }}
//             placeholder="Search by name..."
//             size="sm"
//             startContent={<SearchIcon className="text-default-300" />}
//             value={filterValue}
//             variant="bordered"
//             onClear={() => setFilterValue("")}
//             onValueChange={onSearchChange}
//           />
//           <div className="flex gap-3">
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   size="sm"
//                   variant="flat"
//                 >
//                   Status
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={statusFilter}
//                 selectionMode="multiple"
//                 onSelectionChange={setStatusFilter}
//               >
//                 {statusOptions.map((status) => (
//                   <DropdownItem key={status.uid} className="capitalize">
//                     {capitalize(status.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   size="sm"
//                   variant="flat"
//                 >
//                   Columns
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={visibleColumns}
//                 selectionMode="multiple"
//                 onSelectionChange={setVisibleColumns}
//               >
//                 {columns.map((column) => (
//                   <DropdownItem key={column.key} className="capitalize">
//                     {capitalize(column.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Button
//               className="bg-foreground text-background"
//               endContent={<PlusIcon />}
//               size="sm"
//             >
//               Add New
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-end items-center">
//           <span className="text-default-400 text-small">Total {users.length} users</span>
//           <label className="flex items-center text-default-400 text-small">
//             Rows per page:
//             <select
//               className="bg-transparent outline-none text-default-400 text-small"
//             //   onChange={onRowsPerPageChange}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     );
//   }, [
//     filterValue,
//     statusFilter,
//     visibleColumns,
//     onSearchChange,
//     onRowsPerPageChange,
//     dataMap?.data?.length,
//     hasSearchFilter,
//   ]);

const topContent = useMemo(() => {
    return (
      <div className="px-3 mb-2 basis-full flex gap-6 items-center">
        <h6 className="text-lg font-semibold">Trip List</h6>
        <Button
          variant="faded"
          radius="sm"
          size="lg"
          className="min-w-44 bg-slate-100 border ml-auto dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-400"
          >
            Update Status
        </Button>
        <Button
          color="primary"
          radius="sm"
          size="lg"
          className="min-w-44"
          >
            Add Trip
        </Button>
      </div>
    );
  }, [data?.length]);

  return (
    <Card className="basis-full border-none shadow-xl px-0 py-2 shadow-gray-200 dark:shadow-gray-800/70 dark:bg-gray-700">
      <CardBody className="px-0">
        <Table
        isHeaderSticky
        removeWrapper
        aria-label="Table section with custom cells, filtering and sorting"
        selectionMode="multiple"
        topContent={topContent}
        topContentPlacement="outside"
        checkboxesProps={{radius: "sm"}}
        classNames={classNames}
        >
          <TableHeader className="shadow-md" columns={headerColumns}>
            {(column) => (
            <TableColumn
            key={`${column.key}-${column.valueKey || ''}`}
            >
            {column.name}
            </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No Trips found"} items={data}>
            {(item) => (
            <TableRow key={item._id} className="border-b">
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
      </Card>
  );
};
