import { NavLink, Outlet } from "react-router-dom";

function Layout() {
    return ( 
        <div className="flex flex-row">
            <aside className="bg-[#f8f5f2] border-[#e5ded8] border-3 p-4 w-64 min-h-screen flex flex-col ">
                <div className="flex flex-col items-center mt-50 gap-10 ">
                    <NavLink to="home" className="bg-[#ffffff] w-[80%] rounded-md border-[#e5ded8] border-2 h-10 flex items-center justify-center">
                        Home
                    </NavLink>

                    <NavLink to="transactions" className="bg-[#ffffff] w-[80%] rounded-md border-[#e5ded8] border-2 h-10 flex items-center justify-center">
                        Transactions
                    </NavLink>
                </div>

            </aside>

            <main className="flex-1">
                <Outlet></Outlet>
            </main>



        </div>
     );
}

export default Layout;