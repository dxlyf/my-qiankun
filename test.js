const {exec}=require('child_process');
const path = require('path');


function start(){

    let pkgs=['main','react-app','vue-app']

    for (let index = 0; index < pkgs.length; index++) {
        const element = pkgs[index];
        let command='start'
        if(element==='vue-app'){
            command='serve'
        }
        var child=exec('npm run '+command,{
            cwd:path.resolve(__dirname,'packages/'+element),
            
        },(error,stdout)=>{

        })

        child.stdout.on('data',(data)=>{
                process.stdout.write(data)
        })
    }
}
start()