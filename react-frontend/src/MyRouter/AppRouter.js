import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";


import SingleCustomersPage from "../components/app_components/CustomersPage/SingleCustomersPage";
import CustomerProjectLayoutPage from "../components/app_components/CustomersPage/CustomerProjectLayoutPage";
import SingleVehiclesPage from "../components/app_components/VehiclesPage/SingleVehiclesPage";
import VehicleProjectLayoutPage from "../components/app_components/VehiclesPage/VehicleProjectLayoutPage";
import SingleLoyaltyprogramsPage from "../components/app_components/LoyaltyprogramsPage/SingleLoyaltyprogramsPage";
import LoyaltyprogramProjectLayoutPage from "../components/app_components/LoyaltyprogramsPage/LoyaltyprogramProjectLayoutPage";
import SingleInvoicesPage from "../components/app_components/InvoicesPage/SingleInvoicesPage";
import InvoiceProjectLayoutPage from "../components/app_components/InvoicesPage/InvoiceProjectLayoutPage";
import SingleServicesPage from "../components/app_components/ServicesPage/SingleServicesPage";
import ServiceProjectLayoutPage from "../components/app_components/ServicesPage/ServiceProjectLayoutPage";
import SingleServicerecordsPage from "../components/app_components/ServicerecordsPage/SingleServicerecordsPage";
import ServicerecordProjectLayoutPage from "../components/app_components/ServicerecordsPage/ServicerecordProjectLayoutPage";
import SingleMaintenanceschedulesPage from "../components/app_components/MaintenanceschedulesPage/SingleMaintenanceschedulesPage";
import MaintenancescheduleProjectLayoutPage from "../components/app_components/MaintenanceschedulesPage/MaintenancescheduleProjectLayoutPage";
import SingleOilchangerecordsPage from "../components/app_components/OilchangerecordsPage/SingleOilchangerecordsPage";
import OilchangerecordProjectLayoutPage from "../components/app_components/OilchangerecordsPage/OilchangerecordProjectLayoutPage";
import SingleTechniciansPage from "../components/app_components/TechniciansPage/SingleTechniciansPage";
import TechnicianProjectLayoutPage from "../components/app_components/TechniciansPage/TechnicianProjectLayoutPage";
import SinglePartsinventoryPage from "../components/app_components/PartsinventoryPage/SinglePartsinventoryPage";
import PartsinventoryProjectLayoutPage from "../components/app_components/PartsinventoryPage/PartsinventoryProjectLayoutPage";
import SingleSuppliersPage from "../components/app_components/SuppliersPage/SingleSuppliersPage";
import SupplierProjectLayoutPage from "../components/app_components/SuppliersPage/SupplierProjectLayoutPage";
import SinglePaymentmethodsPage from "../components/app_components/PaymentmethodsPage/SinglePaymentmethodsPage";
import PaymentmethodProjectLayoutPage from "../components/app_components/PaymentmethodsPage/PaymentmethodProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
  return (
    <Routes>
      {/* ~cb-add-unprotected-route~ */}
      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        
<Route path="/customers/:singleCustomersId" exact element={<SingleCustomersPage />} />
<Route path="/customers" exact element={<CustomerProjectLayoutPage />} />
<Route path="/vehicles/:singleVehiclesId" exact element={<SingleVehiclesPage />} />
<Route path="/vehicles" exact element={<VehicleProjectLayoutPage />} />
<Route path="/loyaltyprograms/:singleLoyaltyprogramsId" exact element={<SingleLoyaltyprogramsPage />} />
<Route path="/loyaltyprograms" exact element={<LoyaltyprogramProjectLayoutPage />} />
<Route path="/invoices/:singleInvoicesId" exact element={<SingleInvoicesPage />} />
<Route path="/invoices" exact element={<InvoiceProjectLayoutPage />} />
<Route path="/services/:singleServicesId" exact element={<SingleServicesPage />} />
<Route path="/services" exact element={<ServiceProjectLayoutPage />} />
<Route path="/servicerecords/:singleServicerecordsId" exact element={<SingleServicerecordsPage />} />
<Route path="/servicerecords" exact element={<ServicerecordProjectLayoutPage />} />
<Route path="/maintenanceschedules/:singleMaintenanceschedulesId" exact element={<SingleMaintenanceschedulesPage />} />
<Route path="/maintenanceschedules" exact element={<MaintenancescheduleProjectLayoutPage />} />
<Route path="/oilchangerecords/:singleOilchangerecordsId" exact element={<SingleOilchangerecordsPage />} />
<Route path="/oilchangerecords" exact element={<OilchangerecordProjectLayoutPage />} />
<Route path="/technicians/:singleTechniciansId" exact element={<SingleTechniciansPage />} />
<Route path="/technicians" exact element={<TechnicianProjectLayoutPage />} />
<Route path="/partsinventory/:singlePartsinventoryId" exact element={<SinglePartsinventoryPage />} />
<Route path="/partsinventory" exact element={<PartsinventoryProjectLayoutPage />} />
<Route path="/suppliers/:singleSuppliersId" exact element={<SingleSuppliersPage />} />
<Route path="/suppliers" exact element={<SupplierProjectLayoutPage />} />
<Route path="/paymentmethods/:singlePaymentmethodsId" exact element={<SinglePaymentmethodsPage />} />
<Route path="/paymentmethods" exact element={<PaymentmethodProjectLayoutPage />} />
        {/* ~cb-add-protected-route~ */}
      </Route>
    </Routes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  hasServicePermission: (service) =>
    dispatch.perms.hasServicePermission(service),
  hasServiceFieldsPermission: (service) =>
    dispatch.perms.hasServiceFieldsPermission(service),
});

export default connect(mapState, mapDispatch)(AppRouter);
