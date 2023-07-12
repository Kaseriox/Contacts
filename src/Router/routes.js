import HomePage from '../Views/HomePage.vue'
import DetailedContacts from '../Views/DetailedContacts.vue'
import AdminLogin from '../Views/AdminLogin.vue'
import AccountManage from '../Views/AccountManage.vue'
import StructureManage from '../Views/StructureManage.vue'
import PageNotFound from '../Views/PageNotFound.vue'


export default [
    {path:'/',component:HomePage},
    {path:'/Contact/:id',component:DetailedContacts},
    {path:'/Login',component:AdminLogin},
    {path:'/Account',component:AccountManage},
    {path:'/Structure',component:StructureManage},
    {path: "*", component: PageNotFound},
    
]