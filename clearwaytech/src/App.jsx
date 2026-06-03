import { MainLayout } from "./layouts/MainLayout/MainLayout";
import Manutenzione from "./pages/manutenzione/manutenzione";

function App() {
  return (
    <MainLayout>
      <div className="section-container">
        <h1>Contenuto Dashboard</h1>
        <Manutenzione />
      </div>
    </MainLayout>
  );
}

export default App;
