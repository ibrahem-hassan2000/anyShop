import { createSlice } from '@reduxjs/toolkit'

const initialState  ={
    productData:[],
    userInfo:null
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
 reducers:{
addToCart:(state ,action)=>{
    const isProduct =state.productData.find(item=>item._id === action.payload._id)
    if(isProduct){
        isProduct.quantity+=action.payload.quantity
      
    }else{
        state.productData.push(action.payload);
    }
    

},
deleteProduct:(state,action)=>{

state.productData =state.productData.filter((item)=> item._id !== action.payload)
},
reset:(state)=>{
    state.productData = []
},
increamentQuantity:(state ,action)=>{
    const item = state.productData.find(item=>item._id === action.payload)
    if(item){
        item.quantity++
    }
},
decreamentQuantity:(state ,action)=>{
    const item = state.productData.find(item=>item._id === action.payload)
    if(item){
        item.quantity--
    }
},
addUser:(state ,action)=>{
    state.userInfo = action.payload
    },
    removeUser:(state )=>{
        state.userInfo = null
        }
 }
})

// Action creators are generated for each case reducer function
export const { addToCart,deleteProduct ,reset ,increamentQuantity ,decreamentQuantity,addUser,removeUser} = shopSlice.actions

export default shopSlice.reducer