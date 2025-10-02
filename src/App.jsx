import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/auth/login.jsx";
import Settings from "./pages/settings.jsx";
import DefaultLayout from "./layouts/defaultLayout";
import Dashboard from "./pages/admin/dashboard.jsx";
import SetNewPassword from "./pages/auth/setNewPassword.jsx";
import Pending from "./pages/admin/pending.jsx";
import ActionTaken from "./pages/admin/actionTaken.jsx";
import Reports from "./pages/admin/reports.jsx";
import CompletedTickets from "./pages/admin/completedTickets.jsx";
import SearchTickets from "./pages/admin/searchTickets.jsx";
import PendingReport from "./pages/admin/pendingReport.jsx";
import CompletionReport from "./pages/admin/completionReport.jsx";
import CZMPMapPendency from "./pages/environmentDepartment/czmpMapPendency.jsx";
import MCZMAPendency from "./pages/environmentDepartment/mczmaPendency.jsx";
import SEIAAPendency from "./pages/environmentDepartment/seaaPendency.jsx";
import SEACPendency from "./pages/environmentDepartment/seacPendency.jsx";
import MOEFCCPendency from "./pages/environmentDepartment/moefcPendency.jsx";
import HighCourtPendency from "./pages/environmentDepartment/highcourtPendency.jsx";
import ForestPendency from "./pages/environmentDepartment/forestPendency.jsx";
import ASIPendency from "./pages/environmentDepartment/asiPendency.jsx";
import CourtCasesPendencyTimeline from "./pages/generallegalframeworkDepartment/courtcasespendancyTimeline.jsx";
import CourtCaseStatus from "./pages/generallegalframeworkDepartment/courtcasestatus.jsx";
import FinalCourtOrders from "./pages/generallegalframeworkDepartment/finalcourtOrders.jsx";
import BargeAdvertisement from "./pages/advertisement&event/bargeadvertisement.jsx";
import AdvertisementRevenue from "./pages/advertisement&event/advertisementrevenue.jsx";
import EventRevenue from "./pages/advertisement&event/eventrevenue.jsx";
import LandInformation from "./pages/advertisement&event/landinformation.jsx";
import PWTRouteWiseDredging from "./pages/inlandvesselDepartment/pwtroutewisedredging.jsx";
import CoastSafetySecurityAdmin from "./pages/coastalsafety&security/coastalsafetysecurityadmin.jsx";
import InvestmentAdmin from "./pages/finance&account/investmentadmin.jsx";
import BudgetAdmin from "./pages/finance&account/budgetadmin.jsx";
import VesselRegistration1 from "./pages/passengerwatertransport/vesselregistration1.jsx";
import VesselRegistration2 from "./pages/passengerwatertransport/vesselregistration2.jsx";
import PassengerRoute from "./pages/passengerwatertransport/passengerroute.jsx";
import PassengerBoatType from "./pages/passengerwatertransport/passengerboattype.jsx";
import GeneralLegalFrameworkPublic from "./pages/generallegalframeworkDepartment/generallegalframeworkPublic/generallegalframeworkPublic.jsx";
import EnvironmentPublic from "./pages/environmentDepartment/environmentPublic/environmentpublic.jsx";
import InlandVesselPublic1 from "./pages/inlandvesselDepartment/inlandvesselPublic/inlandvesselpublic1.jsx";
import InlandVesselPublic2 from "./pages/inlandvesselDepartment/inlandvesselPublic/inlandvesselpublic2.jsx";
import CoastSafetySecurityPublic from "./pages/coastalsafety&security/coastalsafetysecuritypublic/coastsafetysecuritypublic.jsx";
import SummaryPublic from "./pages/administration&pannel/administration&pannelpublic/summarypublic.jsx";
import Class2 from "./pages/administration&pannel/administration&pannelpublic/class2.jsx";
import Class4 from "./pages/administration&pannel/administration&pannelpublic/class4.jsx";
import Class1 from "./pages/administration&pannel/administration&pannelpublic/class1.jsx";
import Class3 from "./pages/administration&pannel/administration&pannelpublic/class3.jsx";
import HydrographyPublic from "./pages/hydrography/hydrographypublic/hydrographypublic.jsx";
import PortPublic from "./pages/portshipyardsmarinasfloatels/portshipyardsmarinasfloatelspublic/portpublic.jsx";





