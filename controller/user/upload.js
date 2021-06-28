const upload = async (req,res) => {
    const image = req.file;
    console.log(req.file);

    if(image === undefined) {
        return res.status(400).send('xxx') 
    }
    res.status(200).send({
        data: image,
        
    })
}

export default upload;