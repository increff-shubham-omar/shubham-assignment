"use client";

import { Card, CardBody, Chip } from "@nextui-org/react";
import { TripDataMap, TripDataProps } from "@/types";

export const DelayedTrips = ({ dataMap }: { dataMap: TripDataMap | any }) => {

  const delayedInTransit = dataMap?.['delayedTrips']?.filter(({currentStatusCode}: any) => currentStatusCode === 'INT');
  const delayedDelivered = dataMap?.['delayedTrips']?.filter(({currentStatusCode}: any) => currentStatusCode === 'DEL');

  return (
    <Card className="basis-1/2 border-none p-0 shadow-xl shadow-gray-200 dark:shadow-gray-800/70 dark:bg-gray-700">
      <CardBody className="flex flex-row gap-x-6 p-0 leading-9">
        <div className="grow flex flex-col pl-5 py-2 justify-around bg-danger-100/50 border-r border-danger-600">
          <h6 className="text-lg text-danger-600">Delayed</h6>
          <h3 className="text-2xl">{Intl.NumberFormat('en-IN').format(dataMap?.['delayedTrips']?.length || 0)}</h3>
        </div>

        <div className="grow flex flex-col py-2 justify-around border-r border-gray-300 dark:border-gray-500">
          <h6 className="text-lg">In Transit</h6>
          <h3 className="text-2xl flex gap-3 items-center">
            {Intl.NumberFormat('en-IN').format(delayedInTransit?.length || 0)}
            <Chip color="primary" size="sm" radius="sm" variant="flat" className="text-sm">
              {Intl.NumberFormat('en-IN', { style: 'percent' }).format(delayedInTransit?.length / dataMap?.['delayedTrips']?.length)}
            </Chip>
          </h3>
        </div>

        <div className="grow flex flex-col pr-5 py-2 justify-around">
          <h6 className="text-lg">Delivered</h6>
          <h3 className="text-2xl flex gap-3 items-center">
            {Intl.NumberFormat('en-IN').format(delayedDelivered?.length || 0)}
            <Chip color="primary" size="sm" radius="sm" variant="flat" className="text-sm">
              {Intl.NumberFormat('en-IN', { style: 'percent' }).format(delayedDelivered?.length / dataMap?.['delayedTrips']?.length)}
            </Chip>
          </h3>
        </div>
      </CardBody>
    </Card>
  );
};
