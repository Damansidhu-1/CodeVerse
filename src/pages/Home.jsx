import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/Button";

import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructoSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer"


const Home = () => {

    return (
        <div>

            {/* ***** SECTION 1 ****** */}
            <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between " >

                <Link to="/signup">
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none w-fit ">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 " >
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className="text-center text-4xl font-semibold mt-7 ">
                    {/* Empower Your Future with <span>Coding Skills</span> */}
                    Empower Your Future with
                    <HighlightText text="Coding Skills" />
                </div>

                <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 ">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className="flex flex-row gap-7 mt-8 " >
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"} >
                        Book a Demo
                    </CTAButton>
                </div>

                <div className="mx-3 my-14 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video
                    muted
                    loop
                    autoPlay
                    className="shadow-[20px_20px_rgba(255,255,255)]"
                    >
                        <source src={Banner} type="video/mp4" />

                    </video>
                </div>

                {/* *** CodeSection 1 *** */}
                <div>
                    <CodeBlocks 
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your <HighlightText text={"coding potential "} /> 
                                with our online courses.
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                btnText:"Try it Yourself",
                                linkto:"/signup",
                                active:true,
                            }
                        } 
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example<title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\n<h1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                        codeColor={"text-yellow-25"}
                        backgroundGradient={"codeblock1"}
                    />
                </div>

                {/* *** CodeSection 2 *** */}
                <div>
                    <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Start  <HighlightText text={"coding\n in seconds."} /> 
                                
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText:"Continue Lesson",
                                linkto:"/signup",
                                active:true,
                            }
                        } 
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example<title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\n<h1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                        codeColor={"text-blue-25"}
                        backgroundGradient={"codeblock2"}
                    />
                </div>

            </div>

            {/* ***** SECTION 2 ****** */}
            <div className="bg-pure-greys-5 text-richblack-700 ">

                <div className="homepage_bg h-[310px]">

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto " >

                        <div className="h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white ">
                            <CTAButton active={true} linkto={'/signup'}>
                                <div className="flex items-center ">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={'/login'}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>

                    </div>
                </div>

                <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7 ">

                        <div className="flex flex-row gap-5 mb-10 mt-[95px] ">
                            <div className="text-4xl font-semibold w-[45%]">
                                Get the skills you need for a <HighlightText text={"Job that is in demand."} />
                            </div>

                            <div className="flex flex-col gap-10 w-[40%] items-start justify-between">
                                <div className="text-[16px]  ">
                                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                                </div>
                                
                                <CTAButton active={true} linkto={'/signup'}>
                                    <div>
                                        Learn More
                                    </div>
                                </CTAButton>
                                
                            </div>

                        </div>

                    <TimelineSection />

                    <LearningLanguageSection />
                </div>


            </div>

            {/* ***** SECTION 3 ****** */}
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white ">

                <InstructoSection />

                <h2 className="text-4xl text-center font-semibold mt-10">
                    Reviews from other learners
                </h2>
                {/* Review Slider Here */}

            </div>


            {/* ***** FOOTER ****** */}
            <Footer />

        </div>
    )
    
}

export default Home;