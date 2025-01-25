import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] =useState('relavent')

  const toggleCategory = e => {
    if (category.includes(e.target.value)) {
      // category.includes(e.target.value): Kiểm tra xem giá trị được chọn 
      // (e.target.value) có tồn tại trong mảng category hay không.Nếu giá trị đã tồn tại trong mảng category, nghĩa là người dùng muốn bỏ chọn hạng mục đó.
      setCategory(prev => prev.filter(item => item !== e.target.value))
      //Đây là trường hợp khi giá trị đã tồn tại trong mảng category, và người dùng muốn loại bỏ nó.
      //prev đại diện cho trạng thái category hiện tại.
      //filter(item => item !== e.target.value): Tạo một mảng mới bằng cách lọc ra tất cả các mục (item) khác với giá trị hiện tại (e.target.value),
      //  tức là loại bỏ mục mà người dùng đang bỏ chọn.
    } else {
      //Nếu giá trị chưa tồn tại trong mảng category, điều này có nghĩa là người dùng đang chọn hạng mục đó.
      //[...prev, e.target.value]: Tạo một mảng mới bằng cách giữ nguyên các phần tử hiện có trong category (prev) và thêm vào giá trị mới (e.target.value).
      setCategory(prev => [...prev, e.target.value])
    }
    //Nếu danh mục đã có trong mảng, nó sẽ bị xóa.
    //Nếu danh mục chưa có, nó sẽ được thêm vào mảng.
  }

  const toggleSubCategory = e => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }
  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      //Điều kiện chỉ được thực hiện khi cả hai đều đúng:
      //showSearch là true (ô tìm kiếm đang hiển thị).
      //search không phải là chuỗi rỗng (người dùng đã nhập một từ khóa tìm kiếm).
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      // Phương thức filter() tạo ra một mảng mới chỉ chứa các phần tử thỏa mãn điều kiện trong hàm lọc
      //item.name.toLowerCase(): Lấy tên của sản phẩm (item.name) và chuyển nó về dạng chữ thường. 
      //.includes(search.toLowerCase()): Phương thức includes() kiểm tra xem chuỗi search (từ khóa tìm kiếm, đã chuyển về chữ thường) có tồn tại trong chuỗi tên sản phẩm hay không.
      
    }

    //products.slice(): Phương thức slice() tạo ra một bản sao (shallow copy) của mảng products.
    //  Điều này giúp bảo vệ mảng gốc không bị thay đổi trực tiếp, chỉ thao tác trên bản sao productsCopy.
    if (category.length > 0) {
      //Kiểm tra xem mảng category có chứa bất kỳ danh mục nào hay không. category.length > 0 nghĩa là có ít nhất một danh mục được chọn.
      // Nếu không có danh mục nào được chọn (category.length === 0), thì toàn bộ danh sách sản phẩm sẽ không được lọc.
      productsCopy = productsCopy.filter(item =>
      //  Phương thức filter() tạo ra một mảng mới chỉ chứa các phần tử (sản phẩm) đáp ứng điều kiện trong hàm lọc.
      {
        return category.includes(item.category)
        //category.includes(item.category): Điều kiện này kiểm tra xem danh mục của sản phẩm (item.category) có nằm trong mảng category hay không.
        //Nếu item.category có trong category, sản phẩm này sẽ được giữ lại trong mảng productsCopy.
        //Nếu không, sản phẩm sẽ bị loại bỏ khỏi mảng productsCopy.
      })
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = ()=>{
    const  fpCopy = filterProducts.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=> (a.price - b.price)));
        //Phương thức sort() trong JavaScript được sử dụng để sắp xếp các phần tử của một mảng tại chỗ, tức là mảng gốc sẽ bị thay đổi.
       // compareFunction(a, b) trả về:
       // Một giá trị âm nếu a nên đứng trước b.
       // 0 nếu a và b bằng nhau.
       // Một giá trị dương nếu a nên đứng sau b.
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=> (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])
  useEffect(()=>{
    sortProduct()
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img onClick={() => setShowFilter(!showFilter)} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          {/* div sẽ ẩn hoặc hiển thị dựa trên giá trị của biến showFilter. Nếu showFilter là false, div sẽ có class hidden, tức là bị ẩn đi.
        Trên màn hình nhỏ trở lên , bắt đầu từ 640px trở lên (sm), div này sẽ được hiển thị dưới dạng block, bất kể giá trị của showFilter ra sao. */}
          <p className='mb-3 text-sm font-medium '>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product sort */}
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {filterProducts.map((items, index) => (
            <ProductItem key={index} id={items._id} name={items.name} price={items.price} image={items.image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection