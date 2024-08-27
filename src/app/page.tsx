import { SummarySection } from "@/components/summary-section";
import { data } from "@/app/model/frontendAssignment.json";
import { TableSection } from "@/components/table-section";
import { TripDataProps } from "@/types";

export default function Home() {

  let dataMap: any = data?.reduce((acc: { [key: string]: TripDataProps[] | any }, curr) => {
    let {tripStartTime, tripEndTime, etaDays, lastPingTime, currentStatusCode, currenStatus} = curr;
    acc['statusEnums'][currentStatusCode] = currenStatus;
    let startTime: any = new Date(tripStartTime),
    endTime: any = new Date(tripEndTime || lastPingTime),
    diffDays = (endTime - startTime) / (1000 * 3600 * 24);
    let tatStatus = diffDays <= etaDays ? 'On Time' : (etaDays <= 0 ? 'Others' : 'Delayed'),
    finalObj = {...curr, ...{tatStatus}};
    switch (tatStatus) {
      case 'On Time':
              acc['onTimeTrips'].push(finalObj);
              break;
            case 'Delayed':
              acc['delayedTrips'].push(finalObj);
              break;
            case 'Others':
              acc['otherTrips'].push(finalObj);
              break;
    }
    let key = currentStatusCode + 'Trips';
    acc[key] = acc[key] || [];
    acc[key].push(finalObj);
    acc['data'].push(finalObj);
    return acc;
  }, {statusEnums: {}, data: [], onTimeTrips: [], delayedTrips: [], otherTrips: [],});

  console.log("crafted dataMap: ", dataMap);


  return (
    <>
    <section className="flex gap-6 py-4">
      <SummarySection dataMap={dataMap}/>
    </section>
    <section className="flex gap-3 py-4">
      <TableSection data={dataMap?.data}/>
    </section>
    </>
  );
}
