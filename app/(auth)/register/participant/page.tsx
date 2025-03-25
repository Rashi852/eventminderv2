import { PlayWriteItalia } from "@/components/fonts";
import { ParticipantForm } from "./form";


export default function Participant() {
  return (
    <div className="flex flex-1 items-center flex-col gap-4">

        <h1 className={`text-6xl ${PlayWriteItalia.className}`} >Participant</h1>
        <ParticipantForm/>
    </div>
  )
}