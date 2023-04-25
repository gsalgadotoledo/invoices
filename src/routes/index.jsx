import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import InvoiceList from '@/containers/InvoiceList/InvoiceList';
import InvoiceForm from '@/containers/InvoiceForm/InvoiceForm';
import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <InvoiceList />,
  },
  {
    path: "/create-invoice",
    element: <InvoiceForm />,
  },
  {
    path: "/update-invoice/:id",
    element: <InvoiceForm />,
  },
  {
    path: "",
    element: <NotFoundPage />,
  },
]);

const AppRoutes = () => (
  <section className="container">
  <RouterProvider router={router} />
  </section>
);

export default AppRoutes;
