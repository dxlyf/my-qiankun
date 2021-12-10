export default  [
    { 
      path: '/', component: '../layouts/BasicLayout',
      menu:{
          //name:"主菜单",
          flatMenu:true
      },
      // layout:{
      //   hideMenu:true,
      // },
      routes:[
          {
            path:"/",
            redirect:'/index'
          },
          {
            path:"/index",
            menu:{
              icon:"setting",
              name:"首页"
            },
            component:"./index"
          },
          {
            path: '/vueApp',
            menu:{
              icon:"setting",
              name:"vue-app"
            },
            component: './vueApp/index',
            routes:[
              {
                path:"/vueApp",
                redirect:'/vueApp/index',
                menu:{
                  name:''
                },
              },
              {
               path:"/vueApp/index",
               microApp:"vue-app",
               menu:{
                 name:"home"
               }
            },{
              path:"/vueApp/about",
              microApp:"vue-app",
              menu:{
                 name:"about"
              }
            }]
          },
          {
            path: '/reactApp',
            menu:{
              icon:"setting",
              name:"react-app"
            },
            component: './reactApp/index',
            routes:[   {
              path:"/reactApp",
              menu:{
                name:''
              },
              redirect:'/reactApp/index'
            },{
               path:"/reactApp/index",
               microApp:"react-app",
               menu:{
                 name:"home"
               }
            },{
              path:"/reactApp/about",
              microApp:"react-app",
              menu:{
                 name:"about"
              }
            }]
          }
      ]
    },
 
  ]