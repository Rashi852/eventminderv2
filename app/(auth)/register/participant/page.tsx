<<<<<<< HEAD
import { PlayWriteItalia } from "@/components/fonts";
import { ParticipantForm } from "./form";

=======
import { Phiolosopher } from "@/components/assets/fonts";
import { Meteors } from "@/components/ui/meteors";
import Image from "next/image";
import { ParticipantForm } from "./form";
>>>>>>> e96c94fb4738e1ffc80dfae9a10aa9677ac72034

export default function Host() {
  return (
<<<<<<< HEAD
    <div className="flex flex-1 items-center flex-col gap-4">

        <h1 className={`text-6xl ${PlayWriteItalia.className}`} >Participant</h1>
        <ParticipantForm/>
=======
    <div className="flex min-h-[80dvh]">
      <div className="flex flex-1 items-center justify-center border-r border-gray-500">
        <Image src={"/pat.jpg"} alt="img" className="w-96 h-96" width={16} height={16} />
        <Meteors/>
      </div>
      <div className="flex flex-1 items-center flex-col gap-10">
        <h1 className={`text-6xl ${Phiolosopher.className}`} >Participant</h1>
        <ParticipantForm/>
        <hr/>
        <p className="">Or</p>
     </div>
>>>>>>> e96c94fb4738e1ffc80dfae9a10aa9677ac72034
    </div>
  )
}