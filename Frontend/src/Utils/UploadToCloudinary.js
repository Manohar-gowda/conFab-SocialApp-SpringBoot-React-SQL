 export const uploadCloud = async (pics) => {
    console.log(pics);
    
    if(pics) {
        const data = new FormData();
        data.append("file", pics)
        data.append("upload_preset", "SocialApp")
        data.append("cloud", "diyhrs9vo")

        const res = await fetch("https://api.cloudinary.com/v1_1/diyhrs9vo/image/upload", {
            method:"post",
            body:data
        })

        const fileData = await res.json();
        return fileData.url.toString();
    }
    else {
        console.log("Error from upload function: ");
    }
}