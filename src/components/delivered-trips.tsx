"use client";

import { Card, CardBody, CircularProgress, Divider } from "@nextui-org/react";
import { TripDataProps } from "@/types";

export const DeliveredTrips = ({ data }: { [key: string]: TripDataProps[] | any }) => {

  return (
    <Card className="basis-1/3 border-none px-3 py-2 shadow-xl shadow-gray-200 dark:shadow-gray-800/70 dark:bg-gray-700">
      <CardBody className="flex flex-row gap-6 justify-between leading-9">
        <div className="grow flex flex-col justify-between">
        <h6 className="text-lg">Delivered</h6>
        <h3 className="text-4xl font-semibold">{Intl.NumberFormat('en-IN').format(data?.['DELTrips']?.length || 0)}</h3>
        </div>
        <Divider orientation="vertical" className="grow-0 mr-4 dark:bg-gray-500" />
        <CircularProgress
          classNames={{
            svg: "w-20 h-20",
            indicator: "stroke-emerald-500 dark:stroke-emerald-600",
            track: "stroke-gray-200 dark:stroke-gray-600",
            value: "text-sm",
          }}
          label={<p className="-mt-1">Ontime:
          <span className="text-primary ml-1">
          {Intl.NumberFormat('en-IN').format(data?.['onTimeTrips']?.length || 0)}
          </span>
        </p>}
          value={data?.['onTimeTrips']?.length / data?.['data']?.length * 100}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
    </Card>
  );
};
