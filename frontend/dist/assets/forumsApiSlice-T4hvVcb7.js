import{v as u}from"./index--4XkYjpe.js";const e="/api/forums",i=u.injectEndpoints({endpoints:o=>({createForum:o.mutation({query:t=>({url:`${e}/create-forum`,method:"POST",body:t})}),getForums:o.mutation({query:t=>({url:`${e}?skip=${t.skip}&title=${t.title}`,method:"GET"})}),getForum:o.mutation({query:t=>({url:`${e}/forum/${t.id}?skip=${t.skip}`,method:"GET"})})})}),{useCreateForumMutation:s,useGetForumsMutation:m,useGetForumMutation:n}=i;export{m as a,n as b,s as u};