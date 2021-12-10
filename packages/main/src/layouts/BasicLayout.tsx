import React,{useState} from 'react';


let  BasicLayout=(props:any)=>{
    return <div>
        <img src="/logo192.png" />
        <div>base</div>
        {props.children}
    </div>
}

export default BasicLayout;