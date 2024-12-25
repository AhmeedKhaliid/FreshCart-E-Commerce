import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Modal from '../Modal/Modal'
import ServerError from '../ServerError/ServerError'
import { Helmet } from 'react-helmet'

export default function Categories() {
  const [modalCategory, setmodalCategory] = useState(null)
 const [showModal, setShowModal] = useState(false)
  const onClickHandler = (modalCategory) => {
    setmodalCategory(modalCategory)
    setShowModal(true)
  }
  const hideModal = ()=>{

    setShowModal(false)
  }
  function categoriesApi() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }
  let { data, isError, isLoading } = useQuery({
    queryKey: ['Categories'],
    queryFn: categoriesApi
  })

  if (isLoading) {
    return <LoadingScreen />
  }
  if (isError) {
    return <ServerError/>
  }
 

  return <>
      <Helmet>
      <title>Categories</title>
    </Helmet>
    <div className=" bg-center flex-1 mt-16">
      <main className="container px-4 mx-auto overflow-hidden">
        <section className="px-2 py-12">
          <h2 className="mb-8 text-3xl font-medium text-gray-500">Featured Categories</h2>
          <div className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-16 cursor-pointer">
            {data?.data.data.map((category) =>
              <div onClick={() => onClickHandler(category)} key={category._id} className="group rounded-xl pb-8" style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 3px 3px 8px, rgba(255, 255, 255, 0.6) -12px -12px 8px' }}>
                <img className="mx-auto h-[300px] w-full object-cover rounded-md" src={category.image} alt={category.name} />
                <p className="group-hover:text-[#0AAD0A] mt-8 text-xl font-semibold text-center text-gray-500 transition-all duration-300">{category.name}</p></div>)}
          </div>
          {showModal && <Modal {...modalCategory} hideModal={hideModal} showModal={showModal}/>}
        </section>
      </main>
    </div>

  </>
}
