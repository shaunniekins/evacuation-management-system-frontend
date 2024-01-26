// import
import Dashboard from "views/Dashboard/Dashboard";
import Inventory from "views/Dashboard/Inventory";
import TypeOfCalamity from "views/Dashboard/TypeOfCalamity";
import MunicipalityInformation from "views/Dashboard/MunicipalityInformation";
import BarangayInformation from "views/Dashboard/BarangayInformation";
import EvacuationCenter from "views/Dashboard/EvacuationCenter";
import ResidentInformation from "views/Dashboard/ResidentInformation";
import LGUSettings from "views/Dashboard/LGUSettings";
import Users from "views/Dashboard/Users";
import ReportsByBarangay from "views/Dashboard/ReportsByBarangay";

import SignIn from "views/Auth/SignIn.js";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  HelpIcon,
  HomeIcon,
  PersonIcon,
  RocketIcon,
  SettingsIcon,
  SupportIcon,
  StatsIcon,
} from "components/Icons/Icons";

// let { userPosition } = useContext(AuthContext);

const RouteComponent = () => {
  let { userPosition } = useContext(AuthContext);

  var dashRoutes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <HomeIcon color="inherit" />,
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/inventory",
      name: "Inventory",
      icon: <CartIcon color="inherit" />,
      component: Inventory,
      layout: "/admin",
    },
    {
      path: "/calamity",
      name: "Type of Calamity",
      icon: <GlobeIcon color="inherit" />,
      component: TypeOfCalamity,
      layout: "/admin",
    },
    {
      path: "/municipality-information",
      name: "Municipality Information",
      icon: <SupportIcon color="inherit" />,
      component: MunicipalityInformation,
      layout: "/admin",
    },
    {
      path: "/barangay-information",
      name: "Barangay Information",
      icon: <DocumentIcon color="inherit" />,
      component: BarangayInformation,
      layout: "/admin",
    },
    {
      path: "/evacuation-center",
      name: "Evacuation Center",
      icon: <HelpIcon color="inherit" />,
      component: EvacuationCenter,
      layout: "/admin",
    },
    {
      path: "/resident-information",
      name: "Resident Information",
      icon: <RocketIcon color="inherit" />,
      component: ResidentInformation,
      layout: "/admin",
    },
    {
      path: "/lgu-settings",
      name: "Relief Settings",
      icon: <SettingsIcon color="inherit" />,
      component: LGUSettings,
      layout: "/admin",
    },
    {
      path: "/users",
      name: "Users",
      icon: <PersonIcon color="inherit" />,
      component: Users,
      layout: "/admin",
    },
    {
      path: "/reports",
      name: "Reports by Barangay",
      icon: <StatsIcon color="inherit" />,
      component: ReportsByBarangay,
      layout: "/admin",
    },
    {
      path: "/signin",
      name: "Sign In",
      icon: <DocumentIcon color="inherit" />,
      component: SignIn,
      layout: "/auth",
    },
  ];

  if (userPosition === "Personnel") {
    // Hide "Municipality Information" item from the menu
    dashRoutes = dashRoutes.filter(
      (route) =>
        route.name !== "Municipality Information" && route.name !== "Users"
    );
  }

  return dashRoutes;
};

export default RouteComponent;
