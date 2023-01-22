import React, { useState, useEffect } from 'react';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';
import authHeader from "../services/auth-header";

const AddCategory = () => {
const API_URL = process.env.REACT_APP_API_URL+"api/category/";
    
  const [content, setContent] = useState("");
  const [name, setName] = React.useState("")

  const submitHandler = () => {
    axios.post(API_URL+"add", 
    {category_name: name} ,
    { headers: authHeader() }
    )
    .then((response) => {

    });
  }

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
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
            <form onSubmit={() => submitHandler()}> 
                <input type="text" placeholder='Category Name' id="inputcategory" name="category_name" className='form-control' onChange={(event) => setName(event.target.value)}/>
                <label htmlFor="inputcategory">Category Name</label>
                <input type="submit" />
            </form>
          </div>
        </div>
      </main>
    <Footer />
    </div>
  </div>
</div>
  )
}

export default AddCategory