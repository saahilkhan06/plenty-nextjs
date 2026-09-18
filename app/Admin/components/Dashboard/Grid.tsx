// import React from "react";
// import { StatCards } from "./StatCards";
// import { ActivityGraph } from "./ActivityGraph";
// import { UsageRadar } from "./UsageRadar";
// import { RecentTransactions } from "./RecentTransactions";
// import EnquiryTable from "./Enquerytable";
// export const Grid = () => {
//   return (
//     <div className="px-4 grid gap-3 grid-cols-12">
//       <StatCards />
//       <ActivityGraph />
//       <UsageRadar />
//       <RecentTransactions />
//       <EnquiryTable/>
//     </div>
//   );
// };
import React from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { UsageRadar } from "./UsageRadar";
import { RecentTransactions } from "./RecentTransactions";
import EnquiryTable from "./Enquerytable";

export const Grid = () => {
  return (
    <div className="px-3 sm:px-4 grid grid-cols-12 gap-3">
      <StatCards />
      <ActivityGraph />
      <UsageRadar />
      <RecentTransactions />
      <EnquiryTable />
    </div>
  );
};