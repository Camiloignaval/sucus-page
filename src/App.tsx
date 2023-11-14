import { MainLayout } from "./components/ui/MainLayout";
import BasicTabs from "./components/ui/Tabs";

export const MainApp = () => {
  console.log("hol");
  return (
    // <Typography sx={{ color: "red" }}>hola</Typography>
    <MainLayout>
      <BasicTabs />
    </MainLayout>
  );
};
