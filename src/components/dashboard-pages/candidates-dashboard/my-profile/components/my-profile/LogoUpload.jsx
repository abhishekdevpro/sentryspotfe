


import { useState } from "react";

const LogoUpload = () => {
    const [logImg, setLogoImg] = useState("");
    const logImgHander = (e) => {
        setLogoImg(e.target.files[0]);
    };
    return (
        <>
            <div className="uploading-outer flex-col text-start">
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*"
                        id="upload"
                        required
                        placeholder=""
                        onChange={logImgHander}
                    />
                    <label
                    
                        className="uploadButton-button "
                        htmlFor="upload"
                    >
                        {logImg !== "" ? logImg.name : "Add picture"}
                    </label><br/> 
                  
                    <span className="uploadButton-file-name"></span>
                </div>
                <div className="text">
                    Max size is 1MB, Min size: 330x300 
                    
                </div>
         
            </div>
        </>
    );
};

export default LogoUpload;
