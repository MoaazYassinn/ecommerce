
export class ApiFeature{


    constructor(mongooseQuery,searchQuery){
        this.mongooseQuery=mongooseQuery
        this.searchQuery=searchQuery
    }

    pagination(){
        if(this.searchQuery.page<=0)this.searchQuery.page=1
        let pageNumber=this.searchQuery.page*1||1
        let pageLimit=2
        let skip=(pageNumber-1)*pageLimit
        this.pageNumber=pageNumber
        this.mongooseQuery.skip(skip).limit(pageLimit)
        return this
    }

    filteration(){

        let filterObj={...this.searchQuery}
        let excludedFields=['page','sort','keyword','fields']
        excludedFields.forEach((val)=>{
    
            delete filterObj[val]
        })
    
    
        filterObj=JSON.stringify(filterObj)
        filterObj=filterObj.replace(/(gt|gte|lt|lte)/g,function(match){
            return '$'+match
        })
        filterObj=JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
        
       
    }
    
    sort(){
        
    if(this.searchQuery.sort){
        let sortBy=this.searchQuery.sort.split(',').join(' ')
        this.mongooseQuery.sort(sortBy)
    }
    return this
    }

    fields(){
        if(this.searchQuery.fields){
            let fields=this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this
    
    }

    search(){
        if(this.searchQuery.keyword){
       
            this.mongooseQuery.find({
                $or:[
                    {
                        title:{$regex:this.searchQuery.keyword}
                    },
                    {
                        description:{$regex:this.searchQuery.keyword}
                       
                    }
                ]
            })
        }
        return this
    
    }
}