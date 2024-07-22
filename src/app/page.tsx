'use client'
import { SignInButton, SignOutButton} from "@clerk/nextjs";
import { useSession} from "@clerk/clerk-react";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";



export default function Home() {

  const { isSignedIn } = useSession();

  const createThumbnail = useMutation(api.thumbnails.createThumbnail);

  console.log(api);
  return (
  <main className ="">
    {isSignedIn ? <SignOutButton /> : <SignInButton /> }

    {isSignedIn && (
      <form onSubmit = {(e) =>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        
        createThumbnail({
          title,
        });

        form.reset()
      }}>
        <label> Title</label>
        <input name = "title" className = "text-black"></input>
        <button>Create</button>
        </form>)}
    
  </main>
  );
}