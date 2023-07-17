import HomePage from '../Views/HomePage.vue'
import DetailedContacts from '../Views/DetailedContacts.vue'
import AdminLogin from '../Views/AdminLogin.vue'
import AccountManage from '../Views/AccountManage.vue'
import StructureManage from '../Views/StructureManage.vue'
import CompanyManage from '../Views/CompanyManage.vue'
import PageNotFound from '../Views/PageNotFound.vue'


export default [
    {path:'/',component:HomePage},
    {path:'/contact/:id',component:DetailedContacts},
    {path:'/login',component:AdminLogin},
    {path:'/account',component:AccountManage, meta:{reqAuth:true}},
    {path:'/structure',component:StructureManage, meta:{reqAuth:true}},
    {path:'/company',component:CompanyManage, meta:{reqAuth:true}},
    {path: "*", component: PageNotFound},
    
]