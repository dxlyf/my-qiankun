import React,{useState} from 'react';


let  BasicLayout=(props:any)=>{
    return <div>
        <div>base</div>
        {props.children}
    </div>
}

export default BasicLayout;