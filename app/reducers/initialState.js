export default {
    films: {
      loading: true,
      data: {
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
