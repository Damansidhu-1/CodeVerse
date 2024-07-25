import { Link } from "react-router-dom";
import {FooterLink2} from "../../data/footer-links";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";


const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
    return (
        <div className="bg-richblack-800">

            {/* ** UpperPortion of Footer ** */}
            <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">

                <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700" >
                    {/* **Left Portion ** */}
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">

                        
                        {/* 1 */}
                        <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                            
                            <p className="text-richblack-400 font-semibold text-3xl select-none">CodeVerse</p>

                            <p className="text-richblack-50 font-semibold text-[16px]">Company</p>
                            
                            <div className="flex flex-col">
                                {
                                    ["About", "Careers", "Affiliates"].map( (element , index ) => {
                                        return (
                                            <div 
                                            key={index}
                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            
                            {/* yet to be linked with socail media */}
                            <div className="flex gap-3 text-lg">
                                <FaFacebook />
                                <FaGoogle />
                                <FaTwitter />
                                <FaYoutube />
                            </div>
                        </div>

                        {/* 2 */}
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">

                            <p className="text-richblack-50 font-semibold text-[16px]">Resources</p>

                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    Resources.map( (element ,index) => {
                                        return (
                                            <div
                                            key={index}
                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            >
                                                <Link to={element.split(" ").join("-").toLowerCase()}>
                                                {element}
                                                </Link>
                                            </div>
                                        );
                                    } )
                                }

                            </div>

                            <p className="text-richblack-50 font-semibold text-[16px] mt-7">Support</p>

                            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                                <Link to={"/help-center"}>Help Center</Link>
                            </div>

                        </div>

                        {/* 3 */}
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">

                            <p className="text-richblack-50 font-semibold text-[16px]">Plans</p>
                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    Plans.map( (element ,index) => {
                                        return (
                                            <div
                                            key={index}
                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            >
                                                <Link to={element.split(" ").join("-").toLowerCase()}>
                                                {element}
                                                </Link>
                                            </div>
                                        );
                                    } )
                                }

                            </div>

                            <p className="text-richblack-50 font-semibold text-[16px] mt-7">Community</p>
                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    Community.map( (element ,index) => {
                                        return (
                                            <div
                                            key={index}
                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            >
                                                <Link to={element.split(" ").join("-").toLowerCase()}>
                                                {element}
                                                </Link>
                                            </div>
                                        );
                                    } )
                                }

                            </div>

                        </div>

                        

                    </div>

                    {/* **Right Portion ** */}
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
                        
                        {
                            FooterLink2.map( (element , index) => {
                                return (
                                    <div key={index} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                                        <p className="text-richblack-50 font-semibold text-[16px]">
                                            {element.title}
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            {
                                                element.links.map((link, index)=>{
                                                    return (
                                                        <div 
                                                        key={index}
                                                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                        >
                                                            <Link to={link.link} >
                                                                {link.title}
                                                            </Link>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            } )
                        }

                    </div>
                </div>

            </div>

            {/* ** LowerPortion of Footer ** */}
            <div  className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
                
                {/* Left */}
                <div  className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 ">

                    <div className="flex flex-row gap-2">
                        {
                            BottomFooter.map( (element , index) => {
                                return (
                                    <div
                                        key={index}
                                        className={` ${
                                            BottomFooter.length - 1 === index
                                              ? ""
                                              : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                        } px-3 `}
                                    >
                                        <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                                            {element}
                                        </Link>
                                    </div>
                                )
                            } )
                        }
                    </div>

                </div>
                
                {/* Right */}
                <div className="text-center select-none">
                Made with ♥ by Daman © 2024 CodeVerse
                </div>


            </div>

        </div>
    )
}

export default Footer;