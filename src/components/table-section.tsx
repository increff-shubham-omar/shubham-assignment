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

    const headerColumns = useMemo(() => { return columns; }, [columns]);

    const classNames = useMemo(
        () => ({
          base: "max-h-[600px] overflow-scroll",
          table: "min-h-[300px]",
          wrapper: ["max-h-[382px]", "max-w-3xl"],
          tr: ["border-b"],
          th: ["bg-white", "text-md", "text-default-700", "dark:bg-gray-800", "font-semibold", "border-divider"],
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

const topContent = useMemo(() => {
    return (
      <div className="px-5 mb-2 basis-full flex gap-6 items-center">
        <h6 className="text-lg font-semibold">Trip List</h6>
        <Button
          variant="faded"
          radius="sm"
          size="lg"
          className="min-w-44 bg-slate-100 border ml-auto dark:dark:bg-gray-600 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400"
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
    <Card className="basis-full border-none shadow-xl px-0 py-2 shadow-gray-200 dark:shadow-gray-800/70 dark:bg-gray-800">
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
