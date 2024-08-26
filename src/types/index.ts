import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TripDataProps = {
  _id: string,
  tripId: string,
  transporter: string,
  tripStartTime: string,
  currentStatusCode: 'BKD' | 'INT' | 'RD' | 'DEL' | string,
  currenStatus: 'Booked' | 'In Transit' | 'Reached Destination' | 'Delivered' | string,
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
  tatStatus?: string
};
