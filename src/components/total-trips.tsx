
import { Card, CardBody } from "@nextui-org/react";
import { TripDataProps } from "@/types";

export const TotalTrips = ({ data }: {data?: TripDataProps[]}) => {

  return (
    <Card className="basis-1/3 border-none px-3 py-2 shadow-xl shadow-gray-200 dark:shadow-gray-800/70 dark:bg-gray-700">
      <CardBody className="flex flex-col justify-between leading-9">
        <h6 className="text-lg">Total Trips</h6>
        <h1 className="text-4xl font-semibold">{Intl.NumberFormat('en-IN').format(data?.length || 0)}</h1>
      </CardBody>
    </Card>
  );
};
