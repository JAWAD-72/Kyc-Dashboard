import Sidebar from "@/components/Sidebar";
import AppThemeProvider from "@/components/ThemeProvider";
import Topbar from "@/components/Topbar";
import "./globals.css";

export const metadata = {
  title: "KYC Dashboard",
  description: "Next.js KYC Dashboard Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Topbar />
              <main className="p-4 flex-1">{children}</main>
            </div>
          </div>
        </AppThemeProvider>
      </body>
    </html>
  );
}
