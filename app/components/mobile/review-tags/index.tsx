type TReviewTopics={
    sub_topic:string,
    tags:Array<{tag:string,score:number}>,
    selectionType:"single"|"multiple"
}
const ReviewTags=({data,topic,selectedTags,onClick}:{data:TReviewTopics,selectedTags:string[],onClick:(data:{tags:TReviewTopics["tags"],selectionType: TReviewTopics["selectionType"],tag:TReviewTopics["tags"][0],sub_topic:string,topic:string,selected:boolean})=>void,topic:string})=>{
    
    return (
        <>
        {data.tags.map((tag)=><span onClick={()=>{onClick({tags:data.tags,selectionType:data.selectionType,tag:tag,sub_topic:data.sub_topic,topic,selected:selectedTags.includes(tag.tag)})}} className={`chip ${selectedTags.includes(tag.tag)?'selected':''} ${tag.score<0?'secondary':''}`} key={tag.tag}>{tag.tag}</span>)}
        </>
    )
}
export default ReviewTags