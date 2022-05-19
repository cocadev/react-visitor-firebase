import SubmissionDetail  from "views/Submission/detail";
import Submission  from "views/Submission";
import Users from "views/Users/";
import UserDetail from "views/Users/detail";

import VPIDetail from "views/VPIRequests/detail";
import VPIRequests from "views/VPIRequests";
import Visitors from "views/Visitors";
import VisitorRequests from "views/Visitors/detail";

export const adminRoutes = [
  {
    path: "/users",
    name: "User Management",
    icon: "person",
    component: Users,
    layout: "/admin",
    exact: true
  },
  {
    path: "/users/:id",
    name: "User Management",
    icon: "User",
    component: UserDetail,
    layout: "/admin",
    type: "Child",
    exact: true
  },
  {
    path: "/visitor-requests",
    name: "Visitor Pass Requests",
    icon: "fingerprint_rounded",
    component: VPIRequests,
    layout: "/admin",
    divider: true,
    exact:true,
  },
  {
    path: "/visitor-requests/:reqId",
    name: "Visitor Pass Request Detail",
    component: VPIDetail,
    layout: "/admin",
    type: "Child",
    exact:true,
  },
  {
    path: "/visitors",
    name: "Visitor Management",
    icon: "persons",
    component: Visitors,
    layout: "/admin",
    exact:true,
  },
  {
    path: "/visitors/:id",
    name: "Visitor Pass Request Detail",
    component: VisitorRequests,
    layout: "/admin",
    type: "Child",
    exact:true,
  },
  {
    path: "/visitors/:id/:reqId",
    name: "Visitor Pass Request Detail",
    component: VPIDetail,
    layout: "/admin",
    type: "Child",
    exact:true,
  },
];

export const userRoutes = [
  {
    path: "/submission",
    name: "Submission",
    icon: "content_paste",
    component: Submission,
    layout: "/user",
    exact: true
  },
  {
    path: "/submission/:id",
    name: "SubmissionDetail",
    component: SubmissionDetail,
    layout: "/user",
    type: "Child",
    exact: true
  },
];

export const visitorRoutes = [
  {
    path: "/visitor-requests",
    name: "Visitors",
    icon: "content_paste",
    component: Submission,
    layout: "/user",
    exact: true
  },
  {
    path: "/submission/:id",
    name: "SubmissionDetail",
    component: SubmissionDetail,
    layout: "/user",
    type: "Child",
    exact: true
  },
];
