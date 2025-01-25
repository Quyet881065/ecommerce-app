
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)
    return (
        <Link className='text-gray-700 cursor-pointer ' to={`/product/${id}`}>
            {/* <Link>: Đây là component từ thư viện react-router-dom, 
        được sử dụng để tạo liên kết giữa các trang mà không làm mới lại trang (client-side routing). 
        to={`/product/${id}`} Thuộc tính to xác định đường dẫn mà liên kết sẽ điều hướng tới.
         Nó sử dụng cú pháp template string trong JavaScript để chèn giá trị của biến id vào URL
        */}
            <div className='overflow-hidden'>
            {/* className='overflow-hidden': để ẩn bất kỳ phần tử con nào tràn ra ngoài kích thước của div.
             Điều này thường được sử dụng để tạo hiệu ứng cắt bớt hình ảnh hoặc văn bản. */}
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt='' />
                {/* hover:scale-110: Khi người dùng di chuột qua ảnh, nó sẽ phóng to lên 110%.
                transition ease-in-out: Thêm hiệu ứng chuyển động mượt mà cho quá trình phóng to thu nhỏ.
                src={image[0]}: Thuộc tính src dùng để chỉ định nguồn ảnh. image[0] là phần tử đầu tiên trong mảng image,
                 tức là đường dẫn tới hình ảnh đầu tiên.
                 alt='': Thuộc tính alt dùng để cung cấp mô tả văn bản cho ảnh, trong trường hợp này không có giá trị (rỗng).
                */}
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem