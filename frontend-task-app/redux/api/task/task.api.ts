import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../config/headerConfig";


export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["Task"],

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Tasks, void>({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task,{id:number , task:Task}>({
      query: ({id,task}) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["Task"],
      
    }),
    addTask: builder.mutation<Task, Task>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      
     
      invalidatesTags: ["Task"],
      async onQueryStarted(task, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getTasks", undefined,(draft)=> {
            draft.data.unshift(task);
          })
        )
        try {
          await queryFulfilled;
      
        } catch (error) {
          patchResult.undo();
        }
        
      },
      
    }),
    getTaskOne: builder.query<TaskOne, number>({  
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: ["Task"],

    }),
    searchTask: builder.query<Tasks, string>({
      query: (search) => `/tasks/search?search=${search}`,
      providesTags: ["Task"],
    }),


    // Status update
    statusUpdate: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/tasks/updateTask/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useSearchTaskQuery,
  useStatusUpdateMutation,
  useDeleteTaskMutation,
  useGetTaskOneQuery,
  useUpdateTaskMutation
} = taskApi;
