
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestDeller] = useState([]);
  useEffect(() => {
    const bestSeller = products.filter(item => item.bestseller);
    setBestDeller(bestSeller.slice(0, 5));
  }, [products])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          {/* w-3/4 thiết lập chiều rộng của đoạn văn bản là 75% chiều rộng của phần tử cha (3/4 của phần tử bao quanh). 
              m-auto là viết tắt của margin: auto, giúp canh giữa đoạn văn bản theo chiều ngang. Điều này đặc biệt hữu 
              ích khi bạn muốn đoạn văn bản có chiều rộng cố định và được căn giữa trên trang.
              text-xs thiết lập kích thước chữ là extra small (nhỏ nhất). Kích thước cụ thể là 0.75rem (12px).
              sm:text-sm:
              sm: là breakpoint dành cho màn hình nhỏ hơn (small), với độ rộng tối thiểu là 640px. Khi màn hình có kích 
              thước từ 640px trở lên, kích thước chữ sẽ chuyển thành small (khoảng 0.875rem hoặc 14px).
              md:text-base:
                md: là breakpoint cho màn hình trung bình (medium), với độ rộng tối thiểu là 768px. Khi màn hình có độ rộng từ 768px trở lên, 
                kích thước chữ sẽ trở thành base (khoảng 1rem hoặc 16px).
           */}
          Lorem is simply,  Lorem is simply, Lorem is simply, Lorem is simply
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller