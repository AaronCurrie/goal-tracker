import Footer from "@/components/footer/footer";
import { GoalsViewProvider } from "@/lib/contexts/goals-view-context";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main>
      <GoalsViewProvider>
        {children}
      </GoalsViewProvider>
      <Footer />
    </main>
  );
}
