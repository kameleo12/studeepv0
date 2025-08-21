// src/app/layout.tsx
import { Layout } from "@root/modules/app/react/Layout";
import { AppWrapper } from "@root/modules/app/react/AppWrapper";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Next Clean archi & TDD starter",
  description: "Next Clean archi & TDD starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          <Layout>{children}</Layout>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </AppWrapper>
      </body>
    </html>
  );
}
