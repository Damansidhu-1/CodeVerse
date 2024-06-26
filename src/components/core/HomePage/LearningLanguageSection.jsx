import HighlightText from "./HighlightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from '../HomePage/Button'

const LearningLanguageSection = () => {
    return (
        <div className="mt-[130px] mb-32">
            <div className="flex flex-col gap-5 items-center ">

                <div className="text-4xl font-semibold text-center" >
                    
                    Your swiss knife for 
                    <HighlightText text={"learning any language"} />
                    
                </div>

                <div className=" text-center text-richblack-600 mx-auto text-base mt-3 font-semibold text-[16px] w-[70%] ">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="flex flex-row items-center justify-center mt-8 ">
                    <img
                        src={Know_your_progress} 
                        alt="Know_your_progress"
                        className="object-contain -mr-32 "
                    />
                    <img
                        src={Compare_with_others} 
                        alt="Compare_with_others"
                        className="object-contain"
                    />
                    <img
                        src={plan_your_lessons} 
                        alt="plan_your_lessons"
                        className="object-contain -ml-36"
                    />
                </div>

                <div className="w-fit">
                    <CTAButton active={true} linkto={'/signup'}>
                        Learn More
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default LearningLanguageSection;