import Image from "next/image"
import background from "../../public/images/predictions-background.png"

export default function Predictions() {
  return (
    <div>
      <div className="relative rounded-[3rem] -mt-14 p-12 text-white overflow-hidden">
        <Image src={background} className=" -z-10 h-full w-full object-cover" fill alt="prediction table" />
        <h2 className="text-4xl font-bold">Predictions</h2>
        <div className="my-10 space-y-6">
          <div className="flex justify-between text-lg font-bold">
            <div>1. John Smith</div>
            <p>22/39</p>
            <p>56%</p>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <div>2. John Smith</div>
            <p>22/39</p>
            <p>56%</p>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <div>3. John Smith</div>
            <p>22/39</p>
            <p>56%</p>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <div>4. John Smith</div>
            <p>22/39</p>
            <p>56%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
