import { Outlet } from "react-router-dom";
import AuthBg from "../../assets/img/Cover.png";

function Authlayout() {
  return (
    <>
      <div className="grid md:grid-cols-5 grid-cols-1 h-screen overflow-hidden">
        <div className="auth-background hidden md:block col-span-2">
          <img src={AuthBg} alt="cover" className="h-full w-2.5xl object-contain"/>
        </div>
        <div className="col-span-3 flex justify-center items-center m-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Authlayout;
