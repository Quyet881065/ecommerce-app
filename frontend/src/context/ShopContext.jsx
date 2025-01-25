import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = props => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async(itemId, size) => {
        if(!size){
            toast.error('Select product size');
            return 
        }
        //hàm addToCart, một hàm asynchronous (bất đồng bộ) nhận vào hai tham số itemId (ID của sản phẩm) và size (kích thước của sản phẩm)
        let cartData = structuredClone(cartItems);
        //tạo một bản sao sâu (deep clone) của đối tượng cartItems hiện tại bằng cách sử dụng hàm structuredClone.
        //  Điều này giúp đảm bảo rằng khi thao tác với cartData, không ảnh hưởng trực tiếp đến cartItems trong state.
        if(cartData[itemId]){
            //Kiểm tra xem trong giỏ hàng đã có sản phẩm với itemId này hay chưa. Nếu cartData[itemId] tồn tại, tức là sản phẩm đã có trong giỏ.
            if(cartData[itemId][size]){
                //Nếu sản phẩm đã tồn tại trong giỏ, dòng này tiếp tục kiểm tra xem kích thước size của sản phẩm đó đã được thêm vào hay chưa.
                //  Nếu tồn tại (cartData[itemId][size]), tức là sản phẩm với kích thước đó đã có trong giỏ hàng.
                cartData[itemId][size] += 1;
                //Nếu sản phẩm và kích thước đó đã tồn tại, dòng này sẽ tăng số lượng của sản phẩm đó lên thêm 1 đơn vị.
            }else{
                cartData[itemId][size] = 1;
                //Nếu sản phẩm với kích thước size chưa tồn tại trong giỏ hàng, thì phần mã tiếp theo sẽ được thực thi.
                //Đặt số lượng của sản phẩm với kích thước size thành 1 (vì đây là lần đầu tiên sản phẩm này được thêm vào giỏ với kích thước đó).
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] =1;
            //Nếu cartData[itemId] chưa tồn tại (tức là sản phẩm này chưa có trong giỏ), đoạn mã sau sẽ được thực thi.
            //Tạo một đối tượng rỗng cho sản phẩm với itemId trong cartData. Điều này chuẩn bị để thêm các kích thước của sản phẩm vào giỏ.
            //Đặt số lượng sản phẩm với kích thước size thành 1, vì đây là lần đầu tiên sản phẩm và kích thước này được thêm vào giỏ.
        }
        setCartItems(cartData);
        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId, size},
                    {
                        headers: {token}
                    }
                )
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for (const items in cartItems){
            //duyệt qua tất cả các key của đối tượng cartItems. Mỗi key (tên là items) đại diện cho itemId của từng sản phẩm trong giỏ hàng.
            for(const item in cartItems[items]){
                //Bên trong vòng lặp đầu tiên, dòng này bắt đầu một vòng lặp thứ hai, duyệt qua tất cả các kích thước (size) của sản phẩm tương ứng với itemId.
                //  Tức là với mỗi sản phẩm (items), nó sẽ lặp qua tất cả các kích thước mà sản phẩm đó có trong giỏ hàng.
                try {
                    if(cartItems[items][item] > 0){
                        //Kiểm tra xem số lượng của sản phẩm với kích thước item có lớn hơn 0 không. cartItems[items][item] sẽ lấy số lượng của sản phẩm với kích thước đó. 
                        // Nếu số lượng lớn hơn 0, thì sản phẩm này được tính vào tổng số lượng.
                        totalCount += cartItems[items][item]
                        //Nếu điều kiện ở trên là đúng, dòng này cộng số lượng của sản phẩm với kích thước đó vào biến totalCount. Đây là bước cộng dồn số lượng sản phẩm trong giỏ hàng.
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async(itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity},
                    {headers:{token}}
                )
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            //Bắt đầu một vòng lặp for...in để duyệt qua tất cả các key của đối tượng cartItems.
            //  Mỗi key (items) là itemId, đại diện cho một sản phẩm trong giỏ hàng.
            let itemInfo = products.find(product => product._id === items);
            //Dòng này tìm kiếm thông tin về sản phẩm trong mảng products dựa trên itemId.
            //  Nó sử dụng phương thức .find() để tìm sản phẩm có _id khớp với items.
            for(const item in cartItems[items]){
                //Bắt đầu một vòng lặp thứ hai để duyệt qua tất cả các kích thước (size) của sản phẩm items trong giỏ hàng.
                //  Mỗi key (item) ở đây là một kích thước của sản phẩm.
                try {
                    if(cartItems[items][item] > 0){
                        //Kiểm tra xem số lượng của sản phẩm với kích thước item có lớn hơn 0 hay không. 
                        // Nếu có, nghĩa là sản phẩm này đã được thêm vào giỏ hàng với số lượng dương.
                        totalCount += itemInfo.price * cartItems[items][item];
                        //Nếu số lượng sản phẩm lớn hơn 0, dòng này sẽ tính tổng tiền cho sản phẩm với kích thước item 
                        // bằng cách nhân giá của sản phẩm (itemInfo.price) với số lượng của nó (cartItems[items][item]) rồi cộng giá trị này vào totalCount
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount
    }

    const getProductsData =  async() => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products);
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async(token)=>{
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, 
                {
                    headers:{token}
                }
            )
        if(response.data.success){
            setCartItems(response.data.cartData)
        }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        getProductsData()
    },[])
    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    },[])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl, setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider