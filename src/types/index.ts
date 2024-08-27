import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type TripStatusCode = 'BKD' | 'INT' | 'RD' | 'DEL';

type TripStatus = 'Booked' | 'In Transit' | 'Delayed' | 'Reached Destination' | 'Delivered';

type TATStatus = "On Time" | "Delayed" | "Others";

type TripKeys = "onTime" | "delayed" | "other";

export type Trips = Record<`${TripKeys}Trips`, TripDataProps[]> | Record<`${TripStatusCode}Trips`, TripDataProps[]>;


export type TripDataProps = {
  _id: string,
  tripId: string,
  transporter: string,
  tripStartTime: string,
  currentStatusCode: Readonly<TripStatusCode>,
  currenStatus: Readonly<TripStatus>,
  phoneNumber: number,
  etaDays: number,
  distanceRemaining: number,
  tripEndTime: string,
  source: string,
  sourceLatitude: number,
  sourceLongitude: number,
  dest: string,
  destLatitude: number,
  destLongitude: number,
  lastPingTime: string,
  createdAt: string,
  tatStatus?: TATStatus,
};

export type TripDataMap = TripDataProps & Partial<Trips> & { data?: TripDataProps[] };

export type TripColumn = {
  name: string;
  key: string;
  sortable?: boolean;
  filterable?: boolean;
  valueKey?: keyof TripDataProps;
}


const columns: TripColumn[] = [
  {name: "Trip ID", key: "tripId", sortable: true},
  {name: "Transporter", key: "transporter", sortable: true},
  {name: "Source", key: "source", sortable: true},
  {name: "Destination", key: "dest", sortable: true},
  {name: "Phone", key: "phoneNumber"},
  {name: "ETA", key: "tripEndTime", sortable: true, valueKey: "lastPingTime"},
  {name: "Distance remaining", key: "distanceRemaining", sortable: true},
  {name: "Trip status", key: "currenStatus", sortable: true},
  {name: "TAT status", key: "tatStatus", sortable: true},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

export {columns, statusOptions};