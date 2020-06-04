import { observable, action } from 'mobx';
import  {  Color } from '@material-ui/lab/Alert';

let notifyTimer:any = 0 

class ConStore {
    @observable isLoading = false
    @observable isNotify = false
    @observable hasLogined = false
    @observable notifyMsg = ''
    @observable notifyType = 'error'


    @action showLoading = ()=>{
        this.isLoading = true
    }
    @action hiddenLoading = ()=>{
        this.isLoading = false
    }
    @action showNotify = (msg:string,type?:Color)=>{
        
        this.notifyMsg = msg +' '.repeat(Math.random()*4|0)
        // if(notifyTimer)clearTimeout(notifyTimer)
        // notifyTimer = setTimeout(() => {
        //      this.notifyMsg = ''
        // }, 6000);
        this.notifyType = type || this.notifyType
    }
    // @action hiddenNotify = ()=>{

    //     this.isNotify = false
    // }
   
}

const Store  = new ConStore()

export default Store