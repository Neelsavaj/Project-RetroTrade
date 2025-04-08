import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AdminNavabar } from "./AdminNavbar";
import "../../assets/adminlte.css"
import "../../assets/adminlte.min.css"
// import logo from "../../assets/landing/images/logo.png"
export const AdminSidebar = () => {
  //for closing sidebar...
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AdminNavabar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar bg-body-secondary shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <a href="./index.html" className="brand-link">
            {/* <img src="../../assets/landing/images/logo.png"
              // alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"
            /> */}
            <span className="brand-text fw-light">RetroTrade</span>
          </a>
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link to="addcategory" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    ADD CATEGORY
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="subcategory" className="nav-link active">
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        SUB-CATEGORY
                        <i className="nav-arrow bi bi-chevron-right" />
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="addproduct" className="nav-link active">
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        ADD-PRODUCT
                        <i className="nav-arrow bi bi-chevron-right" />
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="getallproducts" className="nav-link active">
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        VIEW MY PRODUCTS
                        <i className="nav-arrow bi bi-chevron-right" />
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="myproducts" className="nav-link active">
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        VIEW MY PRODUCTS by id
                        <i className="nav-arrow bi bi-chevron-right" />
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
              
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Widgets
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./widgets/small-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Small Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/info-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>info Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/cards.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Cards</p>
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
      <main class="app-main">
        <Outlet></Outlet>
      </main>
    </>
  );
};