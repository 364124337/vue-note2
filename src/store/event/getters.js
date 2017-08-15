export default{
    getToDo(states){
        return states.event.filter(function(d){
            if(d.type === 1){
                return d;   
            }
        })
    },
    getDone(states){
        return states.event.filter(d=>{
            if(d.type === 2){
                return d;
            }
        })
    },
    getCancel(states){
        return states.event.filter(d=>{
            if(d.type === 3){
                return d;
            }
        })
    },
    getEventList(states){
        return states.event;
    }
}