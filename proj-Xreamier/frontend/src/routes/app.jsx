import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TicketPage from "views/TicketList/TicketList.jsx"; 
import TaskPage from "views/TaskList/TaskList.jsx";
import Icons from "views/Icons/Icons.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import FacultyPage from "views/FacultyList/FacultyList.jsx";

import {
    Dashboard, Person, ContentPaste, Assignment, BubbleChart, LocationOn, Notifications, LocalPlay, Group
} from 'material-ui-icons';

const appRoutes = [
    { path: "/dashboard", sidebarName: "Dashboard", navbarName: "Material Dashboard", icon: Dashboard, component: DashboardPage },
    { path: "/user", sidebarName: "My Profile", navbarName: "Profile", icon: Person, component: UserProfile },
    { path: "/notifications", sidebarName: "Notifications", navbarName: "Notifications", icon: Notifications, component: NotificationsPage },
    { path: "/tickets", sidebarName: "Ticket List", navbarName: "Table List", icon: LocalPlay, component: TicketPage },
    { path: "/faculty", sidebarName: "Faculty List", navbarName: "Table List", icon: Group, component: FacultyPage },
    { path: "/mytasks", sidebarName: "My Tasks", navbarName: "Typography", icon: Assignment, component: TaskPage },
    { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

export default appRoutes;
