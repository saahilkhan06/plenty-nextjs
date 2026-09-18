// import { Dashboard } from "./components/Dashboard/Dashboard";
// import Destinations from "./components/Destinations";

// export const pageRegistry = {
//   dashboard: Dashboard,

//   destinations: Destinations,

//   "destinations/add": AddDestination,

//   "destinations/categories": DestinationCategories,

//   locations: Locations,

//   holiday: Holiday,

//   "holiday/add": AddHoliday,

//   "holiday/categories": HolidayCategories,

//   "trending-deals": TrendingDeals,
// };
import { Dashboard } from "./components/Dashboard/Dashboard";
import Destinations from "./components/Sidepages/Destinations";
import Locations from "./components/Sidepages/Locations";
import SubDestinations from "./components/Sidepages/Subdestinations";


export const pageRegistry = {
  destinations: Destinations,
  dashboard: Dashboard,
  locations:Locations,
  "destinations/sub":SubDestinations
};