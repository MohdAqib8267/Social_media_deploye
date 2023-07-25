import { createSlice } from "@reduxjs/toolkit"; 

export const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:[],
        isFetching:false,
        error:false,
    },
    reducers:{
        addPostStart:(state)=>{
            state.isFetching=true;
            state.error=false;
        },
        addPostSuccess:(state,action)=>{
            state.isFetching=false;
            
            state.posts.push(action.payload);
        },
        addPostFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
        //Retreving post
        retreivePostStart:(state)=>{
            state.isFetching=true;
            state.error=false;
        },
        retreivePostSuccess:(state,action)=>{
            // console.log(action.payload)
            state.isFetching=false;
            // action.payload.map((pic,id)=>{
            //     // console.log(pic)
            //     state.posts.push(pic);
            // })

            action.payload.forEach(pic => {
                //if post already exist
                if(!state.posts.find(p=>p._id === pic._id)){
                    state.posts.push(pic);
                }
            });
            
        },
        retreivePostFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        }
    }
})

export const {addPostFailure,addPostStart,addPostSuccess,retreivePostStart,retreivePostSuccess,retreivePostFailure}=postSlice.actions;
export default postSlice.reducer;