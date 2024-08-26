"use client";

import { TripDataProps } from "@/types";
import { TotalTrips } from "./total-trips";
import { DeliveredTrips } from "./delivered-trips";
import { DelayedTrips } from "./delayed-trips";


export const SummarySection = ({ data }: {data: TripDataProps[]}) => {

  let dataMap: any = data?.reduce((acc: { [key: string]: TripDataProps[] | any }, curr) => {
    let {tripStartTime, tripEndTime, etaDays, lastPingTime, currentStatusCode, currenStatus} = curr;
    acc['statusEnums'][currentStatusCode] = currenStatus;
    let startTime: any = new Date(tripStartTime),
    endTime: any = new Date(tripEndTime || lastPingTime),
    diffDays = (endTime - startTime) / (1000 * 3600 * 24);
    curr['tatStatus'] = diffDays <= etaDays ? 'On Time' : (etaDays <= 0 ? 'Others' : 'Delayed');
    switch (curr['tatStatus']) {
      case 'On Time':
              acc['onTimeTrips'].push(curr);
              break;
            case 'Delayed':
              acc['delayedTrips'].push(curr);
              break;
            case 'Others':
              acc['otherTrips'].push(curr);
              break;
    }
    let key = currentStatusCode + 'Trips';
    acc[key] = acc[key] || [];
    acc[key].push(curr);
    acc['data'].push(curr);
    return acc;
  }, {statusEnums: {}, data: [], onTimeTrips: [], delayedTrips: [], otherTrips: [],});

  console.log("crafted dataMap: ", dataMap);

  return (
    <>
      <TotalTrips data={dataMap?.data} />
      <DeliveredTrips data={dataMap} />
      <DelayedTrips data={dataMap} />
    </>
  );
};
