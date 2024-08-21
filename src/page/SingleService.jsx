
import React, { useState } from 'react'
import { ServiceState } from '../context/serviceContext';
import { useParams,Link } from 'react-router-dom';
import PlaceOrderModal from '../components/common/modal/PlaceOrderModal'
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Button, Modal } from 'flowbite-react';
import UrlBreadcrumb from '../components/common/UrlBreadcrumb';


const SingleService = () => {

    const { servId } = useParams();
    const{services,setModal}= ServiceState();
    const singleservice= services && services.find((serv)=>serv.id==servId);
    let crumbWord=window.location.pathname; 

  return (
    singleservice && 
    <>
    <div className="container flex flex-col m-auto p-5 w-auto border border-gray-300 mt-5 ">
    <div className="service-cat-top">
    <UrlBreadcrumb crumbWord={crumbWord} servId={servId}/>
  </div>
  <div className="flex flex-col justify-between mt-5">
    <div className="flex gap-4">
    <div className="top-left-img w-32 h-32 bg-gray-300 flex items-center justify-center">
      <img src={singleservice.image} />
    </div>
    <div className="top-left-img">
      <h2 className="text-2xl font-semibold pb-3">{singleservice.name}</h2>
      <p className="text-base">{singleservice.description}</p>
      <div className="flex gap-3 items-center py-5">
        <span>Price:</span><button className="rounded-full bg-green-600 p-2 text-white font-semibold">£{singleservice.hourly_price}</button>
      </div>
    </div>
    </div>
    
  <div className="place-order text-end pr-5 pt-5 border-t-2 border-t-blue-200 ">
  <div className="rounded hover:rounded-lg flex justify-end">
    <Link href="/">
    <button data-modal-target="default-modald" data-modal-toggle="default-modal" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => setModal({placeOrderPopup:true})}>
  Place Order
</button>
    </Link>
</div>
  </div>
  </div>
</div>

<PlaceOrderModal/>





</>
  )
}

export default SingleService