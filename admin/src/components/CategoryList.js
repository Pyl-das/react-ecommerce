import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const CategoryList = () => {
  return (
    <div>
<Navbar />
  <div id="layoutSidenav">
    <Sidebar />
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Category List</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Category List</li>
          </ol>
          <div className="row">

          </div>
        </div>
      </main>
    <Footer />
    </div>
  </div>
</div>
  )
}

export default CategoryList