import {createSlice} from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:"",
        isFetching:false,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            // console.log(action.payload);
            localStorage.setItem("profile",JSON.stringify(action.payload));
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
        // signup
        signupStart:(state)=>{
            state.isFetching=true;
        },
        signupSuccess:(state,action)=>{
            state.isFetching=false;
            // console.log(action.payload);
            localStorage.setItem("profile",JSON.stringify(action.payload));
            state.currentUser=action.payload;
        },
        signupFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
        // logout
        
        logoutSuccess:(state)=>{
            
            state.currentUser="";
            state.isFetching=false;
            state.error=false;
            localStorage.clear();
        },
       
        //user Update
        userUpdateStart:(state)=>{
            state.isFetching=true;
        },
        userUpdateSuccess:(state,action)=>{
            state.isFetching=false;
            // console.log(action.payload);
            localStorage.setItem("profile",JSON.stringify(action.payload));
            state.currentUser=action.payload;
        },
        userUpdateFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },

        //follow User
        followStart:(state)=>{
            state.isFetching=true;
        },
        followSuccess:(state,action)=>{
            state.isFetching=false;
            // console.log(action.payload);
            
            // state.currentUser=action.payload;
            state.currentUser.user.following.push(action.payload.followUser._id);
            // action.payload.followUser.followers.push(state.currentUser.user._id);
        },
        followFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
        //unfollow User
        unfollowStart:(state)=>{
            state.isFetching=true;
        },
        unfollowSuccess:(state,action)=>{
            
            console.log(action.payload);
            
            // state.currentUser=action.payload;
            const idToRemove = action.payload.followUser._id;
            const following = state.currentUser.user.following;
            const indexToRemove = following.indexOf(idToRemove);
            following.splice(indexToRemove,1);

            state.isFetching=false;
            state.currentUser.user.following=following;

            //remove from follower side
            // const idOffollow = state.currentUser.user._id;
            // const followers = action.payload.followUser.followers;
            // const index = followers.indexOf(idOffollow);
            // followers.splice(index,1);
            

        },
        unfollowFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
    }
}) 

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    signupStart,
    signupSuccess,
    signupFailure,
    logoutSuccess,
    userUpdateStart,
    userUpdateFailure,
    userUpdateSuccess,
    followStart,
    followFailure,
    followSuccess,
    unfollowStart,
    unfollowFailure,
    unfollowSuccess,
} =userSlice.actions;

export default userSlice.reducer;