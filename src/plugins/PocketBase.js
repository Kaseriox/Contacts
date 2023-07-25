import PocketBase from 'pocketbase'

const CheckToken = ()=>{
    const token  = JSON.parse(localStorage.getItem("pocketbase_auth")) &&
    JSON.parse(localStorage.getItem("pocketbase_auth"))["token"];
    if(token===null)
    {
        return null
    }
    return parseJwt(token)
}

const parseJwt = (token) => {        
    const decode = JSON.parse(atob(token.split('.')[1]));
    if (decode.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("pocketbase_auth")
        return false
    }
    return true
};

let PocketBasePlugin = {
    install(Vue)
    {
        const pb = new PocketBase(API_URL)
        pb.autoCancellation(false)
        Vue.prototype.$Authenticate = async function(Login)
        {
            try{
                return await pb.collection('users').authWithPassword(Login.Email,Login.Password,null,{
                    expand:'permissions_id'
                })  
            }
            catch(err)
            {
                return err
            }
        },
        Vue.prototype.$GetCollection = async function({Collection,Page=1,ItemsPerPage=25,query})
        {
            try{
                if(ItemsPerPage==='All')
                {
                   ItemsPerPage = 99999
                }
                return await pb.collection(Collection).getList(Page,ItemsPerPage,query)
            }
            catch(err)
            {
                return null
            }

        }
        Vue.prototype.$GetSingleRecord = async function({Collection,id,query})
        {
            try{
                return await pb.collection(Collection).getOne(id,query)
               
            }
            catch(err)
            {
                return null
            }
        }
        Vue.prototype.$CreateRecord = async function({Collection,data})
        {
            try
            {
                let form = new FormData()
                for(let key in data)
                {
                    form.append(key,data[key])
                }
                return await pb.collection(Collection).create(form)
                
            }
            catch(err)
            {
                return null
            }
        }
        Vue.prototype.$UpdateRecord = async function({Collection,id,data,query})
        {
            try
            {
                let form = new FormData()
                for(let key in data)
                {
                    form.append(key,data[key])
                }
                return await pb.collection(Collection).update(id,form,query)
            }
            catch(err)
            {
                return null
            }
        }
        Vue.prototype.$DeleteRecord = async function({Collection,id})
        {
            try{
                return await pb.collection(Collection).delete(id)
            }
            catch(err)
            {
                return null
            }
        }
        Vue.prototype.$Logout = function()
        {
            pb.authStore.clear()
        }
        Vue.prototype.$CheckAuth = async function()
        {
            if(!CheckToken())
            {
                return false
            } 
            try
            {   
                if(pb.authStore.isValid)
                {
                    return await  pb.collection('users').authRefresh(null,{
                    expand:'permissions_id'
                    })
                }
                else
                {
                    return false
                }
           }
           catch(err)
           {
                return false
           }
        }
        Vue.prototype.$PasswordReset = async function(email)
        {
            try
            {
               return await pb.admins.requestPasswordReset(email)
            }
            catch(err)
            {
                return err
            }
        }
        Vue.prototype.$GetStatus = async function()
        {
            try
            {

                return await pb.health.check()

            }
            catch(err)
            {
                return null
            }
        }

    }
}

export default PocketBasePlugin