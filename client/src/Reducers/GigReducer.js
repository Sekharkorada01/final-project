
export const  INITIAL_STATE = {
  username: JSON.parse(localStorage.getItem('currentUser'))?.username,
  cat: 'Graphic Design',
  title: '',
  desc: '',
  price: '',
  cover: '',
  shortTitle: '',
  shortDesc: '',
  deliveryTime: '',
  revisionNumber: '',
  totalStars: 0,
  starNumber: 0,
  sales: 0,
  images: [],
  features: [],
}
export const GigReducer = (state , action) => {
   switch(action.type){
    case 'CHANGE_INPUT':
      return {...state , [action.payload.name]:action.payload.value}
    case 'ADD_FEATURE':
      return {...state , features:[...state.features , action.payload]}
    case 'REMOVE_FEATURE':
      return {...state , features:state.features.filter((feature) => feature !== action.payload)}
    case 'ADD_IMAGES':
      return {...state , cover: action.payload.cover  , images:action.payload.images}     
   }
}