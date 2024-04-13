
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText';
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructoSection = () => {
    return (
        <div className='mt-16'>
            <div className="flex flex-row gap-20 items-center  " >

                <div className=" w-[50%] ">
                    <img 
                        src={Instructor}
                        alt=""
                        className='shadow-[-20px_-20px_rgba(255,255,255)]'
                    />
                </div>

                <div className=' w-[50%] flex flex-col gap-10 '>
                    <div className='text-4xl font-semibold w-[50%] '>
                        Become an 
                        <HighlightText text={"instructor"} /> 
                    </div>
                    <p className='font-medium text-[16px] w-[80%] text-richblack-300 '>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>

                    <div className='w-fit'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center '>
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InstructoSection;