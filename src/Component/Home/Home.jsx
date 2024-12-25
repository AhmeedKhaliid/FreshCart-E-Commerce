import  { useContext } from 'react'
import image1 from '../../assets/grocery-banner-fECAEdf_.png'
import image2 from '../../assets/grocery-banner-2-BWrZqEBM.jpeg'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import PopularProducts from '../PopularProducts/PopularProducts'
import HomeSlider from '../HomeSlider/HomeSlider'
import { Helmet } from 'react-helmet'


export default function Home() {

    return <>
    <Helmet>
      <title>Home</title>
    </Helmet>
<div className="bg-center flex-1 mt-16">
  <main className="container px-4 mx-auto overflow-hidden">
    <section className="px-2 py-12">
      <div className="grid grid-cols-12">
        <div className="lg:col-span-9 md:col-span-7 col-span-6">
            <HomeSlider/>
        </div>
        <div className="lg:col-span-3 md:col-span-5 col-span-6 z-10">
          <img className="xl:h-[225px] lg:h-[175px] md:h-[140px] h-[75px]" src={image1} alt="banner_1" />
          <img className="xl:h-[225px] lg:h-[175px] md:h-[140px] h-[75px]" src={image2} alt="banner_2" />
        </div>
      </div>
    </section>
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">Featured Categories</h2>
      <CategoriesSlider />
    </section>
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">Popular Products</h2>
     <PopularProducts/>
    </section>
  </main>
</div>

    </>
}