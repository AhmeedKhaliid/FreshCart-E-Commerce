import { useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import ServerError from '../ServerError/ServerError'
import BrandsModal from '../BrandsModal/BrandsModal'
import { Helmet } from 'react-helmet'
export default function Brands() {
 const [modalBrand, setmodalBrand] = useState(null)
 const [showModal, setShowModal] = useState(false)
  const onClickHandler = (modalBrand) => {
    setmodalBrand(modalBrand)
    setShowModal(true)
  }
  const hideModal = ()=>{

    setShowModal(false)
  }


  function BrandsApi() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

  }
  let { data, isError, isLoading, } = useQuery({
    queryKey: ['Brands'],
    queryFn: BrandsApi
  })

  if (isLoading) {
    return <LoadingScreen />
  }
  if (isError) {
    return <ServerError/>
  }
  return <>
    <Helmet>
      <title>Brands</title>
    </Helmet>
    <div className="bg-[url('/src/assets/light-patten.svg')] bg-center flex-1 mt-16">
      <main className="container px-4 mx-auto overflow-hidden">
        <section className="px-2 py-12">
          <h2 className="mb-8 text-3xl font-medium text-gray-500">All Brands</h2>
          <div className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-16 grid grid-cols-1 gap-8">
          {data?.data.data.map((brands) =><div onClick={() => onClickHandler(brands)} key={brands._id} className="group rounded-xl p-4 cursor-pointer" style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 3px 3px 8px, rgba(255, 255, 255, 0.6) -12px -12px 8px' }}>
              <img src={brands.image} alt={brands.slug} />
              <h3 className="mt-8 text-xl font-medium text-[#0AAD0A]">{brands.name}</h3>
            </div>)}
          </div>
          {showModal && <BrandsModal {...modalBrand} hideModal={hideModal} showModal={showModal}/>}
        </section>
      </main>
    </div>
  </>

}
