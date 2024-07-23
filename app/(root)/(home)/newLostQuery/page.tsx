"use client";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function SignupFormDemo() {
  const router = useRouter();

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [imageUrl, setImageUrl] = React.useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const tags = [];
    if (showStatusBar) tags.push("StatusBar");
    if (showActivityBar) tags.push("ActivityBar");
    if (showPanel) tags.push("Panel");

    const formData = new FormData(e.currentTarget);

    const fileInput = (e.target as HTMLFormElement).image as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
       // Upload image to Cloudinary
       const cloudinaryData = new FormData();
       cloudinaryData.append('file', file);
       cloudinaryData.append('upload_preset', 'chat-app'); 
       cloudinaryData.append("cloud_name", "piyushkumar26november");
 
       try {
         const response = await fetch('https://api.cloudinary.com/v1_1/piyushkumar26november/image/upload', {
           method: 'POST',
           body: cloudinaryData,
         });
 
         const data = await response.json();
         const imageUrl = data.secure_url;
         formData.append('image', imageUrl);
 
         // Update state with the image URL
         setImageUrl(imageUrl);
       } catch (error) {
         console.error('Error uploading image:', error);
       }
     } else {
       console.error('No file selected');
    }


    formData.append("tags", JSON.stringify(tags));

    const queryID = Math.random().toString(36).substr(2, 9);
    formData.append("queryID", queryID);

    formData.append("type", "LostQuery");

    const currentDate = new Date().toISOString().split('T')[0];
    formData.append("dateLost", currentDate);

    const formDataObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/lostQuery", {
        method: "POST",
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      router.push(`/query/${queryID}`);
    } catch (error) {
      console.error("Form submission error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black-2  dark:bg-black">
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <h2 className="font-bold text-xl text-center text-white dark:text-neutral-200">
        Welcome
      </h2>
      <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
        Did you lost something in campus, we are here to help you find it.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="rollno">Roll No.</Label>
            <Input id="rollno" name="rollno" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="item" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" placeholder="describe..." type="text" />
        </LabelInputContainer>

        <div className="grid w-full max-w-sm items-center gap-1.5 border-white border-opacity-50" >
          <Label htmlFor="image">Picture</Label>
          <Input id="image" name="image" type="file" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center" asChild>
            <Button className="text-white w-[80%] m-auto mb-8 hover:border-white hover:border-[1px] " >Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-black-1">
            <DropdownMenuLabel className="text-white">Add A Tag</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              className="text-white"
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Personal
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="text-white"
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Academic
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="text-white"
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Other
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Submit"}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
