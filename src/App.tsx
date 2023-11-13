import { MainLayout } from "./components/ui/MainLayout";
import BasicTabs from "./components/ui/Tabs";

export const App = () => {
  console.log("hol");
  return (
    <MainLayout>
      <BasicTabs />
    </MainLayout>
  );
};
