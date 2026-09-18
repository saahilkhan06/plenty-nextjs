// import React from "react";
// import { TopBar } from "./TopBar";
// import { Grid } from "./Grid";

// export const Dashboard = () => {
//   return (
//     <div className="bg-white rounded-lg pb-4 shadow">
//       <TopBar />
//       <Grid />
//     </div>
//   );
// };

import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";

export const Dashboard = () => {
  return (
    <div className="w-full max-w-full overflow-hidden bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <Grid />
    </div>
  );
};