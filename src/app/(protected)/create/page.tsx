"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const CreateProject = api.project.createProject.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
    CreateProject.mutate(
      {
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project Created Successfully");
          refetch();
          reset();
        },
        onError: () => {
          toast.error("Failed to Create Project");
        },
      }
    );
    return true;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-12 px-4 animate-fade-in">
      {/* Illustration / Image */}
      <img
        src="/your-image.svg"
        alt="Link Repository"
        className="h-48 w-auto md:h-56"
      />

      {/* Text Section */}
      <div className="max-w-sm text-center md:text-left">
        <h1 className="font-semibold text-2xl md:text-3xl">
          Link your GitHub Repository
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect your project with Raah and unlock automated features.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6 border border-border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Project Name</label>
            <Input
              {...register("projectName", { required: true })}
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">GitHub URL</label>
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="https://github.com/username/repo"
              type="url"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              GitHub Token (Optional)
            </label>
            <Input
              {...register("githubToken")}
              placeholder="Enter token for private repos"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={CreateProject.isPending}
          >
            {CreateProject.isPending ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
