import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { MdBlockFlipped } from "react-icons/md";
import { CiChat2 } from "react-icons/ci";

export const AdminNavbarData = [
    {
        route: "Profile"
        , path: '/profile'
        , icon: <CgProfile size={"22px"} />
    },
    {
        route: "Verified"
        , path: '/verified'
        , icon: <MdOutlineVerifiedUser size={"22px"} />
    },
    {
        route: "UnVerified"
        , path: '/unverified'
        , icon: <AiOutlineSecurityScan size={"22px"} />
    },
    {
        route: "Block"
        , path: '/block'
        , icon: <MdBlockFlipped size={"22px"} />
    }
]


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

export const Table = [
    "Name", "Role", "Email", "Detail", "Status"
]