import Categories from "../components/Categories"
import Dashboard from "../components/Dashboard"
import Profile from "../components/Profile"
import Statistics from "../components/Statistics"
import Transactions from "../components/Transaction"

const Data = [
    {
        id: 1,
        title: "Dashboard",
        path: "/dashboard",
        element: Dashboard
    },

    {
        id: 2,
        title: "Transactions",
        path: "/transactions",
        element: Transactions
    },

    {
        id: 3,
        title: "Categories",
        path: "/categories",
        element: Categories
    },

    {
        id: 4,
        title: "Statistics",
        path: "/statistics",
        element: Statistics
        
    },

    {
        id: 5, 
        title: "Profile",
        path: "/profile",
        element: Profile
    }
]

export default Data