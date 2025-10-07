import multer from "multer";
//import productRouter from '../routes/productRoute';

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

export default upload;