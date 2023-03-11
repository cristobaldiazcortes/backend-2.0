const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.NAME,
    api_key: process.env.KEY,
    api_secret: process.env.SECRET
})

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: 'auto'
}

const nuevaImagen = image => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (err, result) => {
        if(result && result.secure_url) return resolve(result.secure_url)
         return reject(err.message)   
        })
    })
}

module.exports = nuevaImagen
