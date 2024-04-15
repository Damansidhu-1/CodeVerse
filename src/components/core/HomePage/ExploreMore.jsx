import HighlightText from "./HighlightText";

import {HomePageExplore } from "../../../data/homepage-explore";
import { useState } from "react";
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths",
]; 

const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setcourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard ] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value);
        // niche waali line ch doubt aa
        const result = HomePageExplore.filter( (course) => course.tag === value );
        setcourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="relative">
            
            <div className="text-4xl font-semibold text-center" >
                Unlock the 
                <HighlightText text={"Power of Code"} />
            </div>

            <p className="text-[16px] text-center text-richblack-300  mt-3 ">
                Learn to Build Anything You Can Imagine
            </p>

            
            <div className="flex gap-2 items-center rounded-full bg-richblack-800 mb-5 mt-5 px-1 py-1">
                {
                    tabsName.map((element , index ) => {
                        return (
                            <div
                                key={index}
                                className=
                                {` text-[16px] flex gap-2 items-center 
                                ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium " : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 `}
                                onClick={() => setMyCard(element) }
                            >
                                <button>
                                    {element}
                                </button>
                            </div>
                        )
                    })
                }
            </div>

            <div className="lg:h-[150px]"></div>
            
            {/* course card da group */}
            <div className="absolute flex flex-row gap-10 justify-between w-full">
                {
                    courses.map( (element , index) => {
                        return (
                            <CourseCard 
                                key={index}
                                cardData={element}
                                currentCard = {currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    } )
                }
            </div>

        </div>
    )
}

export default ExploreMore;