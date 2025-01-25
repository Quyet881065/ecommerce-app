import userModel from "../models/userModel.js"

// add products to user cart
const addToCart = async (req, res) => {
    //Hàm addToCart nhận yêu cầu từ phía client thông qua phương thức HTTP POST
    try {
        const { userId, itemId, size } = req.body
        //Nó sẽ lấy dữ liệu từ req.body, cụ thể là userId, itemId, và size
        const userData = await userModel.findById(userId);
        //Dựa vào userId được truyền trong yêu cầu, hàm sử dụng userModel.findById(userId) để tìm dữ liệu người dùng tương ứng trong cơ sở dữ liệu
        let cartData = await userData.cartData;
        //Dữ liệu giỏ hàng của người dùng được lưu trong thuộc tính cartData của đối tượng người dùng (userData.cartData).
        if (cartData[itemId]) {
            //Kiểm tra xem sản phẩm với itemId đã có trong giỏ hàng hay chưa.
            if (cartData[itemId][size]) {
                //Nếu có rồi, tiếp tục kiểm tra xem kích cỡ size của sản phẩm đó có sẵn trong giỏ hàng hay chưa.
                cartData[itemId][size] += 1;
                //Nếu đã có kích cỡ đó trong giỏ, tăng số lượng sản phẩm của kích cỡ đó lên 1
            } else {
                cartData[itemId][size] = 1
                //Nếu chưa có kích cỡ đó trong giỏ hàng, thêm kích cỡ mới và đặt số lượng là 1
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            //Trường hợp sản phẩm chưa có trong giỏ hàng:
            //Nếu itemId không tồn tại trong giỏ hàng, tạo một mục mới trong cartData cho sản phẩm đó, và thêm kích cỡ cùng số lượng là 1:
        }
        await userModel.findByIdAndUpdate(userId, { cartData })
        //Sau khi thay đổi dữ liệu giỏ hàng, hàm sử dụng userModel.findByIdAndUpdate(userId, {cartData}) để cập nhật giỏ hàng của người dùng trong cơ sở dữ liệu MongoDB.
        res.json({ success: true, message: 'Added to cart' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity;
        await userModel.findByIdAndUpdate(userId, { cartData });
        res, json({ success: true, message: 'cart updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart }