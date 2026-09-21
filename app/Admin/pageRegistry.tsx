import { Dashboard } from "./components/Dashboard/Dashboard";

import AllHolidays from "./Sidepages/AllHolidays/AllHolidays";

import Blogs from "./Sidepages/Blogs/Blogs";

import DestinationFaq from "./Sidepages/DestinationFAQ/DestinationFaq";

import DestinationOther from "./Sidepages/DestinationOther/DestinationOther";

import DestinationResort from "./Sidepages/Destinationresort/DestinationResort";

import Destinations from "./Sidepages/Destinations/Destinations";

import HolidayDeal from "./Sidepages/HolidayDeal/HolidayDeal";

import HotelDeals from "./Sidepages/HotelDeals/HotelDeals";

import HotelOffer from "./Sidepages/HotelOffer/HotelOffer";

import Locations from "./Sidepages/Locations/Locations";

import SubDestinations from "./Sidepages/SubDestinations/Subdestinations";

import TrendingCategory from "./Sidepages/TrendingCategory/TrendingCategory";

import TrendingHotel from "./Sidepages/TrendingHotel/TrendingHotel";

import Users from "./Sidepages/Users/Users";

import HolidayCenter from "./Sidepages/HolidayCenter/HolidayCenter";

import HolidayCenterEnquiry from "./Sidepages/HolidayCenterEnquiry/HolidayCenterEnquiry";

import NileCruise from "./Sidepages/Nilecruise/NileCruise";

import NileCruiseEnquiry from "./Sidepages/NileCruiseEnquiry/NileCruiseEnquiry";

import Webpages from "./Sidepages/Webpages/WebPages";

import BookingSuccess from "./Sidepages/BookingSuccess/BookingSuccess";

import BookingPending from "./Sidepages/BookingPending/BookingPending";

import Faqs from "./Sidepages/ManageFaqs/Faqs";

import TermsCondition from "./Sidepages/TermsCondition/TermsCondition";

import CustomerReviews from "./Sidepages/CustomerReviews/CustomerReviews";

import Banner from "./Sidepages/Banner/Banner";

import Hotels from "./Sidepages/Hotels/Hotels";

import About from "./Sidepages/AboutUs/AboutUs";

export const pageRegistry = {
  // dashboard
  dashboard: Dashboard,

  // destinations
  destinations: Destinations,
  "destinations/sub": SubDestinations,
  "destinations/other": DestinationOther,
  "destinations/faq": DestinationFaq,
  "destinations/resorts": DestinationResort,

  // locations
  locations: Locations,

  // holiday
  holiday: AllHolidays,
  "holiday/deal": HolidayDeal,

  // trending hotel
  trendinghotel: TrendingHotel,
  "trendinghotel/category": TrendingCategory,

  // users
  users: Users,

  // hotel offer
  "hotel-offer": HotelOffer,

  // blogs
  blogs: Blogs,

  // hotel deals
  "hotel-deals": HotelDeals,

  // holiday center
  "holiday-center": HolidayCenter,

  // // holiday enquiry
  "holiday-enquiry": HolidayCenterEnquiry,

  // // nile cruise
  "nile-cruise": NileCruise,

  // // nile enquiry
  "nile-enquiry": NileCruiseEnquiry,

  // // webpages
  webpages: Webpages,

  // // booking success
  "booking-success": BookingSuccess,

  // // booking pending
  "booking-pending": BookingPending,

  // // faqs
  faqs: Faqs,

  // // terms condition
  "terms-condition": TermsCondition,

  // // customer reviews
  "customer-reviews": CustomerReviews,

  // // banner
  banner: Banner,

  // // hotels
  hotels: Hotels,

  // // about
  about: About,
};
