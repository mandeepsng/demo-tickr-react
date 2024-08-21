import { Breadcrumb } from 'flowbite-react'
import React from 'react'
import { HiHome } from "react-icons/hi";
import { ServiceState } from '../../context/serviceContext';
import { Link } from 'react-router-dom';

const UrlBreadcrumb = ({crumbWord,servId}) => {
  const pathSegments = crumbWord.split('/');
  pathSegments.shift();
  let character = "/";
  let joinedString = pathSegments.map(item => character + item);

  console.log(joinedString);
  return (
    <Breadcrumb
    aria-label="Solid background breadcrumb example"
    className="bg-gray-50 px-5 py-2 dark:bg-gray-800 border mx-5 lg:mx-0"
    id="url-breadcrumb"
  >
<Breadcrumb.Item key="Home" icon={HiHome}><Link to="/"> Home </Link>
</Breadcrumb.Item>
    {
      joinedString.map((i, index)=>(
         <Breadcrumb.Item key={i}><Link to={i}>{pathSegments[index]}</Link></Breadcrumb.Item>    
      ))  
    }
  </Breadcrumb>
  )
}

export default UrlBreadcrumb