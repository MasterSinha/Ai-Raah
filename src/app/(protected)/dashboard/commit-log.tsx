'use client'

import React from "react"
import useProject from "@/hooks/use-project"
import { api } from "@/trpc/react"

const commitLog=()=>{
    const {projectId}=useProject()
    const {data:Commit}=api.project.getCommits.usequery({projectId})
    return(
        <div>Commit Log</div>
    )

}