const App = () => {
  const location = useLocation();
  const [role, setRole] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      return u?.role || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      setRole(u?.role || null);
    } catch {
      setRole(null);
    }
  }, [location.pathname]);

  const isUser = role === "user";

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/set-new-password/:token" element={<SetNewPassword />} />
      {isUser ? (
        <Route element={<DefaultLayout />}>
          <Route path="/grievances/pending" element={<Pending />} />
          <Route path="/grievances/action/:id" element={<ActionTaken />} />
          <Route path="/reports/completed" element={<CompletedTickets />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/grievances/pending" replace />} />
        </Route>
      ) : (
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/grievances/pending" element={<Pending />} />
          <Route path="/grievances/action/:id" element={<ActionTaken />} />
          <Route path="/search-tickets" element={<SearchTickets />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/completed" element={<CompletedTickets />} />
          <Route path="/reports/pending" element={<PendingReport />} />
          <Route path="/reports/completion" element={<CompletionReport />} />
          <Route path="/admin/environment/czmp-map-pendency" element={<CZMPMapPendency />} />
          <Route path="/admin/environment/mczma-pendency" element={<MCZMAPendency />} />
          <Route path="/admin/environment/seiaa-pendency" element={<SEIAAPendency />} />
          <Route path="/admin/environment/seac-pendency" element={<SEACPendency />} />
          <Route path="/admin/environment/moefc-pendency" element={<MOEFCCPendency />} />
          <Route path="/admin/environment/high-court-pendency" element={<HighCourtPendency />} />
          <Route path="/admin/environment/forest-pendency" element={<ForestPendency />} />
          <Route path="/admin/environment/asi-pendency" element={<ASIPendency />} />
          <Route path="/public/Environment/environment-public/" element={<EnvironmentPublic />} />
          <Route path="/admin/general-legal-framework/list-of-ongoing-court-cases" element={<CourtCasesPendencyTimeline />} />
          <Route path="/admin/general-legal-framework/list-of-ongoing-court-cases-status" element={<CourtCaseStatus />} />
          <Route path="/admin/general-legal-framework/compliance-status-of-directions-under-final-court-orders" element={<FinalCourtOrders />} />
          <Route path="/public/general-legal-framework/general-legal-framework-public/" element={<GeneralLegalFrameworkPublic />} />
          <Route path="/admin/advertisement-and-events/barge-advertisements" element={<BargeAdvertisement />} />
          <Route path="/admin/advertisement-and-events/advertisement-revenue" element={<AdvertisementRevenue />} />
          <Route path="/admin/advertisement-and-events/event-revenue" element={<EventRevenue />} />
          <Route path="/admin/advertisement-and-events/land-information" element={<LandInformation />} />
          <Route path="/public/inland-vessel-survey-and-registration/inland-vessel-public-1" element={<InlandVesselPublic1 />} />
          <Route path="/public/inland-vessel-survey-and-registration/inland-vessel-public-2" element={<InlandVesselPublic2 />} />
          <Route path="/admin/inland-vessel-survey-and-registration/pwtroute-wise-dredging" element={<PWTRouteWiseDredging />} />
          <Route path="/admin/coastal-safety-and-security/coastal-safety-security-admin" element={<CoastSafetySecurityAdmin />} />
          <Route path="/public/coastal-safety-and-security/coastal-safety-security-public" element={<CoastSafetySecurityPublic />} />
          <Route path="/public/administration-and-personnel/administration-personnel-public-summary" element={<SummaryPublic />} />
          <Route path="/public/administration-and-personnel/administration-personnel-public-class-II" element={<Class2 />} />
          <Route path="/public/administration-and-personnel/administration-personnel-public-class-IV" element={<Class4 />} />
          <Route path="/public/administration-and-personnel/administration-personnel-public-class-I" element={<Class1 />} />
          <Route path="/public/administration-and-personnel/administration-personnel-public-class-III" element={<Class3 />} />
          <Route path="/public/hydrography/hydrography-public/" element={<HydrographyPublic />} />
          <Route path="/admin/finance-and-account/investment-admin" element={<InvestmentAdmin />} />
          <Route path="/admin/finance-and-account/budget-admin" element={<BudgetAdmin />} />
          <Route path="/admin/passenger-water-transport/vessel-registration-2" element={<VesselRegistration2 />} />
          <Route path="/admin/passenger-water-transport/vessel-registration-1" element={<VesselRegistration1 />} />
          <Route path="/admin/passenger-water-transport/passenger-water-transport-route" element={<PassengerRoute />} />
          <Route path="/admin/passenger-water-transport/boat-type" element={<PassengerBoatType />} />
          <Route path="/public/port-shipyards-marinas-floatels/port-shipyards-marinas-floatels-public" element={<PortPublic />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
