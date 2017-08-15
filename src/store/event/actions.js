export default{
    addevent:({commit},param)=>{
        commit('ADDEVENT',{items:param})
    },
    eventdone:({commit},param)=>{
        commit('EVENTDONE',{id:param})
    },
    eventcancel:({commit},param)=>{
        commit('EVENTCANCEL',{id:param})
    },
    eventtodo:({commit},param)=>{
        commit('EVENTTODO',{id:param})
    },
    uploadevent:({commit},param)=>{
        commit('UPLOADEVENT',param);
    },
    clearevent:({commit}) => {
        commit('CLEAREVENT');
    },
    delevent:({commit},param)=>{
        commit('DELEVENT',param);
    },
    editevent:({commit},param)=>{
        commit('EDITEVENT',param);
    }
}