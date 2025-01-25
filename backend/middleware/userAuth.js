import jwt from 'jsonwebtoken'
//jsonwebtoken, được sử dụng để mã hóa (sign) và giải mã (verify) JWT.
const userAuth = async(req, res, next) =>{
     const {token} = req.headers;
     //middleware kiểm tra xem trong phần headers của request có chứa token hay không
     if(!token){
        return res.json({success:false, message:'Not authorized login again'})
        //Nếu không có token, trả về phản hồi với thông điệp "Not authorized login again
     }

     try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        //jwt.verify() được sử dụng để kiểm tra tính hợp lệ của token.
        // Nó giải mã token bằng cách sử dụng process.env.JWT_SECRET (một biến môi trường chứa khóa bí mật dùng để mã hóa token).
        req.body.userId = token_decode.id
        //Sau khi token được xác thực, thông tin người dùng được giải mã từ token (chẳng hạn id) sẽ được gán vào thuộc tính userId của req.body
        next()
        //Nếu quá trình xác thực thành công, hàm next() được gọi để tiếp tục tới middleware hoặc hàm xử lý yêu cầu tiếp theo.
     } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
     }
}

//Tóm tắt: Middleware userAuth kiểm tra token từ header của request, giải mã token để lấy thông tin người dùng, và xác thực tính hợp lệ của token. 
// Nếu token hợp lệ, middleware cho phép tiếp tục xử lý yêu cầu, nếu không thì trả về thông báo lỗi.

export default userAuth