"use client";

import { Card, CardBody, Chip } from "@nextui-org/react";
import { TripDataProps } from "@/types";

export const DelayedTrips = ({ data }: { [key: string]: TripDataProps[] | any }) => {

  const delayedInTransit = data?.['delayedTrips']?.filter(({currentStatusCode}: any) => currentStatusCode === 'INT');
  const delayedDelivered = data?.['delayedTrips']?.filter(({currentStatusCode}: any) => currentStatusCode === 'DEL');

  return (
    <Card className="basis-1/2 border-none p-0 shadow-xl shadow-gray-200 dark:shadow-gray-800/70 dark:bg-gray-700" shadow="none">
      <CardBody className="flex flex-row gap-x-6 p-0 leading-9">
        <div className="grow flex flex-col pl-5 py-2 justify-around bg-danger-100/50 border-r border-danger-600">
          <h6 className="text-lg text-danger-600">Delayed</h6>
          <h3 className="text-2xl">{Intl.NumberFormat('en-IN').format(data?.['delayedTrips']?.length)}</h3>
        </div>

        <div className="grow flex flex-col py-2 justify-around border-r border-gray-300 dark:border-gray-500">
          <h6 className="text-lg">In Transit</h6>
          <h3 className="text-2xl flex gap-3 items-center">
            {Intl.NumberFormat('en-IN').format(delayedInTransit?.length)}
            <Chip color="primary" size="sm" radius="sm" variant="flat" className="text-sm">
              {Intl.NumberFormat('en-IN', { style: 'percent' }).format(delayedInTransit?.length / data?.['delayedTrips']?.length)}
            </Chip>
          </h3>
        </div>

        <div className="grow flex flex-col pr-5 py-2 justify-around">
          <h6 className="text-lg">Delivered</h6>
          <h3 className="text-2xl flex gap-3 items-center">
            {Intl.NumberFormat('en-IN').format(delayedDelivered?.length)}
            <Chip color="primary" size="sm" radius="sm" variant="flat" className="text-sm">
              {Intl.NumberFormat('en-IN', { style: 'percent' }).format(delayedDelivered?.length / data?.['delayedTrips']?.length)}
            </Chip>
          </h3>
        </div>
      </CardBody>
    </Card>
  );
};
