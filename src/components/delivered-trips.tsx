"use client";

import { Card, CardBody, CircularProgress, Divider } from "@nextui-org/react";
import { TripDataMap, TripDataProps } from "@/types";

export const DeliveredTrips = ({ dataMap }: { dataMap: TripDataMap | any }) => {

  const totalDelivered = dataMap?.['DELTrips']?.length;
  const delayedDelivered = dataMap?.['delayedTrips']?.filter(({currentStatusCode}: any) => currentStatusCode === 'DEL')?.length;
  const onTimeDelivered = dataMap?.['onTimeTrips']?.filter(({currentStatusCode}: any) => currentStatusCode === 'DEL')?.length;

  console.log(" DATA Discrepency :- \n\t onTimeDelivered by etaDays = ", onTimeDelivered, "\n\t onTimeTrips Delivered from deduced from delayed = ", totalDelivered - delayedDelivered);

  return (
    <Card className="basis-1/3 border-none px-3 py-2 shadow-xl shadow-gray-200 dark:shadow-gray-800/70 dark:bg-gray-700">
      <CardBody className="flex flex-row gap-6 justify-between leading-9">
        <div className="grow flex flex-col justify-between">
        <h6 className="text-lg">Delivered</h6>
        <h3 className="text-4xl font-semibold">{Intl.NumberFormat('en-IN').format(totalDelivered)}</h3>
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
          {Intl.NumberFormat('en-IN').format((totalDelivered - delayedDelivered))}
          </span>
        </p>}
          value={(totalDelivered - delayedDelivered) / totalDelivered * 100}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
    </Card>
  );
};
