"use client";

import { TripDataMap, TripDataProps } from "@/types";
import { TotalTrips } from "./total-trips";
import { DeliveredTrips } from "./delivered-trips";
import { DelayedTrips } from "./delayed-trips";


export const SummarySection = ({ dataMap }: {dataMap: TripDataMap}) => {

  return (
    <>
      <TotalTrips data={dataMap?.data} />
      <DeliveredTrips data={dataMap} />
      <DelayedTrips data={dataMap} />
    </>
  );
};
