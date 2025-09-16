import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , 'uploads/')
    },
    filename: (req , file , cb) => {
        cb(null , `${Date.now()}-${file.originalname}`)
    }
});

// File filter 
const fileFilter = (req , file , cb) => {
    const allowedTypes = ['image/jpeg' , 'image/png' , 'image/webp' , 'image/jpg' , 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null , true);
    } else {
        cb(null , "Invalid file type Try jpeg , png , webp , jpg or gif");
    }
};

const upload = multer({ storage , fileFilter });

export default upload;