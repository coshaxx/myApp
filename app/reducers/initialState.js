export default {
    films: {
      loading: true,
      popular: {
          page: 1,
          results:[]
      },
      error: {
          message: ''
      }
    },
	users: {
        loading: true,
		data: [],
        error:{
            message:''
        }
    },
    albums:{
	    loading: true,
        data:[],
        error:{
	        message:''
        }
    }
};
