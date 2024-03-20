import { CgProfile } from "react-icons/cg";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { MdBlockFlipped } from "react-icons/md";
import { CiChat2 } from "react-icons/ci";

///////////////////////////////////      Admin        ///////////////////////////////////

export const AdminNavbarData = [
    {
        route: "Profile"
        , path: '/profile'
        , icon: <CgProfile size={"22px"} />
    },
    {
        route: "UnVerified"
        , path: '/unverified'
        , icon: <AiOutlineSecurityScan size={"22px"} />
    },
    {
        route: "Verified"
        , path: '/verified'
        , icon: <MdOutlineVerifiedUser size={"22px"} />
    },
    {
        route: "Block"
        , path: '/block'
        , icon: <MdBlockFlipped size={"22px"} />
    }
]

///////////////////////////////////      Company        ///////////////////////////////////

export const CompanyNavbarData = [
    {
        route: "Profile"
        , path: '/profile'
        , icon: <CgProfile size={"22px"} />
    },
    {
        route: "JobsPost"
        , path: '/jobspost'
        , icon: <MdOutlineVerifiedUser size={"22px"} />
    },
    {
        route: "PostedJobs"
        , path: '/postedjobs'
        , icon: <AiOutlineSecurityScan size={"22px"} />
    },
    {
        route: "StudentApplied"
        , path: '/studentapplied'
        , icon: <CiChat2 size={"22px"} />
    }
]

///////////////////////////////////      Student        ///////////////////////////////////

export const StudentNavbarData = [
    {
        route: "Profile"
        , path: '/profile'
        , icon: <CgProfile size={"22px"} />
    },
    {
        route: "Jobs"
        , path: '/jobs'
        , icon: <CgProfile size={"22px"} />
    },
    {
        route: "AppliedJobs"
        , path: '/appliedjobs'
        , icon: <AiOutlineSecurityScan size={"22px"} />
    },
]

///////////////////////////////////      Table        ///////////////////////////////////

export const Table = [
    "Name", "Email", "Role", "Verify", "Block"
]


///////////////////////////////////      AppliedTableData        ///////////////////////////////////

export const AppliedTableData = [
    "Name", "Email", "Education", "Experience"
]

///////////////////////////////////      StudentEducation        ///////////////////////////////////

export const StudentEducation = [
    {
        value: "enter",
        name: "Enter"
    },
    {
        value: "graduation",
        name: "Graduation"
    },
    {
        value: "master",
        name: "Master"
    },
]

///////////////////////////////////      StudentExperience        ///////////////////////////////////

export const StudentExperience = [
    {
        value: "0 Months To 6 Months",
        name: "0 Months To 6 Months"
    },
    {
        value: "7 Months To 1 Year",
        name: "7 Months To 1 Year"
    },
    {
        value: "1 Year To 2 Years",
        name: "1 Year To 2 Years"
    },
    {
        value: "2+ Years",
        name: "2+ Years"
    },
]

///////////////////////////////////      Gender        ///////////////////////////////////

export const Gender = [
    {
        value: "male",
        name: "Male"
    },
    {
        value: "female",
        name: "Female"
    },
    {
        value: "other",
        name: "Other"
    },
]