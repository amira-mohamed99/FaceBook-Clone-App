import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";

function Mainlayout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-col justify-start space-y-5">
            <Outlet/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mainlayout;
