import React from "react";
import { Card, Tabs } from 'flowbite-react';
import ServiceCatRight from "./ServiceCatRight";
import { ServiceState } from "../../context/serviceContext";
import { Link } from "react-router-dom"
const ServiceCatLeft = () => {
  const{services , category}= ServiceState();
  let catArr=Object.values(category);
  // console.log(services);

  return (
    <>
    {/* <Tabs aria-label="Default tabs" style="default" id="services-buttons" className=""> */}
      {/* <Tabs.Item active title="All Service Item" catId="All" key="All-Services">
        <ServiceCatRight catId="All" catName="All"/>
      </Tabs.Item> */}
      {services.length > 0 && services.map((serv,idx)=>(
        // <Tabs.Item title={cat} key={cat}  >
        <ServiceCatRight servId={idx+1} serv={serv} key={idx} />
        // {/* </Tabs.Item> */}
      ))}
    {/* <div className="service-cat-right  mt-5 max-w-sm custom-hours rounded-xl">
     <Card className='max-w-sm py-5 px-8 bg-dark-bg text-white border-none' >
      <form >
        <div className="flex items-end mb-4 p-2">
      <h5 className="text-2xl font-bold text-bold inline  text-rvs-bg  dark:text-rvs-bg">Custom Hours</h5>       </div>
        <p className="px-2">Lorem ipsum dolor sit amet consectetur.</p>
      <div className="flex flex-col gap-3 items-baseline  dark:text-white mt-5">
        <div className="flex items-end">
        <h3 className="text-4xl font-bold tracking-tight">£ 8 </h3>
        <span className="ml-1 text-xl font-normal">Per Hour</span>
        </div>
        <Link to="/ad-hoc-hours/custom-hours" className="w-full">
        <button
        type="submit" 
        className="inline-flex w-full justify-center rounded-lg px-5 py-3 text-center text-sm font-medium bg-rvs-bg text-white">
       Make a Request
      </button>
          </Link>
      </div>
      <ul className="my-7 space-y-5 text-white">

        <li className="flex space-x-3">
          <span className="text-base font-normal leading-tight">For more Ad-hoc hours and your qutoes please contact admin</span>
        </li>
      </ul>
</form>
    </Card>
    </div> */}
        {/* <Tabs.Item title="Magento Services" catId="3" >
         <ServiceCatRight catId="3"/>
      </Tabs.Item>
      <Tabs.Item title="Wordpress Services" catId="4" >
         <ServiceCatRight catId="4"/>
      </Tabs.Item>
      <Tabs.Item title="Software Development" catId="5" >
      <ServiceCatRight catId="5"/>
      </Tabs.Item> */}
    {/* // </Tabs> */}
    </>
  );
};

export default ServiceCatLeft;
