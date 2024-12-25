import React, { useEffect, useRef } from 'react'
export default function Modal({name,slug,hideModal,image,showModal}) {
  let modalRef = useRef();
  function checkClickOutside(e){
    if (showModal && modalRef.current && !modalRef.current.contains(e.target)) {
      hideModal();
    }
  };
  useEffect(() => {
    
      document.addEventListener('mousedown', checkClickOutside);

    return () => {document.removeEventListener('mousedown', checkClickOutside);};
  }, [showModal]);
  
  return <>
<div  className="bg-opacity-40 md:inset-0 fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen max-h-full overflow-hidden bg-black">
            <div className="relative w-full max-w-2xl max-h-full p-4">
              <div ref={modalRef} className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-3 border-b rounded-t">
                  <button onClick={hideModal} className="hover:bg-gray-200 hover:text-gray-900 ms-auto inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-12 p-4 space-y-4">
                  <div className="pl-2 mt-8">
                    <p className="sm:text-5xl text-3xl font-semibold text-[#0AAD0A]">{name}</p>
                    <h4 className="mt-3 text-lg font-medium text-gray-500">{slug}</h4>
                  </div>
                  <div>
                    <img className="mx-auto h-[300px] w-full object-cover rounded-md" src={image} alt={name} />
                  </div>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
                  <button onClick={hideModal} type="button" className="text-white bg-[#0AAD0A] hover:bg-[#088A08]  focus:ring-4 focus:outline-none focus:ring-[#6cce6c] font-medium rounded-lg text-sm px-5 py-2.5 text-center">close</button>
                </div>
              </div>
            </div>
          </div>
  </>
}
