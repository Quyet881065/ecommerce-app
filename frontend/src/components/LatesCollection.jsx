
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatesCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    //    products.slice(0, 10) sẽ tạo ra một mảng mới chứa tối đa 10 phần tử đầu tiên của mảng products.
    //     Nếu mảng products có ít hơn 10 phần tử, nó sẽ lấy tất cả các phần tử có sẵn.
  }, [products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem is simply,Lorem is simply,Lorem is simplyLorem is simplyLorem is simply
        </p>
      </div>
      {/* rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
        {/* grid-cols-2: Thiết lập số cột trong lưới là 2 trên các màn hình nhỏ nhất (mobile). 
           sm:grid-cols-3:
            sm: là một breakpoint (điểm dừng) trong Tailwind, có nghĩa là lớp này sẽ được áp dụng cho các màn hình 
            có kích thước tối thiểu là 640px (small screens).
            Khi kích thước màn hình đạt từ 640px trở lên, lưới sẽ có 3 cột.
            md:grid-cols-4:
            md: áp dụng cho các màn hình có kích thước tối thiểu là 768px (medium screens).
            Trên màn hình có kích thước tối thiểu là 768px, lưới sẽ có 4 cột.
            lg:grid-cols-5:
            lg: áp dụng cho các màn hình có kích thước tối thiểu là 1024px (large screens).
            Khi kích thước màn hình đạt từ 1024px trở lên, lưới sẽ có 5 cột.
            gap-5: Đây là khoảng cách (gap) giữa các phần tử trong lưới theo cả chiều ngang và chiều dọc là 5 đơn vị 
            của Tailwind (tương đương với 1.25rem).
            gap-y-6: Đây là khoảng cách giữa các hàng theo chiều dọc (vertical gap) là 6 đơn vị của Tailwind (tương đương với 1.5rem).
        */}
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatesCollection