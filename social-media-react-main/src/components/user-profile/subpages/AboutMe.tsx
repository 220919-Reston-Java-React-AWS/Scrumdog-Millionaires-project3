import React, { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../context/user.context";
import { apiGetAboutMe } from "../../../remote/social-media-api/profileFeed.api";
import Navbar from "../../navbar/Navbar";




export default function AboutMe(){

    const { user, setUser } = useContext(UserContext);
    const [aboutMe, setAboutMe] = React.useState("");
    const {state} = useLocation();

    const fetchData = async () => {
        let currentuserid = user?.id!;
        const result = await apiGetAboutMe(currentuserid)
        setAboutMe(result.payload);
    }

    useEffect(() => {
        fetchData();
       });

    return(

        <> 

            <Navbar />
            
            
            <div>This is the about me page! </div>

            <div> {aboutMe} </div>
                             
             
        </>
    )


}